import { Control, FieldPath, FieldValues } from 'react-hook-form'

export type ControlledProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  label?: string
}
