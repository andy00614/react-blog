import Document, { Html, Head, Main, NextScript } from "next/document";
import { CSSProperties } from "react";

class MyDocument extends Document {
  render() {
    const bodyStyle: CSSProperties = {
      background: "#cdf",
      paddingTop: "40px",
    };
    return (
      <Html>
        <Head>
          <title>Andy Beat</title>
          <link
            href="https://fonts.googleapis.com/css?family=Shadows Into Light"
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
