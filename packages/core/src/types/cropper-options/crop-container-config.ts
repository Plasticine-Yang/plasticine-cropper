/** 裁切窗口的位置 */
export interface CropContainerPosition {
  /**
   * 绝对定位下的 left
   *
   * @default 25%
   */
  left: string

  /**
   * 绝对定位下的 top
   *
   * @default 25%
   */
  top: string
}

/** 裁切窗口的尺寸 */
export interface CropContainerSize {
  /**
   * 宽度
   *
   * @default 50%
   */
  width: string

  /**
   * 高度
   *
   * @default 50%
   */
  height: string
}

export interface CropContainerConfig {
  /**
   * 是否可移动
   *
   * @default true
   */
  moveable?: boolean

  /**
   * 是否可调整大小
   *
   * @default true
   */
  resizable?: boolean

  /** 初始位置 */
  initialPosition?: CropContainerPosition

  /** 初始尺寸 */
  initialSize?: CropContainerSize
}
