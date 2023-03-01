import React, { InputHTMLAttributes } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
} & InputHTMLAttributes<HTMLInputElement>

const ControlledInput = <T extends FieldValues>(props: Props<T>) => {
  const { name, control, ...rest } = props
  const { field, fieldState } = useController({ name, control })
  const { value, ref, onChange } = field
  const { error } = fieldState

  return (
    <div className='flex flex-col space-y-1'>
      {error?.message && <div>{error.message}</div>}
      <label htmlFor={name}>Title:</label>
      <input
        value={value ?? ''}
        onChange={onChange}
        ref={ref}
        id={name}
        type='text'
        className='rounded-md py-1 px-2'
        {...rest}
      />
    </div>
  )
}

export default ControlledInput
