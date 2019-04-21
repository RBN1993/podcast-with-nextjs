import 'isomorphic-fetch'
import _Podcast from '../components/Podcast'
import Error from './_error'

const Podcast = ({ clip, statusCode }) => {
  if (statusCode !== 200) return <Error statusCode={statusCode} />
  return <_Podcast clip={clip} />
}

Podcast.getInitialProps = async ({ query, res }) => {
  try {
    const id = query.id
    const fetchClip = await fetch(
      `https://api.audioboom.com/audio_clips/${id}.mp3`
    )
    if (fetchClip.status >= 400) {
      res.statusCode = fetchClip.status
      return { clip: null, title: `oh no :(`, statusCode: fetchClip.status }
    }
    const clip = (await fetchClip.json()).body.audio_clip
    return { clip, title: `${clip.title}`, statusCode: 200 }
  } catch (e) {
    if (res) res.statusCode = 503
    return { clip: null, title: `oh no :(`, statusCode: 503 }
  }
}
export default Podcast
