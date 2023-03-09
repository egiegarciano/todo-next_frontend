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
  return icons[type]
}

const Toast = ({ ...rest }: Props) => {
  const toast = useAppSelector((state) => state.toast)
  const { isShow, text, icon, duration = 3, customStyle } = toast

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        dispatch(showToast({ isShow: false }))
      }, duration * 1000)
    }
  }, [dispatch, duration, isShow])

  return (
    <div className={`bg-black ${customStyle}`} {...rest}>
      {isShow && (
        <>
          {getIcon(icon!)}
          {text}
        </>
      )}
    </div>
  )
}

export default Toast
