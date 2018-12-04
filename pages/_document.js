import Document, { Head, Main, NextScript } from 'next/document'
import config from '../config';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href={`${config.baseUrl}/_next/static/style.css`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
