import type { DeepRequired } from '../helper-types'
import type { CropContainerConfig } from './crop-container-config'

export interface CropperOptions {
  /** 裁切窗口配置 */
  cropContainerConfig?: CropContainerConfig
}

export type ResolvedCropperOptions = DeepRequired<CropperOptions>

export * from './crop-container-config'
