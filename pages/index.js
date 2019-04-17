import { Component } from 'react'
import 'isomorphic-fetch'
import IndexPage from '../components/Index'

export default class Index extends Component {
  static async getInitialProps() {
    const req = await fetch('https://api.audioboom.com/channels/recommended')
    const { body: channels } = await req.json()
    return { channels }
  }
  render() {
    const { channels } = this.props
    return <IndexPage channels={channels} />
  }
}
