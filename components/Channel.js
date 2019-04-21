import React from 'react'
import Link from 'next/link'

const Channel = ({ title, urls, audio_clips, series }) => {
  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${urls.banner_image.original})`
        }}
      />
      <h1 id="channelH1">{title}</h1>
      {/* Si hay series imprimo */}
      {Boolean(series.length) && (
        <>
          <h2 id="channelH2">Series</h2>
          <div className="channels">
            {series.map((serie, index) => (
              <Link href={`/channel?id=${serie.id}`} prefetch key={index}>
                <a className="channel" key={index}>
                  <img src={serie.urls.logo_image.original} />
                  <h2 id="channelH2">{serie.title}</h2>
                </a>
              </Link>
            ))}
          </div>
        </>
      )}

      {audio_clips.length && (
        <>
          <h2 id="channelH2">Últimos Podcasts</h2>
          <div className="channels">
            {audio_clips.map((audio, index) => (
              <Link href={`/podcast?id=${audio.id}`} prefetch key={index}>
                <a className="channel" key={index}>
                  <img src={audio.urls.image} />
                  <h2 id="channelH2">{audio.title}</h2>
                  <div className="meta">
                    {Math.ceil(audio.duration / 60)}:00 min
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Channel
