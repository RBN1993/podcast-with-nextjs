import Link from 'next/link'
import Router from 'next/router'
import { Icon } from 'antd'
export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    const { statusCode } = this.props

    return (
      <>
        {statusCode === 404 ? (
          <div className="message">
            <h1>Page does not exist :(</h1>
            <p>
              <Link href="/">
                <a>
                  <Icon type="home" />
                  <span>Go back home</span>
                </a>
              </Link>
            </p>
          </div>
        ) : (
            <div className="message">
              <h1>There was a problem :(</h1>
              <p>Try again later</p>
              <div onClick={() => Router.back()}>
                <a className="links">
                  <Icon type="left-circle" />
                  <span>Go back</span>
                </a>
              </div>
            </div>
          )}
        <style jsx>{`
          .message {
            padding: 100px 30px;
            text-align: center;
            background: white;
          }
          h1 {
            margin-bottom: 2em;
          }
          a {
            color: #8756ca;
          }
          span { margin-left:5px}
        `}</style>
        <style jsx global>
          {`
            body {
              background: white;
            }
          `}
        </style>
      </>
    )
  }
}
