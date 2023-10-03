import { MoveCropContainerLogic } from '@/logics'
import type { Coordinate, CropperFeatureManager, CropperRenderer, Rect } from '@/types'

class MoveCropContainerFeatureManager implements CropperFeatureManager {
  private moveCropContainerLogic: MoveCropContainerLogic

  constructor(private cropperRenderer: CropperRenderer) {
    this.moveCropContainerLogic = new MoveCropContainerLogic()

    this.handleCropContainerMouseDown = this.handleCropContainerMouseDown.bind(this)
    this.handleRootMouseMove = this.handleRootMouseMove.bind(this)
    this.handleWindowMouseUp = this.handleWindowMouseUp.bind(this)
  }

  private handleCropContainerMouseDown(e: MouseEvent) {
    const cropperElements = this.cropperRenderer.getCropperElements()

    if (cropperElements !== null) {
      const { cropContainer } = cropperElements

      const cropContainerRect = cropContainer.getBoundingClientRect()

      const mouseCoordinate: Coordinate = { x: e.clientX, y: e.clientY }
      const cropContainerCoordinate: Coordinate = {
        x: cropContainerRect.left,
        y: cropContainerRect.top,
      }

      this.moveCropContainerLogic.handleCropContainerActive(mouseCoordinate, cropContainerCoordinate)
    }
  }

  private handleRootMouseMove(e: MouseEvent) {
    const cropperElements = this.cropperRenderer.getCropperElements()
    const cropContainerRenderer = this.cropperRenderer.getCropContainerRenderer()

    if (cropperElements !== null && cropContainerRenderer !== null) {
      const { root, cropContainer } = cropperElements

      const mouseCoordinate: Coordinate = { x: e.clientX, y: e.clientY }
      const rootCoordinate: Coordinate = { x: root.offsetLeft, y: root.offsetTop }
      const rootRect: Rect = { width: root.clientWidth, height: root.clientHeight }
      const cropContainerRect: Rect = { width: cropContainer.clientWidth, height: cropContainer.clientHeight }

      const nextCropContainerCoordinate = this.moveCropContainerLogic.handleCropContainerMove({
        mouseCoordinate,
        rootCoordinate,
        rootRect,
        cropContainerRect,
      })

      if (nextCropContainerCoordinate !== null) {
        cropContainerRenderer.renderCropContainer({ coordinate: nextCropContainerCoordinate })
      }
    }
  }

  private handleWindowMouseUp() {
    this.moveCropContainerLogic.handleCropContainerInactive()
  }

  public enable(): void {
    const cropperElements = this.cropperRenderer.getCropperElements()
    const cropContainerRenderer = this.cropperRenderer.getCropContainerRenderer()

    if (cropperElements !== null && cropContainerRenderer !== null) {
      const { root, cropContainerMovePlaceholder } = cropperElements

      cropContainerRenderer.makeItMoveable()

      cropContainerMovePlaceholder.addEventListener('mousedown', this.handleCropContainerMouseDown)
      root.addEventListener('mousemove', this.handleRootMouseMove)
      window.addEventListener('mouseup', this.handleWindowMouseUp)
    }
  }

  public disable(): void {
    const cropperElements = this.cropperRenderer.getCropperElements()
    const cropContainerRenderer = this.cropperRenderer.getCropContainerRenderer()

    if (cropperElements !== null) {
      const { root, cropContainerMovePlaceholder } = cropperElements

      cropContainerRenderer?.makeItNotMoveable()

      cropContainerMovePlaceholder.removeEventListener('mousedown', this.handleCropContainerMouseDown)
      root.removeEventListener('mousemove', this.handleRootMouseMove)
      window.removeEventListener('mouseup', this.handleWindowMouseUp)
    }
  }
}

export { MoveCropContainerFeatureManager }
