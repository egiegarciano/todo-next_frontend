import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InferType } from 'yup'

import {
  useTodoDetailQuery,
  useUpdateTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
} from '@/services/todo'
import { updateTodoSchema } from '@/validators/todoValidator'

import ControlledInput from '@/components/ControlledInput'
import ControlledTextarea from '@/components/ControlledTextarea'
import ControlledCheckbox from '@/components/ControlledCheckbox'
import Section from '@/components/Section'
import Form from '@/components/Form'
import Button from '@/components/Button'
import ArrowLeft from '@/components/icons/ArrowLeft'

type FormInputs = InferType<typeof updateTodoSchema>

const INITIAL_VALUES = {
  name: '',
  memo: '',
  is_important: false,
}

const TodoDetail = () => {
  const router = useRouter()
  const id = Number(router.query.id)
  const [isLoading, setIsLoading] = useState(false)

  const [updateTodo] = useUpdateTodoMutation()
  const [completeTodo] = useCompleteTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const { data, refetch } = useTodoDetailQuery(id)

  const { handleSubmit, control, formState } = useForm<FormInputs>({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(updateTodoSchema),
    mode: 'onChange',
    values: data,
  })

  const onUpdateTodo: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true)
    try {
      const res = await updateTodo({ id, ...data }).unwrap()
      if (res.user) {
        setIsLoading(false)
        refetch()
      }
    } catch (error) {
      setIsLoading(true)
      console.log(error)
    }
  }

  const handleOnCompleteTodo = async () => {
    setIsLoading(true)
    try {
      const completed_at = new Date().toISOString()
      const res = await completeTodo({ id, completed_at }).unwrap()
      if (res.user) {
        await router.push('/current-todo')
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(true)
      console.log(error)
    }
  }

  const handleOnDeleteTodo = async () => {
    setIsLoading(true)
    try {
      await deleteTodo(id).unwrap()
      await router.push('/current-todo')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(true)
      console.log(error)
    }
  }

  return (
    <Section title='Todo Details'>
      <Form handleSubmit={handleSubmit} onSubmit={onUpdateTodo}>
        <Link href='/current-todo' className='absolute top-4'>
          <ArrowLeft />
        </Link>
        <ControlledInput name='name' control={control} label='Title:' />
        <ControlledTextarea name='memo' control={control} label='Memo:' />
        <ControlledCheckbox
          name='is_important'
          control={control}
          label='Mark as important:'
        />
      </Form>
      <div className='flex space-x-3 md:space-x-5'>
        <Button
          title='Delete'
          className='w-[85px] bg-red-700 md:w-28'
          type='button'
          isLoading={isLoading}
          onClick={handleOnDeleteTodo}
        />
        <Button
          title='Update'
          className='w-[85px] md:w-28'
          isLoading={isLoading}
        />
        <Button
          title='Complete'
          className='w-[85px] bg-green-700 md:w-28'
          type='button'
          isLoading={isLoading}
          onClick={handleOnCompleteTodo}
        />
      </div>
    </Section>
  )
}

export default TodoDetail
