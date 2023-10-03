import { ResizeDirection } from '@/enums'

/** 会影响裁切窗口横坐标的 resize 方向 */
export const RESIZE_DIRECTION_OF_X: ResizeDirection[] = [
  ResizeDirection.West,
  ResizeDirection.NorthWest,
  ResizeDirection.SouthWest,
]

/** 会影响裁切窗口纵坐标的 resize 方向 */
export const RESIZE_DIRECTION_OF_Y: ResizeDirection[] = [
  ResizeDirection.North,
  ResizeDirection.NorthEast,
  ResizeDirection.NorthWest,
]

/** 会影响裁切窗口宽度的 resize 方向 */
export const RESIZE_DIRECTION_OF_WIDTH: ResizeDirection[] = [
  ResizeDirection.East,
  ResizeDirection.NorthEast,
  ResizeDirection.SouthEast,
  ResizeDirection.West,
  ResizeDirection.NorthWest,
  ResizeDirection.SouthWest,
]

/** 会影响裁切窗口高度的 resize 方向 */
export const RESIZE_DIRECTION_OF_HEIGHT: ResizeDirection[] = [
  ResizeDirection.North,
  ResizeDirection.NorthEast,
  ResizeDirection.NorthWest,
  ResizeDirection.South,
  ResizeDirection.SouthEast,
  ResizeDirection.SouthWest,
]

/** 与鼠标偏移量方向相反的裁切窗口宽度变化 resize 方向 */
export const REVERSE_RESIZE_DIRECTION_OF_WIDTH: ResizeDirection[] = [
  ResizeDirection.West,
  ResizeDirection.NorthWest,
  ResizeDirection.SouthWest,
]

/** 与鼠标偏移量方向相反的裁切窗口高度变化 resize 方向 */
export const REVERSE_RESIZE_DIRECTION_OF_HEIGHT: ResizeDirection[] = [
  ResizeDirection.North,
  ResizeDirection.NorthWest,
  ResizeDirection.NorthEast,
]
