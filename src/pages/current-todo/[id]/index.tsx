import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'

import {
  useTodoDetailQuery,
  useUpdateTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
} from '@/services/todo'
import { useAppSelector } from '@/redux/store'

import ControlledInput from '@/components/ControlledInput'
import ControlledTextarea from '@/components/ControlledTextarea'
import ControlledCheckbox from '@/components/ControlledCheckbox'
import Section from '@/components/Section'
import Form from '@/components/Form'
import Button from '@/components/Button'
import ArrowLeft from '@/components/icons/ArrowLeft'

type FormInputs = {
  name: string
  memo: string
  is_important: boolean
}

const INITIAL_VALUES = {
  name: '',
  memo: '',
  is_important: false,
}

const TodoDetail = () => {
  const router = useRouter()
  const id = Number(router.query.id)
  const token = useAppSelector(({ auth }) => auth.token)
  const [isLoading, setIsLoading] = useState(false)

  const [updateTodo] = useUpdateTodoMutation()
  const [completeTodo] = useCompleteTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const { data, refetch } = useTodoDetailQuery({ token, id })

  const { handleSubmit, control, formState } = useForm<FormInputs>({
    defaultValues: INITIAL_VALUES,
    values: data,
  })

  const onUpdateTodo: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true)
    try {
      const res = await updateTodo({ token, id, ...data }).unwrap()
      if (res.user) {
        setIsLoading(false)
        refetch()
      }
    } catch (error) {
      setIsLoading(true)
      console.log(false)
    }
  }

  const handleOnCompleteTodo = async () => {
    setIsLoading(true)
    try {
      const completed_at = new Date().toISOString()
      const res = await completeTodo({ token, id, completed_at }).unwrap()
      if (res.user) {
        await router.push('/current-todo')
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(true)
      console.log(false)
    }
  }

  const handleOnDeleteTodo = async () => {
    setIsLoading(true)
    try {
      await deleteTodo({ token, id }).unwrap()
      await router.push('/current-todo')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(true)
      console.log(false)
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
