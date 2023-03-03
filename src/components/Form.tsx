import { ReactNode } from 'react'
import {
  SubmitHandler,
  FieldValues,
  UseFormHandleSubmit,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
  children: ReactNode
  handleSubmit: UseFormHandleSubmit<T>
  onSubmit: SubmitHandler<T>
}

const Form = <T extends FieldValues>(props: Props<T>) => {
  const { children, handleSubmit, onSubmit } = props
  return (
    <form
      id='create-todo-form'
      onSubmit={handleSubmit(onSubmit)}
      className='lex w-full flex-col space-y-6 rounded-md bg-blue-500 px-4 py-10 text-left md:w-[380px] lg:w-[500px]'
    >
      {children}
    </form>
  )
}

export default Form
