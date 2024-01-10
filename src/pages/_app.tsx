import '@LyricSync/styles/globals.css'
import { trpc } from '@LyricSync/utils/trpc'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

function App({ Component, pageProps }: AppProps) {
  return <>
    <Toaster
      position='top-right'
      reverseOrder={false}
    />
    <Component {...pageProps} />
  </>
}

export default trpc.withTRPC(App)