import { useEffect, useState } from 'react'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { useCurrentTodosQuery } from '@/services/todo'

import Section from '@/components/Section'
import Pagination from '@/components/Pagination'
import Spinner from '@/components/icons/Spinner'

const CurrentTodo = () => {
  const router = useRouter()
  const [page, setPage] = useState(Number(router.query.page) || 1)
  const { data, isLoading, refetch } = useCurrentTodosQuery(page)

  useEffect(() => {
    refetch()
  }, [refetch])

  const onPageChange = (e: any) => {
    setPage(e.selected + 1)

    router.push({
      pathname: '/current-todo',
      query: { page: e.selected + 1 },
    })
  }

  return (
    <Section title='Current Todos' className='mb-32 lg:pb-20'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {data?.results.length ? (
            <div className='flex w-full flex-col space-y-5 rounded-md bg-blue-500 px-4 py-8 md:w-[380px] lg:w-[500px]'>
              {data?.results.map((item) => (
                <Link
                  href={{
                    pathname: `/current-todo/${item.id}`,
                    query: { page },
                  }}
                  key={item.id}
                  className={`truncate rounded-md px-3 py-2 text-base ${
                    item.is_important ? 'bg-red-200' : 'bg-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Pagination
                currentPage={data.page}
                totalPages={data?.total_pages!}
                onPageChange={onPageChange}
              />
            </div>
          ) : (
            <>
              <p>You don&apos;t have any todos</p>
              <Link href='create-todo/' className='text-blue-700'>
                Create a todo here
              </Link>
            </>
          )}
        </>
      )}
    </Section>
  )
}

export default CurrentTodo

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryPage = Number(query.page)

  if (!queryPage) {
    return {
      redirect: {
        destination: '/current-todo?page=1',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
