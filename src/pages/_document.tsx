import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'
import { resetServerContext } from 'react-beautiful-dnd'

export default class MyDocument extends Document<{}> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialprops = await Document.getInitialProps(ctx)
    resetServerContext()
    return { ...initialprops }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}