import { useForm, SubmitHandler } from 'react-hook-form'

import ControlledInput from '@/components/ControlledInput'
import ControlledTextarea from '@/components/ControlledTextarea'
import ControlledCheckbox from '@/components/ControlledCheckbox'

type FormInputs = {
  title: string
  memo: string
  is_important: boolean
}

const CreateTodo = () => {
  const { handleSubmit, control, formState } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data)
  }

  return (
    <section className='mx-5 mt-16 space-y-8 text-center'>
      <form
        id='create-todo-form'
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col space-y-6 rounded-md bg-blue-500 p-4 text-left '
      >
        <ControlledInput name='title' control={control} />
        <ControlledTextarea name='memo' control={control} />
        <ControlledCheckbox name='is_important' control={control} />
      </form>
      <button
        type='submit'
        form='create-todo-form'
        className='rounded-md bg-blue-700 px-5 py-2 text-base font-bold tracking-wider text-white'
      >
        Submit
      </button>
    </section>
  )
}

export default CreateTodo
