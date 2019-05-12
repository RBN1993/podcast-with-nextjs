import { slug } from '../helpers/slug'
import { Link } from '../routes'
import { useState, useCallback } from 'react'
import Podcast from './ModalPodcast'
import { Tabs, Icon, Divider } from 'antd'
import { white } from 'ansi-colors'

const TabPane = Tabs.TabPane

const Channel = ({ title, urls, audio_clips, series, channelId }) => {
  const [podcast, setPodcast] = useState()

  const handleOpenPodcast = useCallback((e, podcast) => {
    // Prevent show page podcast but if we want use href delete this line and
    // {podcast && <Podcast clip={podcast} onClose={handleClosePodcast} />}
    // then ww can us <Link></Link>

    e.preventDefault()
    setPodcast(podcast)
  }, [])

  const handleClosePodcast = useCallback(e => {
    e.preventDefault()
    setPodcast(null)
  }, [])

  return (
    <>
      {podcast && <Podcast clip={podcast} onClose={handleClosePodcast} />}
      <div
        className="banner"
        style={{
          backgroundImage: `url(${urls.banner_image.original})`
        }}
      />
      <Divider />
      <h1 id="channelH1">{title}</h1>
      {/* Si hay series imprimo */}
      <Tabs
        defaultActiveKey="1"
        tabBarStyle={{ color: 'white', textAlign: 'center', height: 'auto' }}
      >
        {audio_clips.length && (
          <TabPane
            tab={
              <span>
                <Icon type="customer-service" />
                Last podcast
              </span>
            }
            key="1"
          >
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
                  href={`/${slug(title)}.${channelId}/${slug(audio.title)}.${
                    audio.id
                  }`}
                  className="channel"
                  key={index}
                  onClick={e => handleOpenPodcast(e, audio)}
                >
                  <img src={audio.urls.image || audio.urls.wave_img} />
                  <h2 id="channelH2">{audio.title}</h2>
                  <div className="meta">
                    <div style={{ position: 'absolute', top: '34%' }}>
                      <Icon type="play-circle" theme="filled" />
                    </div>
                    <div>
                      <span>{Math.ceil(audio.duration / 60)}:00 min</span>
                    </div>
                  </div>
                </a>
                //  </Link>
              ))}
            </div>
          </TabPane>
        )}

        {Boolean(series.length) && (
          <TabPane
            tab={
              <span>
                <Icon type="fire" />
                Series
              </span>
            }
            key="2"
          >
            <div className="channels">
              {series.map((serie, index) => (
                <Link
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
          </TabPane>
        )}
      </Tabs>
    </>
  )
}

export default Channel
