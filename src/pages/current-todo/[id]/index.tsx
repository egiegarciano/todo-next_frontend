import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'

import ControlledInput from '@/components/ControlledInput'
import ControlledTextarea from '@/components/ControlledTextarea'
import ControlledCheckbox from '@/components/ControlledCheckbox'
import Section from '@/components/Section'
import Form from '@/components/Form'
import Button from '@/components/Button'
import ArrowLeft from '@/components/icons/ArrowLeft'

type FormInputs = {
  title: string
  memo: string
  is_important: boolean
}

const INITIAL_VALUES = {
  title: '',
  memo: '',
  is_important: false,
}

const TodoDetail = () => {
  const { handleSubmit, control, formState } = useForm<FormInputs>({
    defaultValues: INITIAL_VALUES,
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data)
  }

  return (
    <Section title='Todo Details'>
      <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <Link href='/current-todo' className='absolute top-4'>
          <ArrowLeft />
        </Link>
        <ControlledInput name='title' control={control} label='Title:' />
        <ControlledTextarea name='memo' control={control} label='Memo:' />
        <ControlledCheckbox
          name='is_important'
          control={control}
          label='Mark as important:'
        />
      </Form>
      <Button />
    </Section>
  )
}

export default TodoDetail
