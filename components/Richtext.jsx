import Image from "next/image";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const UrlFor = (source) => {
    return imageUrlBuilder(createClient({
        projectId: "itt58wsk",
        dataset: "production",
        apiVersion: "2022-12-25",
        useCdn: false,
    })).image(source);
};


export const RichText ={
    types: {
        image: ({value}) => {
            return (
                <div className="relative w-full h-[300px] lg:h-[500px] ">
                    <Image src={UrlFor (value).url()} alt="Place" layout="fill" objectFit="cover" />
                </div>
            )
        }
    },
    list: {
        bullet: ({children}) => <ul className="list-disc pt-9 pb-5">{children}</ul>, 
        listItem: ({children}) => <li className="pb-2">{children}</li>
    },
    blocks: {
        h2: ({children}) => <h2 className="text-4xl font-bold pb-2">{children}</h2>,
        h3: ({children}) => <h3 className="text-2xl font-bold pb-2">{children}</h3>,
        h4: ({children}) => <h4 className="text-xl font-bold pb-2">{children}</h4>,
        normal: ({children}) => <p className="pb-2">{children}</p>,
        blockquote: ({children}) => <blockquote className="border-l-4 border-gray-500 pl-4 italic">{children}</blockquote>
    },
    marks: {
         strong: ({children}) => <strong className="font-bold">{children}</strong>,
            em: ({children}) => <em className="italic">{children}</em>,
    },



}
