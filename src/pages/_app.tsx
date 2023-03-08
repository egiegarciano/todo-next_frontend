import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'

import { wrapper } from '@/redux/store'
import Toast from '@/components/Toast'
import NavBar from '@/components/NavBar'
import '@/styles/globals.css'

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <div className='min-h-screen'>
      <Head>
        <title>Todo Wohoo</title>
        <meta
          name='description'
          content='Todo Wohoo to help you make sense of all of your opportunities and live that life that matters most to you.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Provider store={store}>
        <NavBar />
        <Component {...props.pageProps} />
        <Toast />
      </Provider>
    </div>
  )
}
