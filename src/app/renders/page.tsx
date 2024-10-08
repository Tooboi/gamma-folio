import { prisma } from "@/lib/db/prisma";
import RenderCard from "@/components/Cards/RenderCard";
import PaginationBar from "@/components/PaginationBar";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { sendGAEvent } from '@next/third-parties/google'

export const metadata = {
  title: "GAMMA2DOT2 - Renders",
  caption: "Gamma 2.2 - Josh Pica",
};

interface HomeProps {
  searchParams: { page: string };
}

export default async function Renders({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);

  const pageSize = 24;
  const heroItemCount = 0;

  const totalItemCount = await prisma.render.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const renders = await prisma.render.findMany({
    orderBy: { createdAt: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-8xl mx-auto min-h-screen pb-6 pt-4 md:px-4 lg:px-10">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          {renders.map((render) => (
            <RenderCard render={render} key={render.id} />
          ))}
        </div>
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
      {/* <GoogleAnalytics gaId='G-DF8DN8Q9LH' dataLayerName="RenderPage" />
      <GoogleTagManager gtmId="GTM-KMB769RD" /> */}
    </div>
  );
}
