import {
  CLASS_NAME_PREFIX,
  COMMON_HIDDEN,
  CROPPER_LINE_NOT_RESIZABLE,
  CROPPER_POINT_NOT_RESIZABLE,
  CROP_CONTAINER_MOVEABLE,
} from './constants'
import type { CropContainerPosition, CropContainerSize, CropperElements, CropperRenderer } from './types'

import cropperTemplateHTML from './cropper-template.html'

class CropperRendererImpl implements CropperRenderer {
  private rawImageElement: HTMLImageElement
  private cropperElements: CropperElements

  constructor(rawImageElement: HTMLImageElement) {
    this.rawImageElement = rawImageElement

    // 渲染 cropper 相关元素，并存储相关元素的引用
    this.renderCropperTemplate()

    this.cropperElements = this.resolveCropperElements()
  }

  private resolveCropperElements(): CropperElements {
    const root = this.rawImageElement.nextSibling as HTMLDivElement
    const cropContainer = root.querySelector<HTMLDivElement>(`.${CLASS_NAME_PREFIX}__crop-container`)!

    return {
      root,
      cropContainer,
      cropContainerLines: {
        n: cropContainer.querySelector('.plasticine-cropper__line--n')!,
        e: cropContainer.querySelector('.plasticine-cropper__line--e')!,
        s: cropContainer.querySelector('.plasticine-cropper__line--s')!,
        w: cropContainer.querySelector('.plasticine-cropper__line--w')!,
      },
      cropContainerPoints: {
        n: cropContainer.querySelector('.plasticine-cropper__point--n')!,
        ne: cropContainer.querySelector('.plasticine-cropper__point--ne')!,
        e: cropContainer.querySelector('.plasticine-cropper__point--e')!,
        se: cropContainer.querySelector('.plasticine-cropper__point--se')!,
        s: cropContainer.querySelector('.plasticine-cropper__point--s')!,
        sw: cropContainer.querySelector('.plasticine-cropper__point--sw')!,
        w: cropContainer.querySelector('.plasticine-cropper__point--w')!,
        nw: cropContainer.querySelector('.plasticine-cropper__point--nw')!,
      },
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

  public renderCropContainer(cropContainerPosition: CropContainerPosition, cropContainerSize: CropContainerSize): void {
    const { cropContainer } = this.cropperElements

    cropContainer.style.left = cropContainerPosition.left
    cropContainer.style.top = cropContainerPosition.top
    cropContainer.style.width = cropContainerSize.width
    cropContainer.style.height = cropContainerSize.height
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

  public makeCropContainerResizable(): void {
    this.setCropContainerResizable(true)
  }

  public makeCropContainerNotResizable(): void {
    this.setCropContainerResizable(false)
  }
}

export { CropperRendererImpl }
