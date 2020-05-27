import { Modal, Card, Icon } from 'antd'

const Podcast = ({ clip, onClose }) => (
  <Modal
    visible={Boolean(clip)}
    onCancel={onClose}
    footer={null}
    centered={true}
    bodyStyle={{ background: ' #8756ca', padding: '0' }}
    closeIcon={
      <Icon type='close-circle' theme='twoTone' twoToneColor='#654198' spin />
    }
    destroyOnClose
  >
    <Card
      className='clip'
      cover={
        <img src={clip.urls.image || clip.channel.urls.logo_image.original} />
      }
    >
      <div className='player'>
        <h3>{clip.title}</h3>
        <h6>{clip.channel.title}</h6>
        <audio controls autoPlay={true}>
          <source src={clip.urls.high_mp3} type='audio/mpeg' />
        </audio>
      </div>
    </Card>
  </Modal>
)

export default Podcast
