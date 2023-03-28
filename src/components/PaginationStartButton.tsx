import { ButtonHTMLAttributes } from 'react'

import ChevronDoubleLeft from './icons/ChevronDoubleLeft'

type Props = {
  currentPage: number
  totalPages: number
  onChangePage: (e: any) => void
} & ButtonHTMLAttributes<HTMLButtonElement>

const PaginationStartButton = (props: Props) => {
  const { currentPage, totalPages, onChangePage, ...rest } = props

  const handleClick = () => {
    if (currentPage === 1) return
    onChangePage({ selected: 0 })
  }

  return (
    <button
      aria-label='start page'
      onClick={handleClick}
      className='text-blue-700 disabled:cursor-not-allowed disabled:text-gray-600'
      disabled={currentPage === 1}
      {...rest}
    >
      <ChevronDoubleLeft />
    </button>
  )
}

export default PaginationStartButton
