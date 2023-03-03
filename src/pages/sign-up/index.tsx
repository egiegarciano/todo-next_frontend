import { useForm, SubmitHandler } from 'react-hook-form'

import ControlledInput from '@/components/ControlledInput'
import Section from '@/components/Section'
import Form from '@/components/Form'
import Button from '@/components/Button'

type FormInputs = {
  username: string
  password: string
  password2: string
}

const INITIAL_VALUES = {
  username: '',
  password: '',
  password2: '',
}

const SignUp = () => {
  const { handleSubmit, control, formState } = useForm<FormInputs>({
    defaultValues: INITIAL_VALUES,
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data)
  }

  return (
    <Section title='Sign Up'>
      <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <ControlledInput name='username' control={control} label='Username:' />
        <ControlledInput
          name='password'
          type='password'
          control={control}
          label='Password:'
        />
        <ControlledInput
          name='password2'
          type='password'
          control={control}
          label='Confirm Password:'
        />
      </Form>
      <Button />
    </Section>
  )
}

export default SignUp
