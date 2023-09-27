import type { CropperElements } from './cropper-elements'

export interface CropperRenderer {
  /** 获取 cropper 相关元素 */
  getCropperElements(): CropperElements

  /** 隐藏原始传入的图片元素 */
  hideRawImageElement(): void

  /** 展示原始传入的图片元素 */
  showRawImageElement(): void

  /** 让裁切窗口可移动 */
  makeCropContainerMoveable(): void

  /** 让裁切窗口固定 */
  makeCropContainerFreeze(): void

  /** 移动 crop 窗口 */
  moveCropContainer(x: number, y: number): void
}
