import { CLASS_NAME_PREFIX, COMMON_HIDDEN, CROP_CONTAINER_MOVEABLE } from './constants'
import type { CropperElements, CropperRenderer } from './types'

import cropperTemplateHTML from './cropper-template.html'

class CropperRendererImpl implements CropperRenderer {
  private rawImageElement: HTMLImageElement
  private cropperElements: CropperElements

  constructor(rawImageElement: HTMLImageElement) {
    this.rawImageElement = rawImageElement

    // 渲染 cropper 相关元素，并存储相关元素的引用
    this.renderCropperTemplate()

    const root = this.rawImageElement.nextSibling as HTMLDivElement
    this.cropperElements = {
      root,
      cropContainer: root.querySelector<HTMLDivElement>(`.${CLASS_NAME_PREFIX}__crop-container`)!,
    }
  }

  private renderCropperTemplate(): void {
    const fragment = document.createDocumentFragment()
    const range = document.createRange()
    const cropperFragment = range.createContextualFragment(cropperTemplateHTML)
    const containerElement = this.rawImageElement.parentNode

    fragment.appendChild(cropperFragment)

    if (containerElement) {
      containerElement.insertBefore(fragment, this.rawImageElement.nextSibling)
    } else {
      throw new Error('未发现图片的容器元素，无法渲染 plasticine cropper')
    }
  }

  public getCropperElements() {
    return this.cropperElements
  }

  public hideRawImageElement(): void {
    this.rawImageElement.classList.add(COMMON_HIDDEN)
  }

  public showRawImageElement(): void {
    this.rawImageElement.classList.remove(COMMON_HIDDEN)
  }

  public makeCropContainerMoveable(): void {
    const { cropContainer } = this.cropperElements

    cropContainer.classList.add(CROP_CONTAINER_MOVEABLE)
  }

  public makeCropContainerFreeze(): void {
    const { cropContainer } = this.cropperElements

    cropContainer.classList.remove(CROP_CONTAINER_MOVEABLE)
  }

  public moveCropContainer(x: number, y: number): void {
    const { cropContainer } = this.cropperElements

    cropContainer.style.top = `${y}px`
    cropContainer.style.left = `${x}px`
  }
}

export { CropperRendererImpl }
