import React from 'react';
import Head from 'next/head';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://visitindia.com";

const SEOHead = ({
    title = "Visit India - Explore the Soul of Bharat",
    description = "Discover India's rich heritage, ancient temples, majestic forts, and breathtaking natural wonders. Plan your journey through the world's most diverse destination.",
    canonical,
    ogImage = "/og-default.jpg",
    ogType = "website",
    noIndex = false,
}) => {
    const fullTitle = title.includes("Visit India") ? title : `${title} | Visit India`;
    const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;
    const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/mountain.ico" />

            {/* Canonical */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Robots */}
            {noIndex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl || SITE_URL} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:site_name" content="Visit India" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalUrl || SITE_URL} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImageUrl} />

            {/* Additional SEO */}
            <meta name="theme-color" content="#1e293b" />
            <meta name="author" content="Visit India" />
            <meta name="geo.region" content="IN" />
            <meta name="geo.placename" content="India" />
        </Head>
    );
};

export default SEOHead;
