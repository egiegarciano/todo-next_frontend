export type ToastIcon = 'error' | 'success'

export type ToastProp = {
  icon?: ToastIcon
  text?: string
  isShow?: boolean
  customStyle?: string
  duration?: number
}
