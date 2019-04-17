import React from 'react'
import 'isomorphic-fetch'
import _Channel from '../components/Channel'

const Channel = props => <_Channel {...props} />

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
