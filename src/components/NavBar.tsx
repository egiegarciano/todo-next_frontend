import { useState } from 'react'

import Clipboard from './icons/Clipboard'
import Bars3 from './icons/Bars3'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='relative bg-blue-500 px-4 py-2 text-white'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Clipboard />
          <p className='text-lg font-semibold'>Todo Wohoo</p>
        </div>
        <div
          className='rounded-md border px-2 py-1'
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Bars3 />
        </div>
      </div>
      <div
        className={`absolute top-[52px] left-0 z-20 h-screen w-full flex-col overflow-hidden bg-white text-black ${
          isOpen ? 'flex' : 'hidden'
        }`}
      >
        <div>Current</div>
        <div>Create</div>
        <div>Completed</div>
        <div>Sign Up</div>
        <div>Login</div>
      </div>
    </nav>
  )
}

export default NavBar
