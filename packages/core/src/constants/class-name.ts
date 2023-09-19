export const CLASS_NAME_PREFIX = 'plasticine-cropper'

/** 获取带有公共前缀的类名 */
function resolveClassName(className: string) {
  return `${CLASS_NAME_PREFIX}-${className}`
}

/** 隐藏元素 */
export const COMMON_HIDDEN = resolveClassName('common-hidden')
