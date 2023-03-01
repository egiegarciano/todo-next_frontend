import React, { InputHTMLAttributes } from 'react'
import { FieldValues, UseFormRegister, FieldPath } from 'react-hook-form'

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>
  name: FieldPath<T>
} & InputHTMLAttributes<HTMLInputElement>

const Input = <T extends FieldValues>({
  register,
  name,
  ...rest
}: Props<T>) => {
  return (
    <div className='flex flex-col space-y-1'>
      <label htmlFor='title'>Title:</label>
      <input
        {...register(name)}
        {...rest}
        id='title'
        type='text'
        className='rounded-md py-1 px-2'
      />
    </div>
  )
}

export default Input
