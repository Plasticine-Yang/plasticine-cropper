export interface CropperOptions {
  /**
   * 裁切窗口是否可移动
   *
   * @default true
   */
  moveable?: boolean
}

export type ResolvedCropperOptions = Required<CropperOptions>
