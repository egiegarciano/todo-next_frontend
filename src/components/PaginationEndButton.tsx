import { ButtonHTMLAttributes } from 'react'

import ChevronDoubleRight from './icons/ChevronDoubleRight'

type Props = {
  currentPage: number
  totalPages: number
  onChangePage: (e: any) => void
} & ButtonHTMLAttributes<HTMLButtonElement>

const PaginationEndButton = (props: Props) => {
  const { currentPage, totalPages, onChangePage, ...rest } = props

  const handleClick = () => {
    if (currentPage === totalPages) return
    onChangePage({ selected: totalPages - 1 })
  }

  return (
    <button
      aria-label='end page'
      onClick={handleClick}
      className='text-blue-700 disabled:cursor-not-allowed disabled:text-gray-600'
      disabled={currentPage === totalPages}
      {...rest}
    >
      <ChevronDoubleRight />
    </button>
  )
}

export default PaginationEndButton
