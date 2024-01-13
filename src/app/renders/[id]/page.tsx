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
    <div className="flex-cols flex gap-4 lg:flex-row lg:items-center">
      {/* Map through the ImageCollection array */}
      {render.imageCollection && render.imageCollection.length > 0 && (
          <div>
            {render.imageCollection.map((pubID, index) => (
              <CldImageWrapped
                key={index}
                width="960"
                height="600"
                src={pubID}
                sizes="100vw"
                alt={render.name}
              />
            ))}
          </div>
        )}

      <div>
        <h1 className="text-5xl font-bold">{render.name}</h1>
        <p className="mt-4">{render.description}</p>
        <p>{render.year}</p>
        {render.blender ? <p>blender</p> : <p></p>}
        {render.maya ? <p>maya</p> : <p></p>}
        {render.substance ? <p>substance</p> : <p></p>}
        {render.arnold ? <p>arnold</p> : <p></p>}
        {render.zbrush ? <p>zbrush</p> : <p></p>}
      </div>
    </div>
  );
}
