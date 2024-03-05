import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import CldImageWrapped from "@/components/CldImageWrapper";

import MayaSVG from "@/components/SVG/MayaSVG";
import ArnoldSVG from "@/components/SVG/ArnoldSVG";
import ZbrushSVG from "@/components/SVG/ZbrushSVG";
import BlenderSVG from "@/components/SVG/BlenderSVG";
import SubstanceSVG from "@/components/SVG/SubstanceSVG";

interface RenderPageProps {
  params: {
    id: string;
  };
}

const getRender = cache(async (id: string) => {
  const render = await prisma.render.findUnique({ where: { id } });
  if (!render) notFound();
  return render;
});

export async function generateMetadata({
  params: { id },
}: RenderPageProps): Promise<Metadata> {
  const render = await getRender(id);

  return {
    title: render.name + " - GAMMA2DOT2",
    description: render.description,
    openGraph: {
      images: [{ url: render.thumbnail }],
    },
  };
}

export default async function RenderPage({ params: { id } }: RenderPageProps) {
  const render = await getRender(id);
  const createdAtDate = new Date(render.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return (
    <div className="container-2xl">
      <div className="mb-4 h-fit flex-row lg:hidden">
        <div className="w-full lg:p-4">
          <h1 className="text-pretty text-center text-2xl font-bold">
            {render.name}
          </h1>
          <p className="text-center text-lg font-bold">{createdAtDate}</p>
          <p className="text-pretty mb-4 text-center">{render.description}</p>
          <div className="mb-4 flex flex-wrap justify-center">
            <div className="flex flex-wrap justify-center">
              {render.maya ? (
                <span className="my-0.5 me-2 inline-flex items-center rounded border border-stone-500 bg-stone-700 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 ">
                  <div className="h-5 w-5">
                    <MayaSVG />
                  </div>
                  <p className="text-md select-none pl-2 font-normal">Maya</p>
                </span>
              ) : (
                <p></p>
              )}
              {render.arnold ? (
                <span className="my-0.5 me-2 inline-flex items-center rounded border border-stone-500 bg-stone-700 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 ">
                  <div className="h-5 w-5">
                    <ArnoldSVG />
                  </div>
                  <p className="text-md select-none pl-2 font-normal">Arnold</p>
                </span>
              ) : (
                <p></p>
              )}
              {render.zbrush ? (
                <span className="my-0.5 me-2 inline-flex items-center rounded border border-stone-500 bg-stone-700 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 ">
                  <div className="h-5 w-5">
                    <ZbrushSVG />
                  </div>
                  <p className="text-md select-none pl-2 font-normal">ZBrush</p>
                </span>
              ) : (
                <p></p>
              )}
              {render.blender ? (
                <span className="my-0.5 me-2 inline-flex items-center rounded border border-stone-500 bg-stone-700 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 ">
                  <div className="h-5 w-5">
                    <BlenderSVG />
                  </div>
                  <p className="text-md select-none pl-2 font-normal">
                    Blender
                  </p>
                </span>
              ) : (
                <p></p>
              )}
              {render.substance ? (
                <span className="my-0.5 me-2 inline-flex items-center rounded border border-stone-500 bg-stone-700 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 ">
                  <div className="h-5 w-5">
                    <SubstanceSVG />
                  </div>
                  <p className="text-md select-none pl-2 font-normal">
                    Substance Painter
                  </p>
                </span>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-6 ">
        <div className="md:col-span-3 lg:col-span-4">
          {/* Map through the ImageCollection array */}
          {render.imageCollection && render.imageCollection.length > 0 && (
            <div className="mx-auto flex flex-col overflow-hidden rounded-xl border-4 border-stone-900">
              {render.imageCollection.map((pubID, index) => {
                // Check if "gamma-folio" is already present in the pubID URL
                const imageUrl = pubID.includes("gamma-folio")
                  ? pubID
                  : `gamma-folio/${pubID}`;
                return (
                  <CldImageWrapped
                    priority
                    key={index}
                    quality={100}
                    dpr={"auto"}
                    width={1080}
                    height={1080}
                    src={imageUrl}
                    sizes="100vw"
                    alt={render.name}
                    className="w-full border-b-4 border-stone-900 last:border-b-0"
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="sticky top-4 ml-4 hidden h-fit flex-row rounded-lg border-4 border-stone-800 bg-stone-900 md:col-span-3 lg:col-span-2 lg:flex">
          <div className="w-full p-4">
            <h1 className="text-pretty mb-4 text-3xl font-bold text-stone-300">
              {render.name}
            </h1>
            <p className="text-pretty mb-4 text-stone-300">
              {render.description}
            </p>
            <div className="flex flex-col pb-4">
              <p className="text-lg font-semibold text-stone-300">
                Software Used
              </p>
              <div className="flex flex-wrap ">
                <div className="">
                  {render.maya ? (
                    <span className="my-0.5 me-2 inline-flex items-center rounded border border-stone-500 bg-stone-700 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 ">
                      <div className="h-5 w-5">
                        <MayaSVG />
                      </div>
                      <p className="text-md select-none pl-2 font-normal">
                        Maya
                      </p>
                    </span>
                  ) : (
                    <p></p>
                  )}
                  {render.arnold ? (
                    <span className="my-0.5 me-2 inline-flex items-center rounded border border-stone-500 bg-stone-700 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 ">
                      <div className="h-5 w-5">
                        <ArnoldSVG />
                      </div>
                      <p className="text-md select-none pl-2 font-normal">
                        Arnold
                      </p>
                    </span>
                  ) : (
                    <p></p>
                  )}
                  {render.zbrush ? (
                    <span className="my-0.5 me-2 inline-flex items-center rounded border border-stone-500 bg-stone-700 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 ">
                      <div className="h-5 w-5">
                        <ZbrushSVG />
                      </div>
                      <p className="text-md select-none pl-2 font-normal">
                        ZBrush
                      </p>
                    </span>
                  ) : (
                    <p></p>
                  )}
                  {render.blender ? (
                    <span className="my-0.5 me-2 inline-flex items-center rounded border border-stone-500 bg-stone-700 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 ">
                      <div className="h-5 w-5">
                        <BlenderSVG />
                      </div>
                      <p className="text-md select-none pl-2 font-normal">
                        Blender
                      </p>
                    </span>
                  ) : (
                    <p></p>
                  )}
                  {render.substance ? (
                    <span className="my-0.5 me-2 inline-flex items-center rounded border border-stone-500 bg-stone-700 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 ">
                      <div className="h-5 w-5">
                        <SubstanceSVG />
                      </div>
                      <p className="text-md select-none pl-2 font-normal">
                        Substance Painter
                      </p>
                    </span>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
            <p className="text-right text-lg font-bold text-stone-300">
              {createdAtDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
