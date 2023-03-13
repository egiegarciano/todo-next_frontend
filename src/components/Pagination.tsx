import React from 'react'
import ReactPaginate from 'react-paginate'

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
    <ReactPaginate
      containerClassName='flex justify-between items-center bg-white p-1 text-blue-700 font-bold rounded-full !mt-10'
      pageClassName='p-1'
      onPageChange={onPageChange}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={1}
      forcePage={currentPage - 1}
      previousLabel={
        <button
          className={`flex disabled:text-gray-600 ${
            currentPage === 1 && 'cursor-not-allowed'
          }`}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </button>
      }
      previousClassName='p-1'
      nextLabel={
        <button
          className={`flex disabled:text-gray-600 ${
            currentPage === totalPages && 'cursor-not-allowed'
          }`}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </button>
      }
      nextClassName='p-1'
      breakLabel='...'
      activeLinkClassName='text-black'
    />
  )
}

export default Pagination
