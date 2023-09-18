import { CropperRendererImpl } from './cropper-renderer-impl'
import type { Cropper, CropperRenderer } from './types'

class CropperImpl implements Cropper {
  private rawImageElement: HTMLImageElement

  /** 负责渲染 DOM */
  private cropperRendererImpl: CropperRenderer

  constructor(imageElement: HTMLImageElement) {
    this.rawImageElement = imageElement
    this.cropperRendererImpl = new CropperRendererImpl(imageElement)

    this.init()
  }

  private init() {
    this.rawImageElement

    try {
      // 在传入的图片元素的 nextSibling 处插入 plasticine-cropper 元素
      this.cropperRendererImpl.renderCropperTemplate()
      this.cropperRendererImpl.hideRawImageElement()
    } catch (error) {
      console.error('[plasticine-cropper] init failed', error)
    }
  }
}

export { CropperImpl }
