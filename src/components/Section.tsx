import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
  className?: string
}

const Section = ({ children, title, className }: Props) => {
  return (
    <section
      className={`mx-5 mt-16 flex flex-col items-center space-y-8 lg:mt-32 ${className}`}
    >
      <h3 className='text-2xl font-bold tracking-wide lg:text-4xl'>{title}</h3>
      {children}
    </section>
  )
}

export default Section
