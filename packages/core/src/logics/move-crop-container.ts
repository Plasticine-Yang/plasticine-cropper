import type { CropperRenderer, Logic } from '../types'

/** 移动 crop 窗口 */
function createMoveCropContainerLogic(cropperRenderer: CropperRenderer): Logic {
  const cropperElements = cropperRenderer.getCropperElements()
  const root = cropperElements.root
  const cropContainer = cropperElements.cropContainer

  /** 控制 crop 窗口是否可以移动 */
  let moveable = false

  /** 记录开始移动时，鼠标相对 crop 窗口的偏移量 */
  const mouseOffsetFromCropContainer = {
    x: 0,
    y: 0,
  }

  function handleCropContainerActive(e: MouseEvent) {
    moveable = true

    const cropContainerRect = cropContainer.getBoundingClientRect()
    mouseOffsetFromCropContainer.x = e.clientX - cropContainerRect.left
    mouseOffsetFromCropContainer.y = e.clientY - cropContainerRect.top
  }

  function handleCropContainerMove(e: MouseEvent) {
    if (!moveable) {
      return
    }

    /** 鼠标的 x 坐标 - 根节点容器的 left - 鼠标相对于 crop 窗口的横向偏移量 */
    const x = e.clientX - root.offsetLeft - mouseOffsetFromCropContainer.x

    /** 鼠标的 y 坐标 - 根节点容器的 top - 鼠标相对于 crop 窗口的纵向偏移量 */
    const y = e.clientY - root.offsetTop - mouseOffsetFromCropContainer.y

    /** 最终生效的 x 坐标 -- 需要考虑到超出根节点左右边界时不出界 */
    const resolvedX =
      x <= 0
        ? // 超出左边界
          0
        : // 超出右边界
          Math.min(x, cropContainer.clientWidth)

    /** 最终生效的 y 坐标 -- 需要考虑到超出根节点上下边界时不出界 */
    const resolvedY =
      y <= 0
        ? // 超出上边界
          0
        : // 超出下边界
          Math.min(y, cropContainer.clientHeight)

    cropperRenderer.moveCropContainer(resolvedX, resolvedY)
  }

  function handleCropContainerInactive() {
    moveable = false
  }

  return {
    bindEventListeners() {
      cropContainer.addEventListener('mousedown', handleCropContainerActive)
      root.addEventListener('mousemove', handleCropContainerMove)
      window.addEventListener('mouseup', handleCropContainerInactive)
    },

    removeEventListeners() {
      cropContainer.removeEventListener('mousedown', handleCropContainerActive)
      root.removeEventListener('mousemove', handleCropContainerMove)
      window.removeEventListener('mouseup', handleCropContainerInactive)
    },
  }
}

export { createMoveCropContainerLogic }
