import { type Coordinate, MoveCropContainerLogic, Rect } from '../logics'
import type { CropperFeatureManager, CropperRenderer } from '../types'

class MoveCropContainerFeatureManager implements CropperFeatureManager {
  private moveCropContainerLogic: MoveCropContainerLogic

  constructor(private cropperRenderer: CropperRenderer) {
    this.moveCropContainerLogic = new MoveCropContainerLogic()

    this.handleCropContainerMouseDown = this.handleCropContainerMouseDown.bind(this)
    this.handleRootMouseMove = this.handleRootMouseMove.bind(this)
    this.handleWindowMouseUp = this.handleWindowMouseUp.bind(this)
  }

  private handleCropContainerMouseDown(e: MouseEvent) {
    const { cropContainer } = this.cropperRenderer.getCropperElements()
    const cropContainerRect = cropContainer.getBoundingClientRect()

    const mouseCoordinate: Coordinate = { x: e.clientX, y: e.clientY }
    const cropContainerCoordinate: Coordinate = { x: cropContainerRect.left, y: cropContainerRect.top }

    this.moveCropContainerLogic.handleCropContainerActive(mouseCoordinate, cropContainerCoordinate)
  }

  private handleRootMouseMove(e: MouseEvent) {
    const { root, cropContainer } = this.cropperRenderer.getCropperElements()

    const mouseCoordinate: Coordinate = { x: e.clientX, y: e.clientY }
    const rootCoordinate: Coordinate = { x: root.offsetLeft, y: root.offsetTop }
    const cropContainerRect: Rect = { width: cropContainer.clientWidth, height: cropContainer.clientHeight }

    const result = this.moveCropContainerLogic.handleCropContainerMove(
      mouseCoordinate,
      rootCoordinate,
      cropContainerRect,
    )

    if (result !== null) {
      const { x, y } = result

      this.cropperRenderer.moveCropContainer(x, y)
    }
  }

  private handleWindowMouseUp() {
    this.moveCropContainerLogic.handleCropContainerInactive()
  }

  public enable(): void {
    const { root, cropContainer } = this.cropperRenderer.getCropperElements()

    this.cropperRenderer.makeCropContainerMoveable()

    cropContainer.addEventListener('mousedown', this.handleCropContainerMouseDown)
    root.addEventListener('mousemove', this.handleRootMouseMove)
    window.addEventListener('mouseup', this.handleWindowMouseUp)
  }

  public disable(): void {
    const { root, cropContainer } = this.cropperRenderer.getCropperElements()

    this.cropperRenderer.makeCropContainerFreeze()

    cropContainer.removeEventListener('mousedown', this.handleCropContainerMouseDown)
    root.removeEventListener('mousemove', this.handleRootMouseMove)
    window.removeEventListener('mouseup', this.handleWindowMouseUp)
  }
}

export { MoveCropContainerFeatureManager }
