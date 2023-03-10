import React, { HTMLAttributes, ReactNode, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/redux/store'
import { ToastProp } from '@/types/toast'
import { showToast } from '@/redux/toast/slice'
import CheckCircle from './icons/CheckCircle'
import ExclamationCircle from './icons/ExclamationCircle'

type Props = HTMLAttributes<HTMLDivElement>

const getIcon = (type: string) => {
  const icons: { [key: string]: ReactNode } = {
    success: <CheckCircle />,
    error: <ExclamationCircle />,
  }
  return icons[type] ?? ''
}

const Toast = ({ ...rest }: Props) => {
  const dispatch = useAppDispatch()
  const toast = useAppSelector((state) => state.toast)
  const { isShow, text, icon, duration = 3, customStyle } = toast

  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        dispatch(showToast({ isShow: false }))
      }, duration * 1000)
    }
  }, [dispatch, duration, isShow])

  return (
    <div
      className={`absolute bottom-28 right-14 items-center gap-2 rounded-md bg-gray-400 px-3 py-2 text-sm font-bold text-black md:text-base ${
        isShow ? 'flex' : 'hidden'
      } ${customStyle}`}
      {...rest}
    >
      {getIcon(icon!)}
      <p>{text}</p>
    </div>
  )
}

export default Toast
