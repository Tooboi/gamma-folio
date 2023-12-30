import Image from "next/image";

interface RenderPageProps {
  params: {
    id: string;
  };
}

export default async function RenderPage({ params: { id } }: RenderPageProps) {
  const render = await prisma.render.findUnique({ where: { id } });
  if (!render) notFound();

  return (
    <div className="flex-cols flex lg:flex-row">
      <Image
        src={render.imageUrl}
        alt={render.name}
        width={500}
        height={500}
        className="rounded-lg"
      />

      <div>
        <h1 className="text-5xl font-bold">{render.name}</h1>
      </div>
    </div>
  );
}
