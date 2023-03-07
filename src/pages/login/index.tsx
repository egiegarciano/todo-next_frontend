import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useLoginMutation } from '@/services/auth'
import ControlledInput from '@/components/ControlledInput'
import Section from '@/components/Section'
import Form from '@/components/Form'
import Button from '@/components/Button'

type FormInputs = {
  username: string
  password: string
}

const INITIAL_VALUES = {
  username: '',
  password: '',
}

const Login = () => {
  const router = useRouter()
  const [authLogin] = useLoginMutation()
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, control, formState } = useForm<FormInputs>({
    defaultValues: INITIAL_VALUES,
  })

  const onSubmit: SubmitHandler<FormInputs> = async (inputs) => {
    try {
      setIsLoading(true)
      const { token } = await authLogin(inputs).unwrap()
      if (token) {
        await router.push('/')
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <Section title='Login'>
      <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <ControlledInput name='username' control={control} label='Username:' />
        <ControlledInput
          name='password'
          type='password'
          control={control}
          label='Password:'
        />
      </Form>
      <Button isLoading={isLoading} />
    </Section>
  )
}

export default Login
