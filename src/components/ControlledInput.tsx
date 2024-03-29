import React, { InputHTMLAttributes } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { ControlledProps } from '@/types/form'

type Props<T extends FieldValues> = UseControllerProps<T> &
  InputHTMLAttributes<HTMLInputElement> & {
    label: string
  }

const ControlledInput = <T extends FieldValues>(props: Props<T>) => {
  const { name, control, label, type = 'text', ...rest } = props
  const { field, fieldState } = useController({ name, control })
  const { error } = fieldState

  return (
    <div className='flex flex-col space-y-1'>
      {error?.message && <div>{error.message}</div>}
      <label htmlFor={name}>{label}</label>
      <input
        {...field}
        id={name}
        type={type}
        className='rounded-md py-1 px-2'
        {...rest}
      />
    </div>
  )
}

export default ControlledInput
