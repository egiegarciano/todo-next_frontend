import React from 'react'
import ReactPaginate from 'react-paginate'

import PaginationStartButton from './PaginationStartButton'
import PaginationEndButton from './PaginationEndButton'
import ChevronLeft from './icons/ChevronLeft'
import ChevronRight from './icons/ChevronRight'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (e: any) => void
}

const Pagination = (props: Props) => {
  const { currentPage, onPageChange, totalPages } = props

  return (
    <div className='flex items-center justify-center rounded-full bg-white px-2 md:px-4'>
      <PaginationStartButton
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={onPageChange}
      />
      <ReactPaginate
        containerClassName='flex w-full justify-between items-center p-1 text-blue-700 font-bold'
        pageClassName='p-1'
        onPageChange={onPageChange}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        forcePage={currentPage - 1}
        previousLabel={
          <button
            className='flex disabled:cursor-not-allowed disabled:text-gray-600'
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>
        }
        previousClassName='py-1'
        nextLabel={
          <button
            className='flex disabled:cursor-not-allowed disabled:text-gray-600'
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        }
        nextClassName='py-1'
        breakLabel='...'
        activeLinkClassName='text-black'
      />
      <PaginationEndButton
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={onPageChange}
      />
    </div>
  )
}

export default Pagination
