import { CldImage } from 'next-cloudinary';
import { prisma } from "@/lib/db/prisma";
import { Render } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import CldImageWrapped from './CldImageWrapper';

interface RenderCardProps {
  render: Render;
}

export default function RenderCard({ render }: RenderCardProps) {
  const isNew =
    Date.now() - new Date(render.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <div className="overflow-hidden rounded-lg">
      <Link
        href={"/renders/" + render.id}
        className="aspect-h-1 aspect-w-1 relative mx-auto min-w-[150px] max-w-[512px] bg-stone-800"
      >
        <section className="absolute inset-0 z-10 opacity-0 transition hover:opacity-100">
          <div className="image-gradient flex h-full w-full flex-row" />
          <div className="absolute bottom-0 left-0 z-20 p-4">
            <p className="select-none text-left text-2xl font-medium text-stone-200">
              {render.name}
            </p>
            <p className="text-md select-none font-medium text-stone-200">
              {render.year}
            </p>
            <p className="text-md select-none font-light text-stone-200">
              {render.caption}
            </p>
            {/* <div className="">
                  <Logo logoOption={render.logo} />
                </div> */}
          </div>
          <div className="absolute bottom-0 right-0 z-20 p-4">
            <h2 className="inline-flex items-center rounded-md bg-stone-800/30 px-2 py-1 text-xs font-medium text-stone-400/70 ring-1 ring-inset ring-stone-400/20">
              NEW
            </h2>
            {/* <a href={project.link} target="_blank" rel="noreferrer">
                  <Artststion className="w-6 mx-2 fill-stone-700 hover:fill-stone-600 hover:scale-105 transition-all active:scale-100" />
                </a> */}
          </div>
        </section>
        {/* <Image
          src={render.thumbnail}
          width={512}
          height={512}
          alt={render.name}
          className="object-cover"
        /> */}
        <CldImageWrapped
          width="960"
          height="600"
          src={render.thumbnail}
          sizes="100vw"
          alt="Description of my image"
        />
      </Link>
    </div>
  );
}
