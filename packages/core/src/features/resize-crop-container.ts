import { ResizeCropContainerLogic } from '../logics'
import type {
  CropperFeatureManager,
  CropperRenderer,
  DataSetResizeDirection,
  ResizeEvent,
  ResizeStartEvent,
} from '../types'

class ResizeCropContainerFeatureManager implements CropperFeatureManager {
  private cropperRenderer: CropperRenderer
  private resizeCropContainerLogic: ResizeCropContainerLogic

  constructor(cropperRenderer: CropperRenderer) {
    this.cropperRenderer = cropperRenderer
    this.resizeCropContainerLogic = new ResizeCropContainerLogic()

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  private handleMouseDown(e: MouseEvent) {
    const cropperElements = this.cropperRenderer.getCropperElements()

    if (cropperElements !== null) {
      const { cropContainer } = cropperElements

      const resizeStartEvent: ResizeStartEvent = {
        mouseCoordinate: {
          x: e.clientX,
          y: e.clientY,
        },

        cropContainerCoordinate: {
          x: cropContainer.offsetLeft,
          y: cropContainer.offsetTop,
        },

        cropContainerRect: {
          width: cropContainer.clientWidth,
          height: cropContainer.clientHeight,
        },

        direction: ((e.target as HTMLDivElement).dataset as DataSetResizeDirection).plasticineCropperResizeDirection,
      }

      this.resizeCropContainerLogic.handleResizeStart(resizeStartEvent)
    }
  }

  private handleMouseMove(e: MouseEvent) {
    const cropContainerRenderer = this.cropperRenderer.getCropContainerRenderer()

    if (cropContainerRenderer !== null) {
      const resizeEvent: ResizeEvent = {
        mouseCoordinate: {
          x: e.clientX,
          y: e.clientY,
        },
      }

      const result = this.resizeCropContainerLogic.handleResize(resizeEvent)

      if (result !== null) {
        cropContainerRenderer.renderCropContainer({
          coordinate: result.cropContainerCoordinate,
          rect: result.cropContainerRect,
        })
      }
    }
  }

  private handleMouseUp() {
    this.resizeCropContainerLogic.handleResizeEnd()
  }

  public enable(): void {
    const cropperElements = this.cropperRenderer.getCropperElements()
    const cropContainerRenderer = this.cropperRenderer.getCropContainerRenderer()

    if (cropperElements !== null && cropContainerRenderer !== null) {
      const { root, cropContainerLines, cropContainerPoints } = cropperElements

      cropContainerRenderer.makeItResizable()

      for (const lineElement of Object.values(cropContainerLines)) {
        lineElement.addEventListener('mousedown', this.handleMouseDown)
      }

      for (const pointElement of Object.values(cropContainerPoints)) {
        pointElement.addEventListener('mousedown', this.handleMouseDown)
      }

      root.addEventListener('mousemove', this.handleMouseMove)
      root.addEventListener('mouseup', this.handleMouseUp)
    }
  }

  public disable(): void {
    const cropperElements = this.cropperRenderer.getCropperElements()
    const cropContainerRenderer = this.cropperRenderer.getCropContainerRenderer()

    if (cropperElements !== null && cropContainerRenderer !== null) {
      const { root, cropContainerLines, cropContainerPoints } = cropperElements

      cropContainerRenderer.makeItNotResizable()

      for (const lineElement of Object.values(cropContainerLines)) {
        lineElement.removeEventListener('mousedown', this.handleMouseDown)
      }

      for (const pointElement of Object.values(cropContainerPoints)) {
        pointElement.removeEventListener('mousedown', this.handleMouseDown)
      }

      root.removeEventListener('mousemove', this.handleMouseMove)
      root.removeEventListener('mouseup', this.handleMouseUp)
    }
  }
}

export { ResizeCropContainerFeatureManager }
