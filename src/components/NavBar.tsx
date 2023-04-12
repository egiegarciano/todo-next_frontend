import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useLogoutMutation } from '@/services/auth'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setToken } from '@/redux/auth/slice'
import Cookies from 'js-cookie'

import { verifiedLinks } from '@/constants/linksData'
import { unverifiedLinks } from '@/constants/linksData'
import Clipboard from './icons/Clipboard'
import Bars3 from './icons/Bars3'
import XMark from './icons/XMark'

const NavBar = () => {
  const router = useRouter()
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
      const { message } = await authLogout().unwrap()

      if (message) {
        Cookies.remove('token')
        dispatch(setToken({ token: '', username: '' }))
        setIsOpen(false)
        document.body.classList.remove('overflow-hidden')
        router.push('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className='relative bg-blue-500 px-4 py-2 text-white lg:px-24 xl:px-72'>
      <div className='flex items-center justify-between'>
        <Link
          href='/'
          onClick={handleOnCloseMenu}
          className='relative z-50 flex items-center space-x-2 text-lg font-semibold'
        >
          <Clipboard />
          <p>Todo Wohoo</p>
        </Link>
        <div
          className='cursor-pointer rounded-md border px-2 py-1 lg:hidden'
          onClick={handleToggleMenu}
        >
          {isOpen ? <XMark /> : <Bars3 />}
        </div>
      </div>
      <div
        className={`absolute inset-0 top-[52px] z-20 flex h-screen w-full justify-end overflow-hidden bg-[#3b3b3b5b] lg:top-0 lg:h-auto lg:bg-transparent ${
          isOpen ? 'flex' : 'hidden lg:flex'
        }`}
      >
        <div className='flex w-[270px] flex-col space-y-4 bg-blue-400 p-6 text-base font-semibold tracking-wider lg:w-auto lg:flex-row lg:space-y-0 lg:space-x-8 lg:bg-transparent lg:py-[14px] lg:px-24 xl:px-72'>
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
      </div>
    </nav>
  )
}

export default NavBar
