import { CropperEventManagerImpl } from './cropper-event-manager-impl'
import { CropperRendererImpl } from './cropper-renderer-impl'
import { resolveCropperOptions } from './helpers'
import type { Cropper, CropperEventManager, CropperOptions, CropperRenderer, ResolvedCropperOptions } from './types'

class CropperImpl implements Cropper {
  private rawImageElement: HTMLImageElement

  /** 负责渲染 DOM */
  private cropperRendererImpl: CropperRenderer

  /** 负责管理事件 */
  private cropperEventManagerImpl: CropperEventManager

  private resolvedCropperOptions: ResolvedCropperOptions

  constructor(imageElement: HTMLImageElement, cropperOptions?: CropperOptions) {
    try {
      this.resolvedCropperOptions = resolveCropperOptions(cropperOptions)

      this.rawImageElement = imageElement

      // 创建渲染器实例
      this.cropperRendererImpl = new CropperRendererImpl(this.rawImageElement)

      // 创建事件管理器实例
      this.cropperEventManagerImpl = new CropperEventManagerImpl(this.cropperRendererImpl, this.resolvedCropperOptions)

      this.render()

      this.bindAllEventListeners()
    } catch (error) {
      console.error('[plasticine-cropper] init failed', error)
      throw error
    }
  }

  private render() {
    const { cropContainerConfig } = this.resolvedCropperOptions

    // 隐藏原始的图片元素，展示 plasticine-cropper
    this.cropperRendererImpl.hideRawImageElement()

    // 渲染裁切窗口
    this.cropperRendererImpl.renderCropContainer(cropContainerConfig.initialPosition, cropContainerConfig.initialSize)
  }

  private bindAllEventListeners() {
    this.cropperEventManagerImpl.bindAllEventListeners()
  }

  public destroy(): void {
    this.cropperEventManagerImpl.removeAllEventListeners()
  }
}

export { CropperImpl }
