import { MoveCropContainerFeatureManager } from './features'
import type { CropperEventManager, CropperFeatureManager, CropperRenderer } from './types'

class CropperEventManagerImpl implements CropperEventManager {
  private cropperRenderer: CropperRenderer

  private moveCropContainerFeatureManager: CropperFeatureManager

  constructor(cropperRenderer: CropperRenderer) {
    this.cropperRenderer = cropperRenderer

    // 功能管理初始化
    this.moveCropContainerFeatureManager = new MoveCropContainerFeatureManager(this.cropperRenderer)
  }

  public bindAllEventListeners(): void {
    this.moveCropContainerFeatureManager.enable()
  }

  public removeAllEventListeners(): void {
    this.moveCropContainerFeatureManager.disable()
  }
}

export { CropperEventManagerImpl }
