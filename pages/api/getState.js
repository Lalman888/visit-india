import {groq} from 'next-sanity'
import {sanityClient} from '../../sanity'

const query = groq`*[_type == "states" && visitedRank < 5 ] | order(visitedRank asc) `
export default async function handler(req, res) {
    const states = await sanityClient.fetch(query)
    res.status(200).json(states)
}

// Path: pages/api/getState.js
// Compare this snippet from sanity.js:
