import { MoveCropContainerFeatureManager, ResizeCropContainerFeatureManager } from './features'
import type { CropperEventManager, CropperFeatureManager, CropperRenderer, ResolvedCropperOptions } from './types'

class CropperEventManagerImpl implements CropperEventManager {
  private cropperRenderer: CropperRenderer

  /** 移动裁切窗口 */
  private moveCropContainerFeatureManager: CropperFeatureManager

  /** 调节裁切窗口大小 */
  private resizeCropContainerFeatureManager: CropperFeatureManager

  private resolvedCropperOptions: ResolvedCropperOptions

  constructor(cropperRenderer: CropperRenderer, resolvedCropperOptions: ResolvedCropperOptions) {
    this.cropperRenderer = cropperRenderer
    this.resolvedCropperOptions = resolvedCropperOptions

    this.moveCropContainerFeatureManager = new MoveCropContainerFeatureManager(this.cropperRenderer)
    this.resizeCropContainerFeatureManager = new ResizeCropContainerFeatureManager(this.cropperRenderer)
  }

  public bindAllEventListeners(): void {
    const { cropContainerConfig } = this.resolvedCropperOptions
    const { moveable, resizable } = cropContainerConfig

    moveable && this.moveCropContainerFeatureManager.enable()
    resizable && this.resizeCropContainerFeatureManager.enable()
  }

  public removeAllEventListeners(): void {
    this.moveCropContainerFeatureManager.disable()
    this.resizeCropContainerFeatureManager.disable()
  }
}

export { CropperEventManagerImpl }
