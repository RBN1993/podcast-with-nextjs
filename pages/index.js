import { Component } from 'react'
import 'isomorphic-fetch'
import Error from 'next/error'
import IndexPage from '../components/Index'

export default class Index extends Component {
  static async getInitialProps(res) {
    try {
      const req = await fetch('https://api.audioboom.com/channels/recommended')
      const { body: channels } = await req.json()

      return { channels, title: 'Podcast', statusCode: 200 }
    } catch (error) {
      // Errores de API y de red: 503
      res.statusCode = 503
      return { channels: null, statusCode: 503 }
    }
  }
  render() {
    const { channels, statusCode } = this.props
    if (statusCode !== 200) return <Error statusCode={statusCode} />
    return <IndexPage channels={channels} />
  }
}
