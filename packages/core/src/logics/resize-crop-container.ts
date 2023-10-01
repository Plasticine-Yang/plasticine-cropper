import {
  RESIZE_DIRECTION_OF_HEIGHT,
  RESIZE_DIRECTION_OF_WIDTH,
  RESIZE_DIRECTION_OF_X,
  RESIZE_DIRECTION_OF_Y,
  REVERSE_RESIZE_DIRECTION_OF_HEIGHT,
  REVERSE_RESIZE_DIRECTION_OF_WIDTH,
} from '../constants'
import { ResizeDirection } from '../enums'
import type { Coordinate, Rect, ResizeEvent, ResizeResult, ResizeStartEvent } from '../types'

class ResizeCropContainerLogic {
  private resizable: boolean

  /** 记录开始时的鼠标坐标 - 用于计算鼠标坐标偏移量 */
  private resizeStartCoordinate: Coordinate | null

  /** 记录开始时的裁切窗口尺寸 - 作为计算调整大小后的尺寸的基准 */
  private resizeStartCropContainerRect: Rect | null

  /** 记录开始时的裁切窗口坐标 - 作为计算调整大小后的坐标的基准 */
  private resizeStartCropContainerCoordinate: Coordinate | null

  private resizeStartDirection: ResizeDirection | null

  constructor() {
    this.resizable = false
    this.resizeStartCoordinate = null
    this.resizeStartCropContainerRect = null
    this.resizeStartCropContainerCoordinate = null
    this.resizeStartDirection = null
  }

  /**
   * 需要记录开始时的鼠标位置，用于计算差值得到变化后的宽高
   */
  public handleResizeStart(e: ResizeStartEvent) {
    const { cropContainerCoordinate, cropContainerRect, mouseCoordinate, direction } = e

    this.resizable = true
    this.resizeStartCoordinate = mouseCoordinate
    this.resizeStartCropContainerRect = cropContainerRect
    this.resizeStartCropContainerCoordinate = cropContainerCoordinate
    this.resizeStartDirection = direction
  }

  /**
   * 给定裁切窗口原来的宽高、坐标、鼠标的坐标、调整大小的方向，计算出调整大小后的裁切窗口宽高以及坐标
   */
  public handleResize(e: ResizeEvent): ResizeResult | null {
    // base case
    if (
      !this.resizable ||
      this.resizeStartCoordinate === null ||
      this.resizeStartCropContainerRect === null ||
      this.resizeStartCropContainerCoordinate === null ||
      this.resizeStartDirection === null
    ) {
      return null
    }

    const { mouseCoordinate } = e

    /** 鼠标在 x 方向的偏移量 */
    const mouseMoveOffsetX = mouseCoordinate.x - this.resizeStartCoordinate.x

    /** 鼠标在 y 方向的偏移量 */
    const mouseMoveOffsetY = mouseCoordinate.y - this.resizeStartCoordinate.y

    /** 仅当方向会改变宽度时才计算 */
    const nextCropContainerWidth = RESIZE_DIRECTION_OF_WIDTH.includes(this.resizeStartDirection)
      ? // 与鼠标位移方向反向变化的方向
        REVERSE_RESIZE_DIRECTION_OF_WIDTH.includes(this.resizeStartDirection)
        ? this.resizeStartCropContainerRect.width - mouseMoveOffsetX
        : this.resizeStartCropContainerRect.width + mouseMoveOffsetX
      : this.resizeStartCropContainerRect.width

    /** 仅当方向会改变高度时才计算 */
    const nextCropContainerHeight = RESIZE_DIRECTION_OF_HEIGHT.includes(this.resizeStartDirection)
      ? REVERSE_RESIZE_DIRECTION_OF_HEIGHT.includes(this.resizeStartDirection)
        ? this.resizeStartCropContainerRect.height - mouseMoveOffsetY
        : this.resizeStartCropContainerRect.height + mouseMoveOffsetY
      : this.resizeStartCropContainerRect.height

    /** 仅当方向会改变横坐标时才计算 */
    const nextCropContainerX = RESIZE_DIRECTION_OF_X.includes(this.resizeStartDirection)
      ? this.resizeStartCropContainerCoordinate.x + mouseMoveOffsetX
      : this.resizeStartCropContainerCoordinate.x

    /** 仅当方向会改变纵坐标时才计算 */
    const nextCropContainerY = RESIZE_DIRECTION_OF_Y.includes(this.resizeStartDirection)
      ? this.resizeStartCropContainerCoordinate.y + mouseMoveOffsetY
      : this.resizeStartCropContainerCoordinate.y

    return {
      cropContainerRect: {
        width: nextCropContainerWidth,
        height: nextCropContainerHeight,
      },

      cropContainerCoordinate: {
        x: nextCropContainerX,
        y: nextCropContainerY,
      },
    }
  }

  public handleResizeEnd() {
    this.resizable = false
    this.resizeStartCoordinate = null
    this.resizeStartCropContainerCoordinate = null
    this.resizeStartCropContainerRect = null
    this.resizeStartDirection = null
  }
}

export { ResizeCropContainerLogic }
