import { useEffect, useState } from 'react'
import Link from 'next/link'

import { useLogoutMutation } from '@/services/auth'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setToken } from '@/redux/auth/slice'

import Clipboard from './icons/Clipboard'
import Bars3 from './icons/Bars3'
import { verifiedLinks } from '@/constants/linksData'
import { unverifiedLinks } from '@/constants/linksData'

const NavBar = () => {
  const dispatch = useAppDispatch()
  const [authLogout] = useLogoutMutation()
  const [isOpen, setIsOpen] = useState(false)

  const { token } = useAppSelector((state) => state.auth)

  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
        document.body.classList.remove('overflow-hidden')
      }
    }
  }, [])

  const handleOnCloseMenu = () => {
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

  const handleOnLogout = async () => {
    try {
      const { message } = await authLogout(token).unwrap()
      if (message) {
        dispatch(setToken({ token: '', username: '' }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className='relative bg-blue-500 px-4 py-2 text-white lg:px-24 xl:px-72'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Clipboard />
          <Link
            href='/'
            onClick={handleOnCloseMenu}
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
        className={`absolute top-[52px] right-0 z-20 h-screen w-[270px] flex-col space-y-4 overflow-hidden bg-blue-400 p-6 text-base font-semibold tracking-wider lg:top-0 lg:h-auto lg:w-auto lg:flex-row lg:space-y-0 lg:space-x-4 lg:bg-transparent lg:py-[14px] lg:px-24 xl:px-72 ${
          isOpen ? 'flex' : 'hidden lg:flex'
        }`}
      >
        {token ? (
          <>
            {verifiedLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleOnCloseMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className='cursor-pointer' onClick={handleOnLogout}>
              Logout
            </div>
          </>
        ) : (
          <>
            {unverifiedLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleOnCloseMenu}
              >
                {item.name}
              </Link>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
