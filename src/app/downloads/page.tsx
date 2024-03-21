import { prisma } from "@/lib/db/prisma";
import DownloadCard from "../../components/Cards/DownloadCard";

export default async function DownloadPage() {
  const downloads = await prisma.download.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="max-w-8xl mx-auto min-h-screen pb-6 pt-4 md:px-4 lg:px-10">
          <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
            {downloads.map((download) => (
              <DownloadCard download={download} key={download.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
