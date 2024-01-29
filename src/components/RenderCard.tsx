import { prisma } from "@/lib/db/prisma";
import { Render } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import CldImageWrapped from "./CldImageWrapper";

import MayaSVG from "@/components/SVG/MayaSVG";
import ArnoldSVG from "@/components/SVG/ArnoldSVG";
import ZbrushSVG from "@/components/SVG/ZbrushSVG";
import BlenderSVG from "@/components/SVG/BlenderSVG";
import SubstanceSVG from "@/components/SVG/SubstanceSVG";
interface RenderCardProps {
  render: Render;
}

export default function RenderCard({ render }: RenderCardProps) {
  const isNew =
    Date.now() - new Date(render.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 14;

  return (
    <div className="overflow-hidden rounded-xl">
      <Link
        href={"/renders/" + render.id}
        className="aspect-h-1 aspect-w-1 relative mx-auto min-w-[150px] max-w-[512px] bg-stone-800"
      >
        <section className="group absolute inset-0 z-10 opacity-0 transition-all hover:opacity-100">
          <div className="image-gradient flex h-full w-full flex-row border-stone-700 transition-all group-hover:border-2" />
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
          <div className="absolute left-0 top-0 z-20 p-4">
            {isNew && (
              <h2 className="inline-flex items-center rounded-md bg-stone-800/40 px-2 py-1 text-xs font-medium text-stone-400/90 ring-2 ring-inset ring-stone-400/40 backdrop-blur-sm">
                NEW
              </h2>
            )}
          </div>
          <div className="absolute right-0 top-0 z-20 p-4">
            <div className="flex flex-row gap-1">
              {render.maya ? <div className="h-8 w-8"><MayaSVG /></div> : <p></p>}
              {render.arnold ? <div className="h-8 w-8"><ArnoldSVG /></div> : <p></p>}
              {render.zbrush ? <div className="h-8 w-8"><ZbrushSVG /></div> : <p></p>}
              {render.blender ? <div className="h-8 w-8"><BlenderSVG /></div> : <p></p>}
              {render.substance ? <div className="h-8 w-8"><SubstanceSVG /></div> : <p></p>}
            </div>
          </div>
        </section>
        <div className="h-full w-full">
          <CldImageWrapped
            width={800}
            height={800}
            crop="fill"
            aspectRatio="1:1"
            src={`gamma-folio/` + render.thumbnail}
            sizes="100vw"
            alt={render.name}
          />
        </div>
      </Link>
    </div>
  );
}
