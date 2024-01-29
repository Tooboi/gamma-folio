import { prisma } from "@/lib/db/prisma";
import CldImageWrapped from "../components/CldImageWrapper";
import Link from "next/link";

export default async function Home() {
  const [latestRender] = await prisma.render.findMany({
    take: 1,
    orderBy: { createdAt: "desc" },
  });
  const [latestDev] = await prisma.devProject.findMany({
    take: 1,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-col rounded-xl border-4 border-stone-800 bg-stone-900 py-6 transition-all sm:w-1/2">
        <h1 className="text-center text-4xl">Josh Pica</h1>
        <p className="text-center text-xl">Full Stack Web Dev</p>
        <p className="text-center text-xl">3D Artist</p>
        <p className="text-center text-xl">VJ</p>
      </div>
      <div className="max-w-8xl mx-auto min-h-screen pb-6 pt-4 md:px-4 lg:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl">
            <Link
              href="/renders"
              className="aspect-h-1 aspect-w-1 relative mx-auto min-w-[150px] max-w-[512px] bg-stone-800 "
            >
              <section className="group absolute inset-0 z-10 opacity-70 transition-all hover:opacity-100 ">
                <div className="flex h-full w-full flex-row bg-stone-950/80 transition-all ">
                  <div className="z-20 flex h-full w-full p-4 ">
                    <p className="text-wrap m-auto select-none text-center text-5xl font-bold text-stone-300/80">
                      3D Portfolio
                    </p>
                  </div>
                </div>
              </section>
              <div className="h-full w-full ">
                <CldImageWrapped
                  priority
                  width="1280"
                  height="720"
                  crop="thumb"
                  aspectRatio="16:9"
                  src={`gamma-folio/` + latestRender.thumbnail}
                  sizes="100vw"
                  alt={latestRender.name}
                />
              </div>
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl">
            <Link
              href="/devs"
              className="aspect-h-1 aspect-w-1 relative mx-auto min-w-[150px] max-w-[512px] bg-stone-800 "
            >
              <section className="group absolute inset-0 z-10 opacity-70 transition-all hover:opacity-100 ">
                <div className="flex h-full w-full flex-row bg-stone-950/80 transition-all ">
                  <div className="z-20 flex h-full w-full p-4">
                    <p className="text-wrap m-auto select-none text-center text-5xl font-bold text-stone-300/80">
                      Development Portfolio
                    </p>
                  </div>
                </div>
              </section>
              <div className="h-full w-full">
                <CldImageWrapped
                  priority
                  width="1280"
                  height="720"
                  crop="thumb"
                  aspectRatio="16:9"
                  src={`gamma-folio/` + latestDev.image}
                  sizes="100vw"
                  alt={latestDev.title}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
