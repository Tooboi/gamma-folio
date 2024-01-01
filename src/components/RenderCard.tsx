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
    // <Link
    //   href={"/renders/" + render.id}
    //   className="card w-full border-2 border-stone-800 bg-base-100 transition-shadow hover:shadow-xl"
    // >
    <div className="p-2">
      <Link
        href={"/renders/" + render.id}
        className="aspect-h-1 aspect-w-1 mx-auto min-w-[150px] max-w-[512px] overflow-hidden rounded-lg bg-stone-800"
      >
        <section className="absolute z-10 opacity-0 transition hover:opacity-100">
          <div className="image-gradient flex h-full w-full flex-row" />
          <div className="absolute bottom-0 left-0 z-20 p-4">
            <p className="select-none text-left text-2xl font-medium text-stone-200">
              {render.name}
            </p>
            <p className="text-md select-none font-medium text-stone-200">
              {render.year}
            </p>
            <p className="text-md select-none font-light text-stone-200">
              {render.description}
            </p>
            <h2 className="inline-flex items-center rounded-md bg-purple-900/20 px-2 py-1 text-xs font-medium text-purple-500/80 ring-1 ring-inset ring-purple-500/10">
              NEW
            </h2>

            {/* <div className="">
                  <Logo logoOption={render.logo} />
                </div> */}
          </div>
          <div className="absolute bottom-0 right-0 z-20 p-4">
            {/* <a href={project.link} target="_blank" rel="noreferrer">
                  <Artststion className="w-6 mx-2 fill-stone-700 hover:fill-stone-600 hover:scale-105 transition-all active:scale-100" />
                </a> */}
          </div>
        </section>
        <Image
          src={render.imageUrl}
          width={512}
          height={512}
          alt={render.name}
          className="object-cover"
        />
        {/* </Link> */}
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
    </div>
  );
}
