/** 裁切器相关元素 */
export interface CropperElements {
  /** 裁切器根节点 */
  root: HTMLDivElement

  /** 裁切窗口容器元素 */
  cropContainer: HTMLDivElement

  /** 裁切窗口调节大小的四条线 */
  cropContainerLines: {
    n: HTMLDivElement
    e: HTMLDivElement
    s: HTMLDivElement
    w: HTMLDivElement
  }

  /** 裁切窗口调节大小的八个点 */
  cropContainerPoints: {
    n: HTMLDivElement
    ne: HTMLDivElement
    e: HTMLDivElement
    se: HTMLDivElement
    s: HTMLDivElement
    sw: HTMLDivElement
    w: HTMLDivElement
    nw: HTMLDivElement
  }
}
