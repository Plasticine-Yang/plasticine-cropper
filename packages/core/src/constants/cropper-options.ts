import type { CropContainerConfig } from '@/types'
import type { DeepRequired } from '@/types/internal-types'

/** 裁切窗口是否可移动的默认值 */
export const DEFAULT_CROP_CONTAINER_CONFIG: DeepRequired<CropContainerConfig> = {
  moveable: true,

  resizable: true,

  initialPosition: {
    x: 0,
    y: 0,
  },

  initialSize: {
    width: 0,
    height: 0,
  },
}
