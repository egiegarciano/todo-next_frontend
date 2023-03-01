import React, { HTMLAttributes } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
} & HTMLAttributes<HTMLTextAreaElement>

const ControlledTextarea = <T extends FieldValues>(props: Props<T>) => {
  const { name, control, ...rest } = props
  const { field, fieldState } = useController({ name, control })
  const { value, ref, onChange } = field
  const { error } = fieldState

  return (
    <div className='flex flex-col space-y-1'>
      {error?.message && <div>{error.message}</div>}
      <label htmlFor={name}>Memo:</label>
      <textarea
        value={value ?? ''}
        onChange={onChange}
        ref={ref}
        id={name}
        rows={3}
        className='rounded-md py-1 px-2'
        {...rest}
      />
    </div>
  )
}

export default ControlledTextarea
