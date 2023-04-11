import { object, string } from 'yup'

export const loginSchema = object({
  username: string().required('Username is required').trim(),
  password: string().required('Password is required').trim(),
}).required()
