import {
  RESIZE_DIRECTION_OF_HEIGHT,
  RESIZE_DIRECTION_OF_WIDTH,
  RESIZE_DIRECTION_OF_X,
  RESIZE_DIRECTION_OF_Y,
} from '../constants'
import type { Coordinate, Rect, ResizeEvent, ResizeResult, ResizeStartEvent } from '../types'

class ResizeCropContainerLogic {
  private resizable: boolean

  /** 记录开始时的鼠标坐标 - 用于计算鼠标坐标偏移量 */
  private resizeStartCoordinate: Coordinate | null

  /** 记录开始时的裁切窗口尺寸 - 作为计算调整大小后的尺寸的基准 */
  private resizeStartCropContainerRect: Rect | null

  /** 记录开始时的裁切窗口坐标 - 作为计算调整大小后的坐标的基准 */
  private resizeStartCropContainerCoordinate: Coordinate | null

  constructor() {
    this.resizable = false
    this.resizeStartCoordinate = null
    this.resizeStartCropContainerRect = null
    this.resizeStartCropContainerCoordinate = null
  }

  /**
   * 需要记录开始时的鼠标位置，用于计算差值得到变化后的宽高
   */
  public handleResizeStart(e: ResizeStartEvent) {
    const { cropContainerCoordinate, cropContainerRect, mouseCoordinate } = e

    console.log('start')

    this.resizable = true
    this.resizeStartCoordinate = mouseCoordinate
    this.resizeStartCropContainerRect = cropContainerRect
    this.resizeStartCropContainerCoordinate = cropContainerCoordinate
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
      this.resizeStartCropContainerCoordinate === null
    ) {
      return null
    }

    const { mouseCoordinate, direction } = e

    /** 鼠标在 x 方向的偏移量 */
    const mouseMoveOffsetX = mouseCoordinate.x - this.resizeStartCoordinate.x

    /** 鼠标在 y 方向的偏移量 */
    const mouseMoveOffsetY = mouseCoordinate.y - this.resizeStartCoordinate.y

    /** 仅当方向会改变宽度时才计算 */
    const nextCropContainerWidth = RESIZE_DIRECTION_OF_WIDTH.includes(direction)
      ? this.resizeStartCropContainerRect.width + mouseMoveOffsetX
      : this.resizeStartCropContainerRect.width

    /** 仅当方向会改变宽度时才计算 */
    const nextCropContainerHeight = RESIZE_DIRECTION_OF_HEIGHT.includes(direction)
      ? this.resizeStartCropContainerRect.height + mouseMoveOffsetY
      : this.resizeStartCropContainerRect.height

    /** 仅当方向会改变横坐标时才计算 */
    const nextCropContainerX = RESIZE_DIRECTION_OF_X.includes(direction)
      ? this.resizeStartCropContainerCoordinate.x + mouseMoveOffsetX
      : this.resizeStartCropContainerCoordinate.x

    /** 仅当方向会改变横坐标时才计算 */
    const nextCropContainerY = RESIZE_DIRECTION_OF_Y.includes(direction)
      ? this.resizeStartCropContainerCoordinate.y + mouseMoveOffsetY
      : this.resizeStartCropContainerCoordinate.y

    console.log(e)
    console.log(
      mouseMoveOffsetX,
      mouseMoveOffsetY,
      nextCropContainerWidth,
      nextCropContainerHeight,
      nextCropContainerX,
      nextCropContainerY,
    )

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
    console.log('end')
    this.resizable = false
    this.resizeStartCoordinate = null
  }
}

export { ResizeCropContainerLogic }
