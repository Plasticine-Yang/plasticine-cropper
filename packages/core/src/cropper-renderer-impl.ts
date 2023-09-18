import type { CropperRenderer } from './types'
import { COMMON_HIDDEN } from './constants'

import cropperTemplateHTML from './cropper-template.html'

class CropperRendererImpl implements CropperRenderer {
  private rawImageElement: HTMLImageElement

  constructor(rawImageElement: HTMLImageElement) {
    this.rawImageElement = rawImageElement
  }

  public renderCropperTemplate(): void {
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

  public hideRawImageElement(): void {
    this.rawImageElement.classList.add(COMMON_HIDDEN)
  }

  public showRawImageElement(): void {
    this.rawImageElement.classList.remove(COMMON_HIDDEN)
  }
}

export { CropperRendererImpl }
