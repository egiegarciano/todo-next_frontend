import { useEffect, useState } from 'react'

import { useCompletedTodosQuery } from '@/services/todo'
import { useAppSelector } from '@/redux/store'

import Section from '@/components/Section'
import Pagination from '@/components/Pagination'

const CompletedTodo = () => {
  const token = useAppSelector(({ auth }) => auth.token)
  const [page, setPage] = useState(1)
  const { data, isLoading, refetch } = useCompletedTodosQuery({ token, page })

  useEffect(() => {
    refetch()
  }, [refetch])

  const onPageChange = (e: any) => {
    setPage(e.selected + 1)
  }

  return (
    <Section title='Current Todos' className='mb-32 lg:pb-20'>
      {data?.results ? (
        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className='flex w-full flex-col space-y-5 rounded-md bg-blue-500 px-4 py-8 md:w-[380px] lg:w-[500px]'>
              {data?.results.map((item) => (
                <p
                  key={item.id}
                  className='truncate rounded-md bg-white px-3 py-2 text-base'
                >
                  {item.name}
                </p>
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
        <div>No current todo yet</div>
      )}
    </Section>
  )
}

export default CompletedTodo
