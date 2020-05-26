import App, { Container } from 'next/app'
import 'antd/dist/antd.css'
import '../css/styles.css'
import AppLayout from '../components/MyLayout'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }
  //TODO: left here instead MyLayout?
  // async componentDidMount() {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('/service-worker.js')
  //       .then(registration => {
  //         console.log('service worker registration successful')
  //       })
  //       .catch(err => {
  //         console.warn('service worker registration failed')
  //       })
  //   }
  // }
  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Container>
    )
  }
}

export default MyApp
