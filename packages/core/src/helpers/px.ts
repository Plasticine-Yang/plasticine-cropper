/**
 * 将像素值转为带有 px 后缀的字符串
 *
 * @example withPx(16) === '16px'
 *
 * @param px 像素值
 * @returns 带有 `px` 后缀的字符串
 */
function withPx(px: number | string) {
  return typeof px === 'string' ? px : `${px}px`
}

export { withPx }
