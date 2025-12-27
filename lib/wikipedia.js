/**
 * Wikipedia API utility for fetching content about Indian destinations
 * Uses the MediaWiki API to get summaries, extracts, and images
 */

const WIKI_API_BASE = "https://en.wikipedia.org/api/rest_v1";

/**
 * Fetch a summary of a Wikipedia article
 * @param {string} title - The Wikipedia article title (e.g., "Taj Mahal")
 * @returns {Promise<{title: string, extract: string, thumbnail: string|null, url: string}>}
 */
export async function getWikipediaSummary(title) {
    try {
        const encodedTitle = encodeURIComponent(title.replace(/ /g, "_"));
        const response = await fetch(`${WIKI_API_BASE}/page/summary/${encodedTitle}`);

        if (!response.ok) {
            console.warn(`Wikipedia article not found: ${title}`);
            return null;
        }

        const data = await response.json();

        return {
            title: data.title,
            extract: data.extract,
            description: data.description,
            thumbnail: data.thumbnail?.source || null,
            originalImage: data.originalimage?.source || null,
            url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodedTitle}`,
        };
    } catch (error) {
        console.error(`Error fetching Wikipedia data for ${title}:`, error);
        return null;
    }
}

/**
 * Fetch multiple Wikipedia summaries in parallel
 * @param {string[]} titles - Array of Wikipedia article titles
 * @returns {Promise<Object>} - Object with titles as keys and summary data as values
 */
export async function getMultipleWikipediaSummaries(titles) {
    const results = await Promise.all(
        titles.map(async (title) => {
            const summary = await getWikipediaSummary(title);
            return { title, summary };
        })
    );

    return results.reduce((acc, { title, summary }) => {
        if (summary) {
            acc[title] = summary;
        }
        return acc;
    }, {});
}

/**
 * Generate "Did You Know" facts from Wikipedia extract
 * @param {string} extract - Wikipedia extract text
 * @returns {string[]} - Array of fact sentences
 */
export function extractFacts(extract) {
    if (!extract) return [];

    // Split into sentences and filter for interesting facts
    const sentences = extract
        .split(/(?<=[.!?])\s+/)
        .filter(s => s.length > 30 && s.length < 200)
        .filter(s =>
            s.includes("built") ||
            s.includes("founded") ||
            s.includes("oldest") ||
            s.includes("largest") ||
            s.includes("UNESCO") ||
            s.includes("century") ||
            s.includes("million") ||
            s.includes("famous") ||
            s.includes("known for")
        )
        .slice(0, 3);

    return sentences;
}

/**
 * Get a short description suitable for meta tags
 * @param {string} extract - Wikipedia extract
 * @param {number} maxLength - Maximum length (default 160 for meta descriptions)
 * @returns {string}
 */
export function generateMetaDescription(extract, maxLength = 160) {
    if (!extract) return "";

    const trimmed = extract.substring(0, maxLength);
    const lastSpace = trimmed.lastIndexOf(" ");

    return trimmed.substring(0, lastSpace) + "...";
}
