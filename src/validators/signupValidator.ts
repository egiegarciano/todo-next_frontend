import { object, string, ref } from 'yup'

import { passwordRules } from './regex'

export const signupSchema = object({
  username: string().required('Username is required').trim(),
  email: string().email().required('Email is required'),
  password: string()
    .matches(passwordRules, {
      message:
        'At least 8 digits including at least one number, one uppercase letter and one lowercase letter',
    })
    .required('Password is required')
    .trim(),
  password2: string()
    .oneOf([ref('password')], 'Password must match')
    .required('Password is required')
    .strict(),
}).required()
