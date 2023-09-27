import type { CropContainerConfig } from '../types'
import type { DeepRequired } from '../types/internal-types'

/** 裁切窗口是否可移动的默认值 */
export const DEFAULT_CROP_CONTAINER_CONFIG: DeepRequired<CropContainerConfig> = {
  moveable: true,

  initialPosition: {
    left: '25%',
    top: '25%',
  },

  initialSize: {
    width: '50%',
    height: '50%',
  },
}
