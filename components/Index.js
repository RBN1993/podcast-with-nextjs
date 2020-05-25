import { slug } from '../helpers/slug'
import { Link } from '../routes'

const IndexPage = ({ channels }) => (
  <div className='channels'>
    {channels.map((channel, index) => (
      <Link
        route='channel'
        params={{ slug: slug(channel.title), id: channel.id }}
        key={index}
        // prefetch
      >
        <a className='channel' key={index}>
          <img src='../static/papa-roach.jpg' alt={channel.title} />
          <h2 id='channelH2'>{channel.title}</h2>
        </a>
      </Link>
    ))}
  </div>
)
export default IndexPage
