import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import CldImageWrapped from "../../../components/CldImageWrapper";

import Blender from "../../../assets/blender.png";
import Substance from "../../../assets/substance.png";
import Maya from "../../../assets/maya-01.png";
import Zbrush from "../../../assets/zbrush512-01-01.png";
import Arnold from "../../../assets/arnold-01.png";

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
  // const createdAtDate = new Date(render.createdAt).toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // });
  // console.log(render);

  return (
    <div className="container-2xl">
      <div className="lg:hidden mb-4 h-fit flex-row">
          <div className="p-4 w-full">
            <h1 className="text-pretty mb-4 text-2xl font-bold">
              {render.name}
            </h1>
            <p className="text-pretty mb-4">{render.description}</p>
            <div className="mb-4">
              <p className="text-md font-semibold">Software Used</p>
              <div className=" flex flex-row gap-1">
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
            <p className="text-lg font-bold">{render.year}</p>
          </div>
        </div>
      <div className="lg:grid lg:grid-cols-6 ">
        <div className="lg:col-span-4 md:col-span-3">
          {/* Map through the ImageCollection array */}
          {render.imageCollection && render.imageCollection.length > 0 && (
            <div className="mx-auto flex flex-col overflow-hidden rounded-xl">
              {render.imageCollection.map((pubID, index) => (
                <CldImageWrapped
                  priority
                  key={index}
                  quality={100}
                  dpr={"auto"}
                  width={1080}
                  height={1080}
                  src={pubID}
                  sizes="100vw"
                  alt={render.name}
                  className="w-full"
                />
              ))}
            </div>
          )}
        </div>
        <div className="lg:col-span-2 md:col-span-3 ml-4 hidden h-fit flex-row rounded-lg border-2 border-stone-700 bg-stone-800 md:flex">
          <div className="p-4">
            <h1 className="text-pretty mb-4 text-3xl font-bold">
              {render.name}
            </h1>
            <p className="text-pretty mb-8">{render.description}</p>
            <div className="">
              <p className="text-lg font-semibold">Software Used</p>
              <div className=" flex flex-row gap-1">
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
            <p className="text-right text-lg font-bold">{render.year}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
