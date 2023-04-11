import { object, string, boolean } from 'yup'

export const createTodoSchema = object({
  name: string().required('Username is required').trim(),
  memo: string().trim(),
  is_important: boolean(),
}).required()

export const updateTodoSchema = createTodoSchema
