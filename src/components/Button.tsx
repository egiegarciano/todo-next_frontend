import Spinner from './icons/Spinner'

const Button = ({ isLoading }: { isLoading?: boolean }) => {
  return (
    <button
      type='submit'
      form='create-todo-form'
      disabled={isLoading}
      className='w-28 rounded-md bg-blue-700 py-2 text-base font-bold tracking-wider text-white disabled:bg-gray-500 lg:text-xl'
    >
      {isLoading ? <Spinner /> : 'Submit'}
    </button>
  )
}

export default Button
