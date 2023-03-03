import Link from 'next/link'

export default function Home() {
  return (
    <main className='mt-10 flex flex-col items-center md:mt-32'>
      <h1 className='mb-4 text-3xl font-semibold text-blue-700 lg:mb-8 lg:text-5xl'>
        Simply Your Todos. Woohoo!
      </h1>
      <p className='mb-5 px-4 text-justify text-lg md:w-[600px] lg:mb-8 lg:w-[700px] lg:text-xl'>
        Life is fun. But life is also busy. There&#39;s a million different
        things you could be doing. But what matters is what you do. We created
        Todo Woo to help you make sense of all of your opportunities and live
        that life that matters most to you. Your new organized life awaits.
      </p>
      <Link
        href='/create-todo'
        className='mt-4 rounded bg-blue-600 px-4 py-2 text-lg font-semibold text-white lg:mt-8 lg:text-xl'
      >
        Create Todo
      </Link>
    </main>
  )
}
