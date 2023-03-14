import { ButtonHTMLAttributes } from 'react'
import Spinner from './icons/Spinner'

type Props = {
  isLoading?: boolean
  title?: string
  type?: 'button' | 'reset' | 'submit' | undefined
  form?: string
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: Props) => {
  const { isLoading, title, type, className, ...rest } = props
  return (
    <button
      type={type ?? 'submit'}
      form='create-todo-form'
      disabled={isLoading}
      className={`w-28 rounded-md bg-blue-700 py-2 text-base font-bold tracking-wider text-white disabled:bg-gray-500 lg:text-xl ${className}`}
      {...rest}
    >
      {isLoading ? <Spinner /> : title ?? 'Submit'}
    </button>
  )
}

export default Button
