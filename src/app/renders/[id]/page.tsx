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
  // console.log(render);

  return (
    <div className="container-2xl">
      <div className="">
        <div>
          {/* Map through the ImageCollection array */}
          {render.imageCollection && render.imageCollection.length > 0 && (
            <div className="flex  flex-col">
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
                  className=""
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex-cols flex gap-4 lg:flex-row lg:items-center">
          <h1 className="text-5xl font-bold">{render.name}</h1>
          <p className="mt-4">{render.description}</p>
          <p>{render.year}</p>
          <div>
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
      </div>
    </div>
  );
}
