import 'isomorphic-fetch'
import _Podcast from '../components/Podcast'
const Podcast = ({ clip }) => <_Podcast clip={clip} />

Podcast.getInitialProps = async ({ query }) => {
  const id = query.id
  const fetchClip = await fetch(
    `https://api.audioboom.com/audio_clips/${id}.mp3`
  )
  const clip = (await fetchClip.json()).body.audio_clip
  return { clip }
}
export default Podcast
