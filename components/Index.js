import React from 'react'
import Link from 'next/link'

const IndexPage = ({ channels }) => (
  <div className="channels">
    {channels.map((channel, index) => (
      <Link href={`/channel?id=${channel.id}`} key={index} prefetch>
        <a className="channel" key={index}>
          <img src={channel.urls.logo_image.original} alt={channel.title} />
          <h2 id="channelH2">{channel.title}</h2>
        </a>
      </Link>
    ))}
  </div>
)
export default IndexPage
