import { prisma } from "@/lib/db/prisma";
import { Render } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

interface RenderCardProps {
  render: Render;
}

export default function RenderCard({ render }: RenderCardProps) {
  const isNew =
    Date.now() - new Date(render.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={"/renders/" + render.id}
      className="card border-2 border-stone-800 w-full bg-base-100 transition-shadow hover:shadow-xl"
    >

<div className="mx-auto max-w-[512px] min-w-[150px] aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-stone-800">
            <section className="absolute z-10 opacity-0 hover:opacity-100 transition">
              <div className="image-gradient h-full w-full flex flex-row" />
              <div className="z-20 absolute bottom-0 left-0 p-4">
                <p className="text-2xl font-medium text-stone-200 text-left select-none">{render.name}</p>
                <p className="text-md font-medium text-stone-200 select-none">{render.year}</p>
                <p className="text-md font-light text-stone-200 select-none">{render.description}</p>
                {/* <div className="">
                  <Logo logoOption={render.logo} />
                </div> */}
              </div>
              <div className="z-20 absolute bottom-0 right-0 p-4">
                {/* <a href={project.link} target="_blank" rel="noreferrer">
                  <Artststion className="w-6 mx-2 fill-stone-700 hover:fill-stone-600 hover:scale-105 transition-all active:scale-100" />
                </a> */}
              </div>
            </section>
            <Image src={render.imageUrl} width={512} height={512} alt={render.name} className="object-cover" />
          </div>
      {/* <figure>
        <Image
          src={render.imageUrl}
          alt={render.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{render.name} {isNew && <div className="badge badge-secondary">NEW</div>}</h2>
        <p>{render.description}</p>
        <h2>{render.year}</h2>
      </div> */}
    </Link>
  );
}
