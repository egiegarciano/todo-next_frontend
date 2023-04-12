import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InferType } from 'yup'
import Cookies from 'js-cookie'

import { useRegisterMutation } from '@/services/auth'
import { useAppDispatch } from '@/redux/store'
import { setToken } from '@/redux/auth/slice'
import { showToast } from '@/redux/toast/slice'
import { signupSchema } from '@/validators/signupValidator'

import ControlledInput from '@/components/ControlledInput'
import Section from '@/components/Section'
import Form from '@/components/Form'
import Button from '@/components/Button'

type FormInputs = InferType<typeof signupSchema>

const INITIAL_VALUES = {
  username: '',
  email: '',
  password: '',
  password2: '',
}

const SignUp = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [authRegister] = useRegisterMutation()
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, control, formState } = useForm<FormInputs>({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true)
    try {
      const { token, username, response } = await authRegister(data).unwrap()

      if (response) {
        Cookies.set('token', token)
        dispatch(
          setToken({
            token,
            username,
          })
        )
        setIsLoading(false)
        router.push('/')
      }
    } catch (error: any) {
      setIsLoading(false)
      if (error) {
        dispatch(
          showToast({
            isShow: true,
            text: error.data.username
              ? error.data.username[0]
              : error.data.error,
            icon: 'success',
          })
        )
      }
    }
  }

  return (
    <Section title='Sign Up'>
      <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <ControlledInput name='username' control={control} label='Username:' />
        <ControlledInput name='email' control={control} label='Email:' />
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
      <Button isLoading={isLoading} />
    </Section>
  )
}

export default SignUp
