import { prisma } from "@/lib/db/prisma";
import DownloadCard from "../../components/Cards/DownloadCard";
import CldImageWrapped from "../../components/Wrappers/CldImageWrapper";
import Link from "next/link";

export default async function DownloadPage() {
  const downloads = await prisma.download.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="max-w-8xl mx-auto min-h-screen pb-6 pt-4 md:px-4 lg:px-10">
          <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
            <div className="pb-4">
              <div className="relative z-0 h-auto max-w-full overflow-hidden rounded-lg border-2 border-brand-600 bg-black">
                <p className="border-1 absolute left-0 top-0 z-10 select-none rounded-br-md border-brand-600 bg-brand-600 px-1 text-sm font-semibold">
                  Gamma Starter File
                </p>
                <CldImageWrapped
                  width={720}
                  height={405}
                  crop="fill"
                  aspectRatio={"16:9"}
                  src={"blendStarter"}
                  sizes="100vw"
                  alt={"blendStarter"}
                />
                <Link
                  href={
                    "https://res.cloudinary.com/dlvmcylti/raw/upload/v1711550226/GammaStarter24"
                    // "https://asset.cloudinary.com/dlvmcylti/bf957dccb07f0ad1841e38ad0e516ca6"
                  }
                  className=" btn-block btn mx-auto h-10 justify-center rounded-b-md rounded-t-none border-0 border-brand-600 bg-brand-600 text-[0.985rem] text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-accent-600 hover:bg-accent-950 hover:text-accent-500"
                >
                  Download .blend
                </Link>
              </div>
            </div>
            {downloads.map((download) => (
              <DownloadCard download={download} key={download.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
