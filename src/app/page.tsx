import { prisma } from "@/lib/db/prisma";
import RenderCard from "@/components/RenderCard";
import Image from "next/image";
import Link from "next/link";
import PaginationBar from "@/components/PaginationBar";
import { CldImage } from "next-cloudinary";

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);

  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await prisma.render.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const renders = await prisma.render.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });
  return (
    <div className="flex flex-col items-center">
      {/* //- HERO */}

      {/* {currentPage === 1 && (
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
              <p className="py-6">{renders[0].caption}</p>
              <Link
                href={"/renders/" + renders[0].id}
                className="btn-primary btn rounded-lg"
              >
                Close Ups
              </Link>
            </div>
          </div>
        </div>
      )} */}
      {/* //- NO HERO */}
      <div className="max-w-8xl mx-auto min-h-screen pb-6 pt-10 md:px-4 lg:px-10">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 2xl:grid-cols-4">
          
          {renders.map((render) => (
            <RenderCard render={render} key={render.id} />
          ))}
        </div>
      </div>

      {/* //- HERO */}
      {/* <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(currentPage === 1 ? renders.slice(1) : renders).map((render) => (
          <RenderCard render={render} key={render.id} />
        ))}
      </div> */}
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
