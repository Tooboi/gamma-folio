import { prisma } from "@/lib/db/prisma";
import RenderCard from "@/components/RenderCard";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const renders = await prisma.render.findMany({
    orderBy: { id: "desc" },
  });
  return (
    <div>
      <div className="hero rounded-xl">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={renders[0].imageUrl}
            alt={renders[0].name}
            width={400}
            height={800}
            className="w-full max-w-sm rounded-lg shadow-2xl"
            priority
          />
          <div>
            <h1 className="text-5xl font-bold">{renders[0].name}</h1>
            <p className="py-6">{renders[0].description}</p>
            <Link
              href={"/renders/" + renders[0].id}
              className="btn-primary btn rounded-lg"
            >
              Close Ups
            </Link>
          </div>
        </div>
      </div>

      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {renders.slice(1).map((render) => (
          <RenderCard render={render} key={render.id} />
        ))}
      </div>
    </div>
  );
}
