import { createMoveCropContainerLogic } from './logics'
import type { CropperEventManager, CropperRenderer, Logic } from './types'

class CropperEventManagerImpl implements CropperEventManager {
  private cropperRenderer: CropperRenderer

  private moveCropContainerLogic: Logic

  constructor(cropperRenderer: CropperRenderer) {
    this.cropperRenderer = cropperRenderer

    // 相关逻辑初始化
    this.moveCropContainerLogic = createMoveCropContainerLogic(this.cropperRenderer)
  }

  public bindAllEventListeners(): void {
    this.moveCropContainerLogic.bindEventListeners()
  }

  public removeAllEventListeners(): void {
    this.moveCropContainerLogic.removeEventListeners()
  }
}

export { CropperEventManagerImpl }
