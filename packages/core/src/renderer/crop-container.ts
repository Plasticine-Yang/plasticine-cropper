import { CROPPER_LINE_NOT_RESIZABLE, CROPPER_POINT_NOT_RESIZABLE, CROP_CONTAINER_MOVEABLE } from '@/constants'
import { withPx } from '@/helpers'
import type { CropContainerRenderer, CropperElements, RenderCropContainerProps } from '@/types'

class CropContainerRendererImpl implements CropContainerRenderer {
  constructor(private cropperElements: CropperElements) {}

  /** 内部调节裁切窗口是否可调节大小 - 供对外 API 复用 */
  private setCropContainerResizable(resizable: boolean) {
    const { cropContainerLines, cropContainerPoints } = this.cropperElements
    const operation: 'add' | 'remove' = resizable ? 'remove' : 'add'

    for (const lineElement of Object.values(cropContainerLines)) {
      lineElement.classList[operation](CROPPER_LINE_NOT_RESIZABLE)
    }

    for (const pointElement of Object.values(cropContainerPoints)) {
      pointElement.classList[operation](CROPPER_POINT_NOT_RESIZABLE)
    }
  }

  public renderCropContainer(props: RenderCropContainerProps): void {
    const { coordinate, rect } = props
    const { cropContainer } = this.cropperElements

    if (coordinate) {
      const { x, y } = coordinate

      cropContainer.style.left = withPx(x)
      cropContainer.style.top = withPx(y)
    }

    if (rect) {
      const { width, height } = rect

      cropContainer.style.width = withPx(width)
      cropContainer.style.height = withPx(height)
    }
  }

  public makeItMoveable(): void {
    const { cropContainerMovePlaceholder } = this.cropperElements

    cropContainerMovePlaceholder.classList.add(CROP_CONTAINER_MOVEABLE)
  }

  public makeItNotMoveable(): void {
    const { cropContainerMovePlaceholder } = this.cropperElements

    cropContainerMovePlaceholder.classList.remove(CROP_CONTAINER_MOVEABLE)
  }

  public makeItResizable(): void {
    this.setCropContainerResizable(true)
  }

  public makeItNotResizable(): void {
    this.setCropContainerResizable(false)
  }
}

export { CropContainerRendererImpl }
