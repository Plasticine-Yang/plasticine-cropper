import { CropperEventManagerImpl } from './cropper-event-manager-impl'
import { CropperRendererImpl } from './cropper-renderer-impl'
import { resolveCropperOptions } from './helpers'
import type { Cropper, CropperEventManager, CropperOptions, CropperRenderer, ResolvedCropperOptions } from './types'

class CropperImpl implements Cropper {
  private rawImageElement: HTMLImageElement

  /** 负责渲染 DOM */
  private cropperRenderer: CropperRenderer

  /** 负责管理事件 */
  private cropperEventManager: CropperEventManager

  private resolvedCropperOptions: ResolvedCropperOptions

  constructor(imageElement: HTMLImageElement, cropperOptions?: CropperOptions) {
    try {
      this.resolvedCropperOptions = resolveCropperOptions(cropperOptions)

      this.rawImageElement = imageElement

      // 创建渲染器实例
      this.cropperRenderer = new CropperRendererImpl(this.rawImageElement)

      // 创建事件管理器实例
      this.cropperEventManager = new CropperEventManagerImpl(this.cropperRenderer, this.resolvedCropperOptions)

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
    this.cropperRenderer.hideRawImageElement()

    // 渲染裁切窗口
    this.cropperRenderer.renderCropContainer(cropContainerConfig.initialPosition, cropContainerConfig.initialSize)
  }

  private bindAllEventListeners() {
    this.cropperEventManager.bindAllEventListeners()
  }

  public destroy(): void {
    this.cropperEventManager.removeAllEventListeners()
  }
}

export { CropperImpl }
