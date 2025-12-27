import { createClient } from "next-sanity";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://visitindia.com";

function generateSiteMap(states, places) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Static Pages -->
     <url>
       <loc>${SITE_URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${SITE_URL}/explore</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${SITE_URL}/about</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>${SITE_URL}/travel-tips</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>${SITE_URL}/best-time-to-visit</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>${SITE_URL}/contact</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
     </url>
     
     <!-- Dynamic State Pages -->
     ${states
            .map((state) => {
                return `
       <url>
         <loc>${SITE_URL}/explore/${state.slug?.current}</loc>
         <lastmod>${new Date().toISOString()}</lastmod>
         <changefreq>weekly</changefreq>
         <priority>0.8</priority>
       </url>
     `;
            })
            .join("")}
     
     <!-- Dynamic Place Pages -->
     ${places
            .map((place) => {
                return `
       <url>
         <loc>${SITE_URL}/explore/${place.stateSlug}/${place.slug?.current}</loc>
         <lastmod>${new Date().toISOString()}</lastmod>
         <changefreq>weekly</changefreq>
         <priority>0.7</priority>
       </url>
     `;
            })
            .join("")}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will handle the response
}

export async function getServerSideProps({ res }) {
    const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: "2021-03-25",
        useCdn: false,
    });

    // Fetch all states
    const states = await client.fetch(`*[_type == "states"]{ slug }`);

    // Fetch all places with their state reference
    const places = await client.fetch(`
    *[_type == "place"]{
      slug,
      "stateSlug": *[_type == "states" && references(^._id)][0].slug.current
    }
  `);

    const sitemap = generateSiteMap(states, places);

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;
