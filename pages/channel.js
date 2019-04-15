import React from 'react'
import 'isomorphic-fetch'
import Podcast from './podcast'

const Channel = ({ title, audio_clips, series }) => {
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
        h1 {
          font-weight: 600;
          padding: 15px;
          text-align: center;
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

      <h1>{title}</h1>

      <h2>Series</h2>
      <div className="channels">
        {series.map((serie, index) => (
          <a className="channel" key={index}>
            {serie.title}
          </a>
        ))}
      </div>
      <h2>Últimos Podcast</h2>
      <div className="channels">
        {audio_clips.map((audio, index) => (
          <a className="channel" key={index}>
            {audio.title}
            <img src={audio.urls.image} />
          </a>
        ))}
      </div>
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
  const { title } = channel.body.channel

  // Información del audio
  const audios = await reqAudio.json()
  const { audio_clips } = audios.body

  // Información de los child channels (series)
  const childs = await reqChild.json()
  const series = childs.body.channels

  return { title, audio_clips, series }
}
export default Channel
