import cropperTemplateHTML from './cropper-template.html'
import type { Cropper } from './types'

class CropperImpl implements Cropper {
  private rawImageElement: HTMLImageElement
  private rawImageContainerElement: ParentNode | null

  constructor(imageElement: HTMLImageElement) {
    this.rawImageElement = imageElement
    this.rawImageContainerElement = imageElement.parentNode

    this.init()
  }

  private init() {
    this.rawImageElement

    const element = document.createElement('div')

    element.innerHTML = cropperTemplateHTML
    this.rawImageContainerElement?.appendChild(element)
  }
}

export { CropperImpl }
