import { prisma } from "@/lib/db/prisma";
import { Render } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import CldImageWrapped from "../Wrappers/CldImageWrapper";

import MayaSVG from "@/components/SVG/MayaSVG";
import ArnoldSVG from "@/components/SVG/ArnoldSVG";
import ZbrushSVG from "@/components/SVG/ZbrushSVG";
import BlenderSVG from "@/components/SVG/BlenderSVG";
import SubstanceSVG from "@/components/SVG/SubstanceSVG";
import OctaneSVG from "@/components/SVG/OctaneSVG";
import DesignerSVG from "@/components/SVG/DesignerSVG";
interface RenderCardProps {
  render: Render;
}

export default function RenderCard({ render }: RenderCardProps) {
  const isNew =
    Date.now() - new Date(render.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 14;

  // Check if "gamma-folio" is already present in the thumbnail URL
  const thumbnailSrc = render.thumbnail.includes("gamma-folio")
    ? render.thumbnail // If already present, use the thumbnail as it is
    : `gamma-folio/${render.thumbnail}`; // If not, add "gamma-folio"

  return (
    <div className="group relative flex h-[110px] max-w-2xl flex-row overflow-hidden rounded-lg border-2 border-brand-700 bg-brand-800">
      <div className=" w-[128px]">
        <div className="h-full w-full overflow-hidden">
          <CldImageWrapped
            width={800}
            height={800}
            crop="fill"
            aspectRatio="1:1"
            src={thumbnailSrc}
            sizes="100vw"
            alt={render.name}
          />
        </div>
      </div>
      {/* <div className="divider divider-vertical">OR</div> */}
      <div className=" flex w-full flex-col transition-all">
        <p className="line-clamp-1 select-none px-2 text-left text-lg font-medium text-brand-200 sm:text-xl">
          {render.name}
        </p>
        <p className="select-none px-2 text-sm font-medium text-brand-300">
          {render.year}
        </p>

        <p className="line-clamp-1 select-none border-t-2 border-brand-700 p-1 px-2 text-sm font-light text-brand-400">
          {render.caption}
        </p>
        <p className="line-clamp-1 select-none border-t-2 border-brand-700 px-2 pt-1 text-xs font-light text-brand-400 group-hover:mb-1">
          {render.description}
        </p>
        <div className="absolute right-0 top-0 z-20 pr-2 pt-2 transition-all group-hover:right-8">
          <div className="flex flex-row gap-1">
            {render.maya ? (
              <div className="h-6 w-6">
                <MayaSVG />
              </div>
            ) : (
              <p></p>
            )}
            {render.arnold ? (
              <div className="h-6 w-6">
                <ArnoldSVG />
              </div>
            ) : (
              <p></p>
            )}
            {render.zbrush ? (
              <div className="h-6 w-6">
                <ZbrushSVG />
              </div>
            ) : (
              <p></p>
            )}
            {render.blender ? (
              <div className="h-6 w-6">
                <BlenderSVG />
              </div>
            ) : (
              <p></p>
            )}
            {render.substance ? (
              <div className="h-6 w-6">
                <SubstanceSVG />
              </div>
            ) : (
              <p></p>
            )}
            {render.octane ? (
              <div className="h-6 w-6">
                <OctaneSVG />
              </div>
            ) : (
              <p></p>
            )}
            {render.designer ? (
              <div className="h-6 w-6">
                <DesignerSVG />
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
      <Link
        href={"/edit/" + render.id}
        className="absolute right-0 h-full translate-x-8 rounded-r-lg border-2 border-rose-500 bg-rose-950 transition-all active:border-rose-800 group-hover:translate-x-0"
      >
        <p className=" pt-8 text-lg font-bold text-rose-500 transition-all [writing-mode:vertical-lr] active:text-rose-700">
          EDIT
        </p>
      </Link>
    </div>
    // <div className="overflow-hidden rounded-xl">
    //   <Link
    //     href={"/edit/" + render.id}
    //     className="aspect-h-1 aspect-w-1 relative mx-auto min-w-[150px] max-w-[512px] bg-brand-800"
    //   >
    //     <section className="group absolute inset-0 z-10 opacity-0 transition-all hover:opacity-100">
    //       <div className="image-gradient flex h-full w-full flex-row border-brand-700 transition-all group-hover:border-2" />
    //       <div className="absolute bottom-0 left-0 z-20 p-4">
    //         <p className="select-none text-left text-lg font-medium text-brand-200 sm:text-2xl">
    //           {render.name}
    //         </p>
    //         <p className="text-md select-none font-medium text-brand-300">
    //           {render.year}
    //         </p>
    //         <p className="text-md hidden select-none font-light text-brand-400 md:block">
    //           {render.caption}
    //         </p>
    //       </div>
    //       <div className="absolute left-0 top-0 z-20 p-4">
    //         {isNew && (
    //           <h2 className="inline-flex items-center rounded-md bg-brand-800/40 px-2 py-1 text-xs font-medium text-brand-400/90 ring-2 ring-inset ring-brand-400/40 backdrop-blur-sm">
    //             NEW
    //           </h2>
    //         )}
    //       </div>
    //       <div className="absolute right-0 top-0 z-20 p-4">
    //         <div className="flex flex-row gap-1">
    //           {render.maya ? (
    //             <div className="h-8 w-8">
    //               <MayaSVG />
    //             </div>
    //           ) : (
    //             <p></p>
    //           )}
    //           {render.arnold ? (
    //             <div className="h-8 w-8">
    //               <ArnoldSVG />
    //             </div>
    //           ) : (
    //             <p></p>
    //           )}
    //           {render.zbrush ? (
    //             <div className="h-8 w-8">
    //               <ZbrushSVG />
    //             </div>
    //           ) : (
    //             <p></p>
    //           )}
    //           {render.blender ? (
    //             <div className="h-8 w-8">
    //               <BlenderSVG />
    //             </div>
    //           ) : (
    //             <p></p>
    //           )}
    //           {render.substance ? (
    //             <div className="h-8 w-8">
    //               <SubstanceSVG />
    //             </div>
    //           ) : (
    //             <p></p>
    //           )}
    //         </div>
    //       </div>
    //     </section>
    //     <div className="h-full w-full">
    //       <CldImageWrapped
    //         width={800}
    //         height={800}
    //         crop="fill"
    //         aspectRatio="1:1"
    //         src={thumbnailSrc}
    //         sizes="100vw"
    //         alt={render.name}
    //       />
    //     </div>
    //   </Link>
    // </div>
  );
}
