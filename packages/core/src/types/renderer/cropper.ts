import type { CropperElements } from '@/types/cropper-elements'

import type { CropContainerRenderer } from './crop-container'

export interface CropperRenderer {
  /** 挂载 plasticine-cropper 相关节点 */
  mount(): void

  /** 卸载 plasticine-cropper 相关节点 */
  unmount(): void

  /** 获取 cropper 相关元素 */
  getCropperElements(): CropperElements | null

  /** 获取图片元素的父元素容器节点 */
  getParentNodeOfRawImageElement(): ParentNode | null

  /** 隐藏原始传入的图片元素 */
  hideRawImageElement(): void

  /** 展示原始传入的图片元素 */
  showRawImageElement(): void

  /** 获取裁切窗口渲染器 */
  getCropContainerRenderer(): CropContainerRenderer | null
}
