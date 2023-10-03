import { DEFAULT_CROP_CONTAINER_CONFIG } from '@/constants'
import type { CropperOptions, ResolvedCropperOptions } from '@/types'

/** 将用户传入的参数解析成内部使用的参数 */
function resolveCropperOptions(options?: CropperOptions): ResolvedCropperOptions {
  return {
    cropContainerConfig: {
      moveable: options?.cropContainerConfig?.moveable ?? DEFAULT_CROP_CONTAINER_CONFIG.moveable,

      resizable: options?.cropContainerConfig?.resizable ?? DEFAULT_CROP_CONTAINER_CONFIG.resizable,

      initialPosition: {
        x: options?.cropContainerConfig?.initialPosition?.x ?? DEFAULT_CROP_CONTAINER_CONFIG.initialPosition.x,
        y: options?.cropContainerConfig?.initialPosition?.y ?? DEFAULT_CROP_CONTAINER_CONFIG.initialPosition.y,
      },

      initialSize: {
        width: options?.cropContainerConfig?.initialSize?.width ?? DEFAULT_CROP_CONTAINER_CONFIG.initialSize.width,
        height: options?.cropContainerConfig?.initialSize?.height ?? DEFAULT_CROP_CONTAINER_CONFIG.initialSize.height,
      },
    },
  }
}

export { resolveCropperOptions }
