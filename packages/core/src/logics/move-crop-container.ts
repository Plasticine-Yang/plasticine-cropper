/** 坐标 */
interface Coordinate {
  x: number
  y: number
}

/** 矩形 */
interface Rect {
  width: number
  height: number
}

/** 移动裁切窗口 */
class MoveCropContainerLogic {
  /**
   * 控制 crop 窗口是否可以移动
   *
   * @default false
   */
  public moveable: boolean

  /** 鼠标相对裁切窗的偏移量 */
  public mouseOffsetFromCropContainer: { x: number; y: number }

  constructor() {
    this.moveable = false
    this.mouseOffsetFromCropContainer = { x: 0, y: 0 }
  }

  /**
   * 鼠标点击裁切窗时的逻辑 - 允许移动 & 记录鼠标相对裁切窗的偏移量
   *
   * @param mouseCoordinate 鼠标坐标
   * @param cropContainerCoordinate 裁切窗坐标
   */
  public handleCropContainerActive(mouseCoordinate: Coordinate, cropContainerCoordinate: Coordinate) {
    this.moveable = true

    this.mouseOffsetFromCropContainer = {
      x: mouseCoordinate.x - cropContainerCoordinate.x,
      y: mouseCoordinate.y - cropContainerCoordinate.y,
    }
  }

  /**
   * 移动裁切窗口 - 本质上就是获取裁切窗口相对于根节点容器的坐标
   *
   * @param mouseCoordinate 鼠标坐标
   * @param rootCoordinate plasticine-cropper 根节点容器坐标
   */
  public handleCropContainerMove(
    mouseCoordinate: Coordinate,
    rootCoordinate: Coordinate,
    cropContainerRect: Rect,
  ): Coordinate | null {
    if (!this.moveable) {
      return null
    }

    /** 鼠标的 x 坐标 - 根节点容器的 x 坐标 - 鼠标相对于裁切窗口的横向偏移量 */
    const x = mouseCoordinate.x - rootCoordinate.x - this.mouseOffsetFromCropContainer.x

    /** 鼠标的 y 坐标 - 根节点容器的 y 坐标 - 鼠标相对于裁切窗口的纵向偏移量 */
    const y = mouseCoordinate.y - rootCoordinate.y - this.mouseOffsetFromCropContainer.y

    /** 最终生效的 x 坐标 -- 需要考虑到超出根节点左右边界时不出界 */
    const resolvedX =
      x <= 0
        ? // 超出左边界
          0
        : // 超出右边界
          Math.min(x, cropContainerRect.width)

    /** 最终生效的 y 坐标 -- 需要考虑到超出根节点上下边界时不出界 */
    const resolvedY =
      y <= 0
        ? // 超出上边界
          0
        : // 超出下边界
          Math.min(y, cropContainerRect.height)

    return {
      x: resolvedX,
      y: resolvedY,
    }
  }

  /** 鼠标松开时禁止移动 */
  public handleCropContainerInactive() {
    this.moveable = false
  }
}

export { MoveCropContainerLogic }
export type { Coordinate, Rect }
