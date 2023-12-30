import { prisma } from "@/lib/db/prisma";
import { Render } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

interface RenderCardProps {
  render: Render;
}

export default function RenderCard({ render }: RenderCardProps) {
  const isNew =
    Date.now() - new Date(render.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={"/renders/" + render.id}
      className="card border-2 border-stone-800 w-full bg-base-100 transition-shadow hover:shadow-xl"
    >
      <figure>
        <Image
          src={render.imageUrl}
          alt={render.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{render.name} {isNew && <div className="badge badge-secondary">NEW</div>}</h2>
        <p>{render.description}</p>
        <h2>{render.year}</h2>
      </div>
    </Link>
  );
}
