import { useEffect, useState } from 'react'
import Link from 'next/link'

import { useCurrentTodosQuery } from '@/services/todo'
import { useAppSelector } from '@/redux/store'

import Section from '@/components/Section'
import Pagination from '@/components/Pagination'

const CurrentTodo = () => {
  const token = useAppSelector(({ auth }) => auth.token)
  const [page, setPage] = useState(1)
  const { data, isLoading, refetch } = useCurrentTodosQuery({ token, page })

  useEffect(() => {
    refetch()
  }, [refetch])

  const onPageChange = (e: any) => {
    setPage(e.selected + 1)
  }

  return (
    <Section title='Current Todos' className='mb-32 lg:pb-20'>
      {data?.results.length ? (
        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
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
              <Pagination
                currentPage={page}
                totalPages={data?.total_pages!}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <p>No current todo yet</p>
          <Link href='create-todo/' className='text-blue-700'>
            Create todo here
          </Link>
        </>
      )}
    </Section>
  )
}

export default CurrentTodo
