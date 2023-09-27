export type DeepRequired<T> = {
  [P in keyof T]-?: NonNullable<T[P]> extends Record<any, any> ? DeepRequired<NonNullable<T[P]>> : NonNullable<T[P]>
}
