import React, { InputHTMLAttributes } from 'react'
import { FieldValues, useController } from 'react-hook-form'

import { ControlledProps } from '@/types'

type Props<T extends FieldValues> = { type?: string } & ControlledProps<T> &
  InputHTMLAttributes<HTMLInputElement>

const ControlledInput = <T extends FieldValues>(props: Props<T>) => {
  const { name, control, label, type = 'text', ...rest } = props
  const { field, fieldState } = useController({ name, control })
  const { value, ref, onChange } = field
  const { error } = fieldState

  return (
    <div className='flex flex-col space-y-1'>
      {error?.message && <div>{error.message}</div>}
      <label htmlFor={name}>{label}</label>
      <input
        value={value ?? ''}
        onChange={onChange}
        ref={ref}
        id={name}
        type={type}
        className='rounded-md py-1 px-2'
        {...rest}
      />
    </div>
  )
}

export default ControlledInput
