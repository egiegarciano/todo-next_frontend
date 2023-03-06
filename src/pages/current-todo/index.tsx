import Link from 'next/link'

import Section from '@/components/Section'
import { currentTodos } from '@/constants/currentTodos'

const CurrentTodo = () => {
  return (
    <Section title='Current Todos'>
      <div className='flex w-full flex-col space-y-5 rounded-md bg-blue-500 px-4 py-8 md:w-[380px] lg:w-[500px]'>
        {currentTodos.map((item) => (
          <Link
            href={`/current-todo/${item.id}`}
            key={item.title}
            className='rounded-md bg-white px-3 py-2 text-base'
          >
            {item.title}
          </Link>
        ))}
      </div>
    </Section>
  )
}

export default CurrentTodo
