import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InferType } from 'yup'
import Cookies from 'js-cookie'

import { useLoginMutation } from '@/services/auth'
import { useAppDispatch } from '@/redux/store'
import { showToast } from '@/redux/toast/slice'
import { setToken } from '@/redux/auth/slice'
import { loginSchema } from '@/validators/loginValidator'

import ControlledInput from '@/components/ControlledInput'
import Section from '@/components/Section'
import Form from '@/components/Form'
import Button from '@/components/Button'

type FormInputs = InferType<typeof loginSchema>

const INITIAL_VALUES = {
  username: '',
  password: '',
}

const Login = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [authLogin] = useLoginMutation()
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, control, formState } = useForm<FormInputs>({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<FormInputs> = async (inputs) => {
    setIsLoading(true)
    try {
      const { token } = await authLogin(inputs).unwrap()

      if (token) {
        Cookies.set('token', token)
        dispatch(
          setToken({
            token: token,
            username: inputs.username,
          })
        )
        setIsLoading(false)
        router.push('/')
      }
    } catch (error: any) {
      setIsLoading(false)
      dispatch(
        showToast({
          isShow: true,
          text: 'Unable to log in with provided credentials',
          icon: 'error',
        })
      )
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
