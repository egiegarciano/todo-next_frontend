import { useEffect, useState } from 'react'

import {
  useCompletedTodosQuery,
  useDeleteCompletedTodosMutation,
} from '@/services/todo'

import Section from '@/components/Section'
import Pagination from '@/components/Pagination'
import Spinner from '@/components/icons/Spinner'
import Button from '@/components/Button'

const CompletedTodo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const {
    data,
    isLoading: completedTodosIsLoading,
    refetch,
  } = useCompletedTodosQuery(page)
  const [deleteCompletedTodos] = useDeleteCompletedTodosMutation()

  useEffect(() => {
    refetch()
  }, [refetch])

  const onPageChange = (e: any) => {
    setPage(e.selected + 1)
  }

  const handleOnDeleteTodo = async () => {
    setIsLoading(true)
    try {
      await deleteCompletedTodos().unwrap()
      refetch()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(true)
      console.log(error)
    }
  }

  return (
    <Section title='Completed Todos' className='mb-32 lg:pb-20'>
      {completedTodosIsLoading ? (
        <Spinner />
      ) : (
        <>
          {data?.results.length ? (
            <div className='flex w-full flex-col space-y-5 rounded-md bg-blue-500 px-4 py-8 md:w-[380px] lg:w-[500px]'>
              <Button
                title='Delete All'
                className='w-[100px] self-end bg-red-700 md:w-28 lg:text-base'
                type='button'
                isLoading={isLoading}
                onClick={handleOnDeleteTodo}
              />
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
          ) : (
            <p>You haven&apos;t completed any todos yet</p>
          )}
        </>
      )}
    </Section>
  )
}

export default CompletedTodo
