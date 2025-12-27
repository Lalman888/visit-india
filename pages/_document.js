import { Html, Head, Main, NextScript } from 'next/document';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect for performance */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link rel='preconnect' href='https://www.googletagmanager.com' />

        {/* Fonts - Inter and Playfair Display */}
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />

        {/* SEO Meta Tags */}
        <meta name="keywords" content="India travel, Indian tourism, places to visit in India, India vacation, cultural tours, temples in India, forts in India, hill stations, beaches in India, golden triangle, travel guide" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />

        {/* Favicon */}
        <link rel="icon" href="/mountain.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
