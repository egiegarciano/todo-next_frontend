import Link from 'next/link'

import { useCurrentTodosQuery } from '@/services/todo'
import { useAppSelector } from '@/redux/store'

import Section from '@/components/Section'

const CurrentTodo = () => {
  const token = useAppSelector(({ auth }) => auth.token)

  const { data } = useCurrentTodosQuery(token)
  console.log(data)

  return (
    <Section title='Current Todos'>
      <div className='flex w-full flex-col space-y-5 rounded-md bg-blue-500 px-4 py-8 md:w-[380px] lg:w-[500px]'>
        {data?.results.map((item) => (
          <Link
            href={`/current-todo/${item.id}`}
            key={item.id}
            className='truncate rounded-md bg-white px-3 py-2 text-base'
          >
            {item.name}
          </Link>
        ))}
      </div>
    </Section>
  )
}

export default CurrentTodo
