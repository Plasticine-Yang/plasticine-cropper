import { MoveCropContainerFeatureManager } from './features'
import type { CropperEventManager, CropperFeatureManager, CropperRenderer, ResolvedCropperOptions } from './types'

class CropperEventManagerImpl implements CropperEventManager {
  private cropperRenderer: CropperRenderer

  private moveCropContainerFeatureManager: CropperFeatureManager

  private resolvedCropperOptions: ResolvedCropperOptions

  constructor(cropperRenderer: CropperRenderer, resolvedCropperOptions: ResolvedCropperOptions) {
    this.cropperRenderer = cropperRenderer
    this.resolvedCropperOptions = resolvedCropperOptions

    // 移动裁切窗口功能初始化
    this.moveCropContainerFeatureManager = new MoveCropContainerFeatureManager(this.cropperRenderer)
  }

  public bindAllEventListeners(): void {
    const { moveable } = this.resolvedCropperOptions

    moveable && this.moveCropContainerFeatureManager.enable()
  }

  public removeAllEventListeners(): void {
    this.moveCropContainerFeatureManager.disable()
  }
}

export { CropperEventManagerImpl }
