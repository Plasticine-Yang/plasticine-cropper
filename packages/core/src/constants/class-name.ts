export const CLASS_NAME_PREFIX = 'plasticine-cropper'

/** 获取带有公共前缀的类名 */
function resolveClassName(className: string) {
  const connectPart = ['-', '--', '__'].some((connector) => className.startsWith(connector)) ? '' : '-'

  return `${CLASS_NAME_PREFIX}${connectPart}${className}`
}

/** 隐藏元素 */
export const COMMON_HIDDEN = resolveClassName('common-hidden')

/** 裁切窗口可移动的样式 */
export const CROP_CONTAINER_MOVEABLE = resolveClassName('__crop-container--moveable')
