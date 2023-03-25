import { createClient } from "next-sanity";
export default async function handler(req, res) {
    const client = createClient({
        projectId: "itt58wsk",
        dataset: "production",
        apiVersion: "2022-12-26",
        useCdn: false,
      });
  const { q } = req.query

  try {
    const results = await client.fetch(`*[_type == "states" && title match "${q}"]`)
    res.status(200).json(results)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong.' })
  }
}
