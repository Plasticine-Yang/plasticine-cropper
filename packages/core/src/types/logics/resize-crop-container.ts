import { ResizeDirection } from '../../enums'
import type { Coordinate, Rect } from '../shared'

export interface ResizeStartEvent {
  /** 初始的裁切窗口尺寸 */
  cropContainerRect: Rect

  /** 初始的裁切窗口坐标 */
  cropContainerCoordinate: Coordinate

  /** 初始的鼠标坐标 */
  mouseCoordinate: Coordinate
}

export interface ResizeEvent {
  /** 鼠标坐标 */
  mouseCoordinate: Coordinate

  /** 调整大小的方向 */
  direction: ResizeDirection
}

export interface ResizeResult {
  /** 调整大小后的裁切窗口尺寸 */
  cropContainerRect: Rect

  /** 调整大小之后的裁切窗口坐标 */
  cropContainerCoordinate: Coordinate
}
