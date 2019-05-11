import { slug } from '../helpers/slug'
import { Link } from '../routes'
import { useState, useCallback } from 'react'

const Channel = ({ title, urls, audio_clips, series, channelId }) => {
  const [podcast, setPodcast] = useState()
  const handleOpenPodcast = useCallback((e, podcast) => {
    e.preventDefault()
    setPodcast({ podcast })
    console.log({ podcast })
  }, [])

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${urls.banner_image.original})`
        }}
      />
      {podcast && <div>holaa podcast</div>}
      <h1 id="channelH1">{title}</h1>
      {/* Si hay series imprimo */}
      {Boolean(series.length) && (
        <>
          <h2 id="channelH2">Series</h2>
          <div className="channels">
            {series.map((serie, index) => (
              <Link
                onClick
                route="channel"
                params={{ slug: slug(serie.title), id: serie.id }}
                prefetch
                key={index}
              >
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
              // <Link
              //   route="podcast"
              //   params={{
              //     slugChannel: slug(title),
              //     idChannel: channelId,
              //     slug: slug(audio.title),
              //     id: audio.id
              //   }}
              //   prefetch
              //   key={index}
              // >
              <a
                href={`/${title}.${channelId}/${slug(audio.title)}.${audio.id}`}
                className="channel"
                key={index}
                onClick={e => handleOpenPodcast(e, audio)}
              >
                <img src={audio.urls.image} />
                <h2 id="channelH2">{audio.title}</h2>
                <div className="meta">
                  {Math.ceil(audio.duration / 60)}:00 min
                </div>
              </a>
              //  </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Channel
