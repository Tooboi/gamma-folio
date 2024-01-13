import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import CldImageWrapped from "../../../components/CldImageWrapper";

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
      <div className="flex-cols flex gap-4 lg:flex-row lg:items-center">
        <h1 className="text-5xl font-bold">{render.name}</h1>
        <p className="mt-4">{render.description}</p>
        <p>{render.year}</p>
        {render.blender ? <p>blender</p> : <p></p>}
        {render.maya ? <p>maya</p> : <p></p>}
        {render.substance ? <p>substance</p> : <p></p>}
        {render.arnold ? <p>arnold</p> : <p></p>}
        {render.zbrush ? <p>zbrush</p> : <p></p>}
      </div>
      <div>
        {/* Map through the ImageCollection array */}
        {render.imageCollection && render.imageCollection.length > 0 && (
          <div>
            {render.imageCollection.map((pubID, index) => (
              <CldImageWrapped
                priority
                key={index}
                quality={100}
                dpr={"auto"}
                width={1350}
                height={1080}
                src={pubID}
                sizes="100dvw"
                alt={render.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
