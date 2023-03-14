import React, { InputHTMLAttributes } from 'react'
import { FieldValues, useController } from 'react-hook-form'

import { ControlledProps } from '@/types/form'

type Props<T extends FieldValues> = ControlledProps<T> &
  InputHTMLAttributes<HTMLInputElement>

const ControlledCheckbox = <T extends FieldValues>(props: Props<T>) => {
  const { name, control, label, ...restProps } = props
  const { field, fieldState } = useController({ name, control })
  const { value, ...restField } = field
  const { error } = fieldState

  return (
    <div className='flex items-center space-x-2'>
      {error?.message && <div>{error.message}</div>}
      <label htmlFor={name}>{label}</label>
      <input
        {...restField}
        checked={value ?? false}
        id={name}
        type='checkbox'
        className='rounded-md py-1 px-2'
        {...restProps}
      />
    </div>
  )
}

export default ControlledCheckbox
