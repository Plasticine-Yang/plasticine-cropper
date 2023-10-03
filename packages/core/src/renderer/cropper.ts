import { CLASS_NAME_PREFIX, COMMON_HIDDEN } from '../constants'
import cropperTemplateHTML from '../cropper-template.html'
import type { CropContainerRenderer, CropperElements, CropperRenderer } from '../types'
import { CropContainerRendererImpl } from './crop-container'

class CropperRendererImpl implements CropperRenderer {
  private rawImageElement: HTMLImageElement
  private parentNodeOfRawImageElement: ParentNode | null
  private cropperElements: CropperElements | null
  private cropContainerRenderer: CropContainerRenderer | null

  constructor(rawImageElement: HTMLImageElement) {
    const parentNodeOfRawImageElement = rawImageElement.parentNode
    if (parentNodeOfRawImageElement === null) {
      throw new Error('图片缺少容器元素')
    }

    this.rawImageElement = rawImageElement
    this.parentNodeOfRawImageElement = parentNodeOfRawImageElement
    this.cropperElements = null
    this.cropContainerRenderer = null
  }

  /** 解析相关元素并存储相关，方便在其他方法中使用 */
  private resolveCropperElements(): CropperElements {
    const root = this.rawImageElement.nextSibling as HTMLDivElement
    const cropContainer = root.querySelector<HTMLDivElement>(`.${CLASS_NAME_PREFIX}__crop-container`)!

    return {
      root,

      cropContainer,

      cropContainerMovePlaceholder: cropContainer.querySelector('.plasticine-cropper__move-placeholder')!,

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

  public mount(): void {
    const fragment = document.createDocumentFragment()
    const range = document.createRange()
    const cropperFragment = range.createContextualFragment(cropperTemplateHTML)

    fragment.appendChild(cropperFragment)

    if (this.parentNodeOfRawImageElement !== null) {
      this.parentNodeOfRawImageElement.insertBefore(fragment, this.rawImageElement.nextSibling)

      this.cropperElements = this.resolveCropperElements()
      this.cropContainerRenderer = new CropContainerRendererImpl(this.cropperElements)
    } else {
      throw new Error('未发现图片的容器元素，无法渲染 plasticine cropper')
    }
  }

  public unmount(): void {
    const cropperElements = this.getCropperElements()

    if (this.parentNodeOfRawImageElement !== null && cropperElements !== null) {
      const { root } = cropperElements

      this.parentNodeOfRawImageElement.removeChild(root)
      this.cropperElements = null
      this.cropContainerRenderer = null
    } else {
      throw new Error('图片容器不存在或者 plasticine-cropper 相关节点尚未挂载')
    }
  }

  public getCropperElements(): CropperElements | null {
    return this.cropperElements
  }

  public getParentNodeOfRawImageElement(): ParentNode | null {
    return this.parentNodeOfRawImageElement
  }

  public hideRawImageElement(): void {
    this.rawImageElement.classList.add(COMMON_HIDDEN)
  }

  public showRawImageElement(): void {
    this.rawImageElement.classList.remove(COMMON_HIDDEN)
  }

  public getCropContainerRenderer(): CropContainerRenderer | null {
    return this.cropContainerRenderer
  }
}

export { CropperRendererImpl }
