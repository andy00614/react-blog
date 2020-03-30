import Document, { Html, Head, Main, NextScript } from "next/document";
import { CSSProperties } from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    const bodyStyle: CSSProperties = {
      background: "#cdf",
      paddingTop: "40px",
    };
    return (
      <Html>
        <title>Andy Beat</title>
        <Head>
          <link
            // href="https://fonts.googleapis.com/css?family=Shadows Into Light"
            rel="stylesheet"
          />
        </Head>
        <body style={bodyStyle}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
