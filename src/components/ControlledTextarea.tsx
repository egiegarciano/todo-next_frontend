import React, { HTMLAttributes } from 'react'
import { FieldValues, useController } from 'react-hook-form'

import { ControlledProps } from '@/types/form'

type Props<T extends FieldValues> = ControlledProps<T> &
  HTMLAttributes<HTMLTextAreaElement>

const ControlledTextarea = <T extends FieldValues>(props: Props<T>) => {
  const { name, control, label, ...rest } = props
  const { field, fieldState } = useController({ name, control })
  const { error } = fieldState

  return (
    <div className='flex flex-col space-y-1'>
      {error?.message && <div>{error.message}</div>}
      <label htmlFor={name}>{label}</label>
      <textarea
        {...field}
        id={name}
        rows={3}
        className='rounded-md py-1 px-2'
        {...rest}
      />
    </div>
  )
}

export default ControlledTextarea
