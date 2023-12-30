import RenderCard from "@/components/RenderCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: ${query} - GAMMA2DOT2`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const renders = await prisma.render.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (renders.length === 0) {
    return <div className="text-center">No renders found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {renders.map((render) => (
        <RenderCard render={render} key={render.id} />
      ))}
    </div>
  );
}