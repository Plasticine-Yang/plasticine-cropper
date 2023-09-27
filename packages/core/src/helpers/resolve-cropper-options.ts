import { DEFAULT_MOVEABLE } from '../constants'
import type { CropperOptions } from '../types'

/** 将用户传入的参数解析成内部使用的参数 */
function resolveCropperOptions(options?: CropperOptions): Required<CropperOptions> {
  return {
    moveable: options?.moveable ?? DEFAULT_MOVEABLE,
  }
}

export { resolveCropperOptions }
