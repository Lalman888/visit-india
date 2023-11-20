import { useState, useEffect,Fragment } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export default function SearchResults() {
  const router = useRouter()
  const [results, setResults] = useState([])
  const client = createClient({
    projectId: "itt58wsk",
    dataset: "production",
    apiVersion: "2022-12-25",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);

  useEffect(() => {
    const fetchResults = async () => {
      const { q } = router.query
      const response = await fetch(`/api/search?q=${q}`)
      const data = await response.json()
      console.log('search data ',data)
      setResults(data)
    }

    fetchResults()
  }, [router.query])

  return (
    <>
    <section className='lg:pt-[9%] pt-[38%] max-w-[1240px] py-10 px-8 m-auto bg-white text-black '>
      <h1 className='text-3xl font-bold'>Search Results</h1>
      <ul className='pt-7 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 sm:gap-16 lg:gap-32'>
        { results ? results?.map(result => (
          <Fragment key={result._id}>
            <article className='md:hover:shadow-xl md:duration-700 ' key={result._id} >
              <div className="mb-10 overflow-hidden rounded-lg state-size">
              <Image
            className="md:w-full"
            src={builder.image(result.mainImage).url() || "/Home/Taj_mahal.avif"}
            alt={result.title}
            width={326}
            height={217}
          />
                <div className='relative top-3 '>
                  <span className="text-primary bg-[#1324e4] px-3 py-1  text-white text-sm font-semibold">
                      {result.stateCategory}
                  </span>
                </div>
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h5>
                    <p
                      // href="/n"
                      className="text-dark mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                    >
                      {result.title}
                    </p>
                  </h5>
                  <p className="text-body-color mb-7 text-base leading-relaxed">
                    {result.description}
                  </p>
                  <Link href={`/explore/${result.slug.current}`} >
                         {/* rome-ignore lint/a11y/useValidAnchor: <explanation> */}
                         <p className="text-emerald-700 hover:animate-bounce hover:block hover:duration-100 hover:transition-all px-5 py-2 hover:text-white hover:bg-emerald-700 border text-base font-semibold cursor-pointer">Read More</p>
                  </Link>
                </div>
              </div>
              </article>
          </Fragment>
        )) : <p>No results found</p>
    }
      </ul>
      </section>
    </>
  )
}
