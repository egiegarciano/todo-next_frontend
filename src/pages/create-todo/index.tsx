import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useCreateTodoMutation } from '@/services/todo'

import ControlledInput from '@/components/ControlledInput'
import ControlledTextarea from '@/components/ControlledTextarea'
import ControlledCheckbox from '@/components/ControlledCheckbox'
import Section from '@/components/Section'
import Form from '@/components/Form'
import Button from '@/components/Button'

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

const CreateTodo = () => {
  const router = useRouter()
  const [createTodo] = useCreateTodoMutation()
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, control, formState } = useForm<FormInputs>({
    defaultValues: INITIAL_VALUES,
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true)
    try {
      const res = await createTodo(data).unwrap()
      if (res.user) {
        await router.push('/current-todo')
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <Section title='Create a to do'>
      <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <ControlledInput name='name' control={control} label='Title:' />
        <ControlledTextarea name='memo' control={control} label='Memo:' />
        <ControlledCheckbox
          name='is_important'
          control={control}
          label='Mark as important:'
        />
      </Form>
      <Button isLoading={isLoading} />
    </Section>
  )
}

export default CreateTodo
