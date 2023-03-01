import React, { InputHTMLAttributes } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
} & InputHTMLAttributes<HTMLInputElement>

const ControlledCheckbox = <T extends FieldValues>(props: Props<T>) => {
  const { name, control, ...rest } = props
  const { field, fieldState } = useController({ name, control })
  const { value, ref, onChange } = field
  const { error } = fieldState

  return (
    <div className='flex items-center space-x-2'>
      {error?.message && <div>{error.message}</div>}
      <label htmlFor={name}>Mark as important:</label>
      <input
        value={value ?? ''}
        onChange={onChange}
        ref={ref}
        id={name}
        type='checkbox'
        className='rounded-md py-1 px-2'
        {...rest}
      />
    </div>
  )
}

export default ControlledCheckbox
