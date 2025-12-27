import React from 'react';
import Head from 'next/head';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://visitindia.com";

// Organization Schema for the entire site
export const OrganizationSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Visit India",
        "url": SITE_URL,
        "logo": `${SITE_URL}/logo.png`,
        "description": "Your ultimate guide to exploring the rich culture, history, and natural beauty of India.",
        "sameAs": [
            "https://www.instagram.com/visitindiahome/"
        ]
    };

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
};

// Tourist Destination Schema for places
export const TouristDestinationSchema = ({ place, state, image }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        "name": place.title,
        "description": place.description,
        "image": image,
        "geo": place.location ? {
            "@type": "GeoCoordinates",
            "latitude": place.location.lat,
            "longitude": place.location.lng
        } : undefined,
        "containedInPlace": {
            "@type": "AdministrativeArea",
            "name": state
        },
        "touristType": ["Cultural Tourism", "Heritage Tourism", "Adventure Tourism"]
    };

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
};

// Breadcrumb Schema
export const BreadcrumbSchema = ({ items }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url ? `${SITE_URL}${item.url}` : undefined
        }))
    };

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
};

// FAQ Schema for travel tips page
export const FAQSchema = ({ faqs }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
};

// WebSite Schema with SearchAction
export const WebsiteSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Visit India",
        "url": SITE_URL,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${SITE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
};
