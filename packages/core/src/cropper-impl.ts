import { CropperEventManagerImpl } from './cropper-event-manager-impl'
import { CropperRendererImpl } from './cropper-renderer-impl'
import type { Cropper, CropperEventManager, CropperRenderer } from './types'

class CropperImpl implements Cropper {
  private rawImageElement: HTMLImageElement

  /** 负责渲染 DOM */
  private cropperRendererImpl: CropperRenderer

  /** 负责管理事件 */
  private cropperEventManagerImpl: CropperEventManager

  constructor(imageElement: HTMLImageElement) {
    try {
      this.rawImageElement = imageElement

      // 创建渲染器实例
      this.cropperRendererImpl = new CropperRendererImpl(this.rawImageElement)

      // 创建事件管理器实例
      this.cropperEventManagerImpl = new CropperEventManagerImpl(this.cropperRendererImpl)

      // 隐藏原始的图片元素，展示 plasticine-cropper
      this.cropperRendererImpl.hideRawImageElement()

      // 绑定事件
      this.cropperEventManagerImpl.bindAllEventListeners()
    } catch (error) {
      console.error('[plasticine-cropper] init failed', error)
      throw error
    }
  }

  public destroy(): void {
    this.cropperEventManagerImpl.removeAllEventListeners()
  }
}

export { CropperImpl }
