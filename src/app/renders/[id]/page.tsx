import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

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

export async function generateMetadata(
  { params: { id } }: RenderPageProps
): Promise<Metadata> {
  const render = await getRender(id);

  return {
    title: render.name + " - GAMMA2DOT2",
    description: render.description,
    openGraph: {
      images: [{ url: render.imageUrl}],
    }
  }
}

export default async function RenderPage({ params: { id } }: RenderPageProps) {
  const render = await getRender(id);

  return (
    <div className="flex-cols flex gap-4 lg:flex-row lg:items-center">
      <Image
        src={render.imageUrl}
        alt={render.name}
        width={500}
        height={500}
        className="rounded-lg"
      />

      <div>
        <h1 className="text-5xl font-bold">{render.name}</h1>
        <p className="mt-4">{render.description}</p>
        <p>{render.year}</p>
      </div>
    </div>
  );
}
