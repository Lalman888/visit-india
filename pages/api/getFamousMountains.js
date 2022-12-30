import {groq} from 'next-sanity'
import {sanityClient} from '../../sanity'

const query = groq`*[_type == "place" && popularCount ==6 ] `
export default async function handler(req, res) {
    const Fmountains = await sanityClient.fetch(query)
    res.status(200).json(Fmountains)
}

// Path: pages/api/getState.js
// Compare this snippet from sanity.js:
