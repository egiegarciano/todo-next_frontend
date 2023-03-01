import React, { ReactNode } from 'react'
import {
  useForm,
  SubmitHandler,
  FieldValues,
  DeepPartial,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>
  children: ReactNode
  defaultValues?: DeepPartial<T>
}

const Form = <T extends FieldValues>({
  onSubmit,
  defaultValues,
  children,
}: Props<T>) => {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child: any) => {
        console.log(typeof child)
        return child?.props.name
          ? React.createElement(child?.type, {
              ...{
                ...child?.props,
                register: methods.register,
                key: child?.props.name,
              },
            })
          : child
      })}
    </form>
  )
}

export default Form
