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
      {series.map((serie, index) => (
        <div key={index}>{serie.title}</div>
      ))}

      <h2>Últimos Podcast</h2>
      {audio_clips.map((audio, index) => (
        <div key={index}>{audio.title}</div>
      ))}
    </>
  )
}

Channel.getInitialProps = async req => {
  // Información del Channel
  const reqInfo = await fetch(
    `https://api.audioboom.com/channels/${req.query.id}`
  )
  // const {
  //   body: { channel }
  // } = await request.json()

  const channel = await reqInfo.json()
  const { title } = channel.body.channel

  // Información del audio
  const reqAudio = await fetch(
    `https://api.audioboom.com/channels/${req.query.id}/audio_clips`
  )
  const audios = await reqAudio.json()
  const { audio_clips } = audios.body

  // Información de los child channels (series)
  const reqChild = await fetch(
    `https://api.audioboom.com/channels/${req.query.id}/child_channels`
  )
  const childs = await reqChild.json()
  const series = childs.body.channels
  //Casi segundo y medio de llamada !!!
  return { title, audio_clips, series }
}
export default Channel
