import NextDocument, { Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta
            name='description'
            content='A Try To Create Progressive Web App built using Next.js'
          />
          <meta name='theme-color' content='#8756ca' />

          <link rel='manifest' href='/static/manifest.json' />

          <link rel='shortcut icon' href='/static/favicon.ico' />

          <link rel='apple-touch-icon' href='/icon.png'></link>
          <meta name='apple-mobile-web-app-title' content='Podcast' />
          <meta name='apple-mobile-web-app-capable' content='no' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='black-translucent'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
