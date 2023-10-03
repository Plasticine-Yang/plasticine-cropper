import { Coordinate, Rect } from '../shared'

export interface CropContainerRenderer {
  /** 渲染裁切窗口 */
  renderCropContainer(props: RenderCropContainerProps): void

  /** 允许移动裁切窗口 */
  makeItMoveable(): void

  /** 禁止移动裁切窗口 */
  makeItNotMoveable(): void

  /** 允许调整裁切窗口大小 */
  makeItResizable(): void

  /** 禁止调整裁切窗口大小 */
  makeItNotResizable(): void
}

export interface RenderCropContainerProps {
  coordinate?: Coordinate
  rect?: Rect
}
