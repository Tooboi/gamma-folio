import { prisma } from "@/lib/db/prisma";
import DownloadCard from "../../components/Cards/DownloadCard";
import CldImageWrapped from "../../components/Wrappers/CldImageWrapper";
import Link from "next/link";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata = {
  title: "GAMMA2DOT2 - Downloads",
  caption: "Gamma 2.2 - Josh Pica",
};

export default async function DownloadPage() {
  const downloads = await prisma.download.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="max-w-8xl mx-auto min-h-screen pb-6 pt-4 md:px-4 lg:px-10">
          <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
            {/* Blender Starter File - weird file type so it had to be separate */}
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
                <a
                  href={
                    "https://res.cloudinary.com/dlvmcylti/raw/upload/v1711550226/GammaStarter24"
                  }
                  className="btn-block btn mx-auto h-10 justify-center rounded-b-md rounded-t-none border-0 border-brand-600 bg-brand-600 text-[0.985rem] text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-accent-600 hover:bg-accent-950 hover:text-accent-500 active:hover:scale-100 active:hover:border-accent-700 active:hover:text-accent-700 active:focus:scale-100"
                >
                  Download .blend
                </a>
              </div>
            </div>
            {/* Rest of the downloads from the db */}
            {downloads.map((download) => (
              <DownloadCard download={download} key={download.id} />
            ))}
          </div>
        </div>
      </div>
      {/* <GoogleTagManager gtmId="GTM-KMB769RD" /> */}
    </div>
  );
}
