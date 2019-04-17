import React from 'react'
import 'isomorphic-fetch'
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
      <h1>{title}</h1>
      {/* Si hay series imprimo */}
      {Boolean(series.length) && (
        <>
          <h2>Series</h2>
          <div className="channels">
            {series.map((serie, index) => (
              <Link href={`/channel?id=${serie.id}`} prefetch key={index}>
                <a className="channel" key={index}>
                  <img src={serie.urls.logo_image.original} />
                  <h2>{serie.title}</h2>
                </a>
              </Link>
            ))}
          </div>
        </>
      )}

      {audio_clips.length && (
        <>
          <h2>Últimos Podcasts</h2>
          <div className="channels">
            {audio_clips.map((audio, index) => (
              <Link href={`/podcast?id=${audio.id}`} prefetch key={index}>
                <a className="channel" key={index}>
                  <img src={audio.urls.image} />
                  <h2>{audio.title}</h2>
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

Channel.getInitialProps = async req => {
  const channelId = req.query.id
  //Para evitar el segundo y medio anterior se pueden paralelizar las request
  const [reqInfo, reqAudio, reqChild] = await Promise.all([
    fetch(`https://api.audioboom.com/channels/${channelId}`),
    fetch(`https://api.audioboom.com/channels/${channelId}/audio_clips`),
    fetch(`https://api.audioboom.com/channels/${channelId}/child_channels`)
  ])

  // Los await siguientes se podrían poner en un Promise.all pero la diferencia de tiempo sería pequeña

  // Información del Channel
  const channel = await reqInfo.json()
  const { title, urls } = channel.body.channel

  // Información del audio
  const audios = await reqAudio.json()
  const { audio_clips } = audios.body

  // Información de los child channels (series)
  const childs = await reqChild.json()
  const series = childs.body.channels
  return { title, audio_clips, series, urls }
}
export default Channel
