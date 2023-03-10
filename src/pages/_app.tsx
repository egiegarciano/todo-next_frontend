import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { wrapper, persistor } from '@/redux/store'

import Toast from '@/components/Toast'
import NavBar from '@/components/NavBar'
import '@/styles/globals.css'

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <div className='relative min-h-screen'>
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
        <PersistGate loading={null} persistor={persistor}>
          <NavBar />
          <Component {...props.pageProps} />
          <Toast />
        </PersistGate>
      </Provider>
    </div>
  )
}
