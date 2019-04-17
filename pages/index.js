import { Component } from 'react'
import 'isomorphic-fetch'
import Link from 'next/link'

export default class Index extends Component {
  static async getInitialProps() {
    const req = await fetch('https://api.audioboom.com/channels/recommended')
    const { body: channels } = await req.json()
    return { channels }
  }
  render() {
    const { channels } = this.props
    return (
      <div className="channels">
        {channels.map((channel, index) => (
          <Link href={`/channel?id=${channel.id}`} key={index} prefetch>
            <a className="channel" key={index}>
              <img src={channel.urls.logo_image.original} alt={channel.title} />
              <h2>{channel.title}</h2>
            </a>
          </Link>
        ))}
      </div>
    )
  }
}
