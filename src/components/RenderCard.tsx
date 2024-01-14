import { prisma } from "@/lib/db/prisma";
import { Render } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import CldImageWrapped from "./CldImageWrapper";

import Blender from "../assets/blender.png";
import Substance from "../assets/substance.png";
import Maya from "../assets/maya-01.png";
import Zbrush from "../assets/zbrush512-01-01.png";
import Arnold from "../assets/arnold-01.png";

interface RenderCardProps {
  render: Render;
}

export default function RenderCard({ render }: RenderCardProps) {
  const isNew =
    Date.now() - new Date(render.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 10;

  return (
    <div className="overflow-hidden rounded-xl">
      <Link
        href={"/renders/" + render.id}
        className="aspect-h-1 aspect-w-1 relative mx-auto min-w-[150px] max-w-[512px] bg-stone-800"
      >
        <section className="absolute inset-0 z-10 opacity-0 transition hover:opacity-100">
          <div className="image-gradient flex h-full w-full flex-row" />
          <div className="absolute bottom-0 left-0 z-20 p-4">
            <p className="select-none text-left text-lg font-medium text-stone-200 sm:text-2xl">
              {render.name}
            </p>
            <p className="text-md select-none font-medium text-stone-300">
              {render.year}
            </p>
            <p className="text-md hidden select-none font-light text-stone-400 md:block">
              {render.caption}
            </p>
          </div>
          <div className="absolute bottom-0 right-0 z-20 p-4">
            {isNew && (
              <h2 className="inline-flex items-center rounded-md bg-stone-800/30 px-2 py-1 text-xs font-medium text-stone-400/70 ring-1 ring-inset ring-stone-400/20">
                NEW
              </h2>
            )}
          </div>
          <div className="absolute right-0 top-0 z-20 p-4">
            <div className="flex flex-row gap-1">
              {render.blender ? (
                <Image src={Blender} alt={"Blender"} width={32} />
              ) : (
                <p></p>
              )}
              {render.maya ? (
                <Image src={Maya} alt={"Maya"} width={32} />
              ) : (
                <p></p>
              )}
              {render.substance ? (
                <Image src={Substance} alt={"Substance"} width={32} />
              ) : (
                <p></p>
              )}
              {render.arnold ? (
                <Image src={Arnold} alt={"Arnold"} width={32} />
              ) : (
                <p></p>
              )}
              {render.zbrush ? (
                <Image src={Zbrush} alt={"Zbrush"} width={32} />
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </section>
        <div className="h-full w-full">
          <CldImageWrapped
            priority
            width="800"
            height="800"
            crop="fill"
            aspectRatio="1:1"
            src={render.thumbnail}
            sizes="100vw"
            alt={render.name}
          />
        </div>
      </Link>
    </div>
  );
}
