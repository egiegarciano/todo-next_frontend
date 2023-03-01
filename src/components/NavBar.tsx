import { useEffect, useState } from 'react'
import Link from 'next/link'

import Clipboard from './icons/Clipboard'
import Bars3 from './icons/Bars3'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
        document.body.classList.remove('overflow-hidden')
      }
    }
  }, [])

  const handleOnClick = () => {
    setIsOpen(false)
    document.body.classList.remove('overflow-hidden')
  }

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev)

    if (!isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }

  return (
    <nav className='relative bg-blue-500 px-4 py-2 text-white'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Clipboard />
          <Link
            href='/'
            onClick={handleOnClick}
            className='text-lg font-semibold'
          >
            Todo Wohoo
          </Link>
        </div>
        <div
          className='rounded-md border px-2 py-1 lg:hidden'
          onClick={handleToggleMenu}
        >
          <Bars3 />
        </div>
      </div>
      <div
        className={`absolute top-[52px] right-0 z-20 h-screen w-[270px] flex-col space-y-4 overflow-hidden bg-blue-400 p-6 text-base font-semibold tracking-wider lg:top-0 lg:h-auto lg:w-auto lg:flex-row lg:space-y-0 lg:space-x-4 lg:bg-transparent lg:p-[14px] ${
          isOpen ? 'flex' : 'hidden lg:flex'
        }`}
        onClick={handleOnClick}
      >
        <Link href='#home'>Current</Link>
        <Link href='#home'>Create</Link>
        <Link href='#home'>Completed</Link>
        <Link href='#home'>Sign Up</Link>
        <Link href='#home'>Login</Link>
      </div>
    </nav>
  )
}

export default NavBar
