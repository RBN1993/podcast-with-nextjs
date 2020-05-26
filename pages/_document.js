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
          <meta name='theme-color' content='#ff80cc' />
          <link rel='manifest' href='/static/manifest.json' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
