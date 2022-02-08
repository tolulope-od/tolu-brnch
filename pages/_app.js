import { MessagesProvider } from '../context/MessagesContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <MessagesProvider>
      <Component {...pageProps} />
    </MessagesProvider>
  )
}

export default MyApp
