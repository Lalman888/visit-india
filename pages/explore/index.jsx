import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import StateCard from '../../components/StateCard'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import { BsSearch } from 'react-icons/bs'
import { useRouter } from 'next/router'


const Explore = ({states}) => {
  let [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    router.push(`/search?q=${query}`)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const client = createClient({
    projectId: "itt58wsk",
    dataset: "production",
    apiVersion: "2022-12-25",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  // console.log("places 1 ", states);
  return (
    <>
    <Head>
        <title>Explore India</title>
        <meta name='description' content='Welcome to Visit India, your ultimate guide to exploring the rich culture and history of India. From the bustling cities to the tranquil countryside, India is a land of diversity and wonder.' />
        <link rel='icon' href='/mountain.ico' />
      </Head>
      <div className='lg:pt-[7%] pt-[36%] bg-white text-black ' >
        <h1 className='text-5xl lg:pr-28 font-bold text-center'>Explore India</h1>
        <p className='text-center lg:pr-28 text-xl py-5'>Explore the beauty of India</p>
        <div className='flex max-w-[1240px] m-auto justify-end'>
          <BsSearch onClick={openModal} className='text-3xl mr-10 cursor-pointer text-black' />
        </div>
        
        <div className="max-w-[1240px] py-10 px-8 m-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 sm:gap-16 lg:gap-32">
          
          {/* <StateCard /> */}

          {
            states ? states.map((state) => (
              <article className='md:hover:shadow-xl md:duration-700 ' key={state._id} >
              <div className="mb-10 overflow-hidden rounded-lg state-size">
              <Image
            className="md:w-full"
            src={builder.image(state.mainImage).url() || "/Home/Taj_mahal.avif"}
            alt={state.title}
            width={326}
            height={217}
          />
                <div className='relative top-3 '>
                  <span className="text-primary bg-[#1324e4] px-3 py-1  text-white text-sm font-semibold">
                      {state.stateCategory}
                  </span>
                </div>
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h5>
                    <p
                      // href="/n"
                      className="text-dark mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                    >
                      {state.title}
                    </p>
                  </h5>
                  <p className="text-body-color mb-7 text-base leading-relaxed">
                    {state.description}
                  </p>
                  <Link href={`/explore/${state.slug.current}`} >
                         {/* rome-ignore lint/a11y/useValidAnchor: <explanation> */}
                         <a className="text-emerald-700 hover:animate-bounce hover:block hover:duration-100 hover:transition-all px-5 py-2 hover:text-white hover:bg-emerald-700 border text-base font-semibold cursor-pointer">Read More</a>
                  </Link>
                </div>
              </div>
              </article>
            )) : <h1>loading</h1>
          }
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Search for a place
                  </Dialog.Title>
                  <div className="mt-2">
                  <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a place"
          className='border-2 border-gray-300 p-2 rounded-lg'
        />
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-lg ml-7'
        type="submit">Search</button>
      </form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Explore

export async function getServerSideProps(context) {
  console.log("context", context.query);
  const client = createClient({
    projectId: "itt58wsk",
    dataset: "production",
    apiVersion: "2022-12-26",
    useCdn: false,
  });

  const Statequery = `*[_type == "states"  ] | order(title asc)`;
  
  const states = await client.fetch(Statequery);
  // console.log("forts", states );
  return {
    props: {
      states,
    },
  };
}

