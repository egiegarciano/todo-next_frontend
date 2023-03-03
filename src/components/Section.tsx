import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
}

const Section = ({ children, title }: Props) => {
  return (
    <section className='mx-5 mt-16 flex flex-col items-center space-y-8 lg:mt-32'>
      <h3 className='text-2xl font-bold lg:text-4xl'>{title}</h3>
      {children}
    </section>
  )
}

export default Section
