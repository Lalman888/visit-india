import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap'
          rel='stylesheet'
        />
         <meta name="keywords" content="India travel, Indian tourism, India vacation packages, cultural tours, adventure activities, popular destinations"></meta>
      </Head>
      
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
