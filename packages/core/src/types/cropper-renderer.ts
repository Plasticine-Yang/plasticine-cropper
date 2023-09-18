export interface CropperRenderer {
  /** 渲染 cropper template 到原始传入的图片元素的 nextSibling 前 */
  renderCropperTemplate(): void

  /** 隐藏原始传入的图片元素 */
  hideRawImageElement(): void

  /** 展示原始传入的图片元素 */
  showRawImageElement(): void
}
