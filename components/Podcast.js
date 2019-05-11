const Podcast = ({ clip }) => (
  <div className="modal">
    <div className="clip">
      <picture>
        <div
          style={{
            backgroundImage: `url(${clip.urls.image ||
              clip.channel.urls.logo_image.original})`
          }}
        />
      </picture>

      <div className="player">
        <h3>{clip.title}</h3>
        <h6>{clip.channel.title}</h6>
        <audio controls autoPlay={true}>
          <source src={clip.urls.high_mp3} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  </div>
)

export default Podcast
