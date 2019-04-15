import { Component } from 'react'
import 'isomorphic-fetch'
import Link from 'next/link'
export default class Podcast extends Component {
  static async getInitialProps() {
    const req = await fetch('https://api.audioboom.com/channels/recommended')
    const { body: channels } = await req.json()
    return { channels }
  }
  render() {
    const { channels } = this.props
    return (
      <>
        <style jsx>{`
          header {
            color: #fff;
            background: #8765ca;
            padding: 15px;
            text-align: center;
          }
          .channels {
            display: grid;
            grid-gap: 15px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
          a.channel {
            display: block;
            margin-bottom: 0.5em;
            color: #333;
            text-decoration: none;
          }
          .channel img {
            border-radius: 3px;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
            width: 100%;
          }
          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
        `}</style>

        <header>Podcast</header>
        <div className="channels">
          {channels.map((channel, index) => (
            <Link href={`/channel?id=${channel.id}`} key={index} prefetch>
              <a className="channel" key={index}>
                <img
                  src={channel.urls.logo_image.original}
                  alt={channel.title}
                />
                <h2>{channel.title}</h2>
              </a>
            </Link>
          ))}
        </div>
      </>
    )
  }
}
