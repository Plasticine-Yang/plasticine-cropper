/** 裁切窗口的位置 */
export interface CropContainerPosition {
  /**
   * 裁切窗口相对于 plasticine-cropper 根节点容器的横坐标
   *
   * @default 0
   */
  x: number

  /**
   * 裁切窗口相对于 plasticine-cropper 根节点容器的纵坐标
   *
   * @default 0
   */
  y: number
}

/** 裁切窗口的尺寸 */
export interface CropContainerSize {
  /**
   * 宽度
   *
   * @default 0
   */
  width: number

  /**
   * 高度
   *
   * @default 0
   */
  height: number
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
