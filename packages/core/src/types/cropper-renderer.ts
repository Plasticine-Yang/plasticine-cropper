import type { CropperElements } from './cropper-elements'
import { CropContainerPosition, CropContainerSize } from './cropper-options'

export interface CropperRenderer {
  /** 获取 cropper 相关元素 */
  getCropperElements(): CropperElements

  /** 隐藏原始传入的图片元素 */
  hideRawImageElement(): void

  /** 展示原始传入的图片元素 */
  showRawImageElement(): void

  /** 渲染裁切窗口 */
  renderCropContainer(cropContainerPosition: CropContainerPosition, cropContainerSize: CropContainerSize): void

  /** 让裁切窗口可移动 */
  makeCropContainerMoveable(): void

  /** 让裁切窗口固定 */
  makeCropContainerFreeze(): void

  /** 移动 crop 窗口 */
  moveCropContainer(x: number, y: number): void

  /** 让裁切窗口可调节大小 */
  makeCropContainerResizable(): void

  /** 让裁切窗口不可调节大小 */
  makeCropContainerNotResizable(): void

  /** 调整裁切窗口大小 */
  resizeCropContainer(width: number, height: number): void
}
