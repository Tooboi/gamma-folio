import { prisma } from "@/lib/db/prisma";
import CldImageWrapped from "../components/Wrappers/CldImageWrapper";
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
  // Function to check if "gamma-folio" is already present in the thumbnail URL
  const getThumbnailSrc = (thumbnail: string) => {
    if (thumbnail.includes("gamma-folio")) {
      return thumbnail; // If already present, use the thumbnail as it is
    } else {
      return `gamma-folio/${thumbnail}`; // If not, add "gamma-folio"
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-col rounded-xl border-4 border-brand-700 bg-brand-900 py-4 transition-all sm:w-1/2">
        <h1 className="text-center text-3xl tracking-wide">Josh Pica</h1>
        <p className="text-center text-lg leading-5">Full Stack Web Dev</p>
        <p className="text-center text-lg leading-5">3D Artist & VJ</p>
        <div className="mx-4 mt-4 flex flex-col rounded-lg border-2 border-emerald-700 bg-emerald-950 px-4 py-1 transition-all">
          <p className="text-center text-lg leading-6 text-emerald-300">
            Commissions Open
          </p>
          <p className="text-md text-center leading-5 text-emerald-400">
            Contact me at:
          </p>
          <p className="text-md text-center leading-5 text-emerald-400">
            gamma2dot2@gmail.com
          </p>
        </div>
        {/* <div className="mx-4 mt-4 flex flex-col rounded-lg border-4 border-rose-700 bg-rose-900 px-4 py-1 transition-all">
          <p className="text-center text-lg leading-6 text-rose-400">
            Commissions Closed
          </p>
          <p className="text-md text-center leading-5 text-rose-300">
            Contact me at:
          </p>
          <p className="text-md text-center leading-5 text-rose-300">
            gamma2dot2@gmail.com
          </p>
        </div> */}
      </div>

      <div className="relative mt-6 hidden w-full flex-col rounded-lg bg-brand-900 px-8 ring-4 ring-brand-700 ring-offset-[3px] ring-offset-rose-500 transition-all sm:flex sm:w-3/5 ">
        <div className="absolute right-0 h-full rounded-r-md border-l-[3px] border-rose-500 bg-rose-950 transition-all ">
          <p className="select-none pt-[6.7rem] text-2xl font-semibold tracking-widest text-rose-500 transition-all [writing-mode:vertical-lr] active:text-rose-700">
            PORTFOLIOS
          </p>
        </div>
        <div className="mx-auto flex w-full flex-col pl-8 pr-16 pt-6 transition-all sm:w-1/2 sm:px-0">
          <Link
            className=" btn-block btn mx-auto mb-4 h-24 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-accent-600 hover:bg-accent-950 hover:text-accent-500"
            href={"/renders"}
          >
            <h1 className="text-center text-xl transition-all xs:text-[1.4rem] md:text-3xl">
              Renders
            </h1>
          </Link>
        </div>
        <div className="mx-auto flex w-full flex-col pl-8 pr-16 pt-2 transition-all sm:w-1/2 sm:px-0">
          <Link
            className=" btn-block btn mx-auto mb-4 h-24 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-indigo-600 hover:bg-indigo-950 hover:text-indigo-500"
            href={"/animations"}
          >
            <h1 className="text-center text-xl transition-all xs:text-[1.4rem] md:text-3xl">
              Animations
            </h1>
          </Link>
        </div>
        <div className="mx-auto flex w-full flex-col pb-2 pl-8 pr-16 pt-2 transition-all sm:w-1/2 sm:px-0">
          <Link
            className=" btn-block btn mx-auto mb-4 h-24 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-secondary-600 hover:bg-secondary-950 hover:text-secondary-500"
            href={"/devs"}
          >
            <h1 className="text-center text-xl transition-all xs:text-[1.4rem] md:text-3xl">
              developer
            </h1>
          </Link>
        </div>
      </div>
      <div className="relative mt-6 flex w-full flex-col rounded-lg bg-brand-900 px-8 ring-4 ring-brand-700 ring-offset-[3px] ring-offset-rose-500 transition-all sm:hidden sm:w-3/5 ">
        <div className="absolute right-0 w-full rounded-t-md border-b-[3px] border-rose-500 bg-rose-950 transition-all ">
          <p className="select-none  text-center text-2xl font-semibold tracking-widest text-rose-500 transition-all active:text-rose-700">
            PORTFOLIOS
          </p>
        </div>
        <div className="mx-auto flex w-full flex-col px-8 pt-14 transition-all sm:w-1/2 sm:px-0">
          <Link
            className=" btn-block btn mx-auto mb-4 h-24 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-accent-600 hover:bg-accent-950 hover:text-accent-500"
            href={"/renders"}
          >
            <h1 className="text-center text-2xl transition-all xs:text-3xl">
              Renders
            </h1>
          </Link>
        </div>
        <div className="mx-auto flex w-full flex-col px-8 pt-2 transition-all sm:w-1/2 sm:px-0">
          <Link
            className=" btn-block btn mx-auto mb-4 h-24 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-indigo-600 hover:bg-indigo-950 hover:text-indigo-500"
            href={"/animations"}
          >
            <h1 className="text-center text-2xl transition-all xs:text-3xl">
              Animations
            </h1>
          </Link>
        </div>
        <div className="mx-auto flex w-full flex-col px-8 pb-2 pt-2 transition-all sm:w-1/2 sm:px-0">
          <Link
            className=" btn-block btn mx-auto mb-4 h-24 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-secondary-600 hover:bg-secondary-950 hover:text-secondary-500"
            href={"/devs"}
          >
            <h1 className="text-center text-2xl transition-all xs:text-3xl">
              developer
            </h1>
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-col  pt-6 transition-all sm:w-1/2">
        <Link
          className=" btn-block btn mx-auto mb-4 h-24 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-tertiary-600 hover:bg-tertiary-950 hover:text-tertiary-500"
          href={"/about"}
        >
          <h1 className="text-center text-3xl transition-all xs:text-4xl">
            About Me
          </h1>
        </Link>
      </div>
      <div className="relative mt-2 hidden w-full flex-col rounded-lg bg-brand-900 px-8 ring-4 ring-brand-700 ring-offset-[3px] ring-offset-accent-500 transition-all sm:flex sm:w-3/5 ">
        <div className="absolute right-0 h-full rounded-r-md border-l-[3px] border-accent-500 bg-accent-950 transition-all ">
          <p className="select-none pt-[4rem] text-2xl font-semibold tracking-widest text-accent-500 transition-all [writing-mode:vertical-lr] active:text-rose-700">
            INTERACT
          </p>
        </div>
        <div className="mx-auto flex w-full flex-col pl-8 pr-16 pt-6 transition-all sm:w-1/2 sm:px-0">
          <Link
            className=" btn-block btn mx-auto mb-4 h-24 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-emerald-600 hover:bg-emerald-950 hover:text-emerald-500"
            href={"/downloads"}
          >
            <h1 className="text-center text-xl transition-all xs:text-[1.4rem] md:text-3xl">
              Downloads
            </h1>
          </Link>
        </div>
        <div className="mx-auto flex w-full flex-col pb-2 pl-8 pr-16 pt-2 transition-all sm:w-1/2 sm:px-0">
          <Link
            className=" btn-block btn mx-auto mb-4 h-24 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-cyan-600 hover:bg-cyan-950 hover:text-cyan-500"
            href={"/tools"}
          >
            <h1 className="text-center text-xl transition-all xs:text-[1.4rem] md:text-3xl">
              Tools
            </h1>
          </Link>
        </div>
      </div>
      <div className="relative  mt-6 flex w-full flex-col rounded-lg bg-brand-900 px-8 ring-4 ring-brand-700 ring-offset-[3px] ring-offset-accent-500 transition-all sm:hidden sm:w-3/5 ">
        <div className="absolute right-0 w-full rounded-t-md border-b-[3px] border-accent-500 bg-accent-950 transition-all ">
          <p className="select-none  text-center text-2xl font-semibold tracking-widest text-accent-500 transition-all active:text-accent-700">
            INTERACT
          </p>
        </div>
        <div className="mx-auto flex w-full flex-col px-8 pt-14 transition-all sm:w-1/2 sm:px-0">
          <Link
            className=" btn-block btn mx-auto mb-4 h-24 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-emerald-600 hover:bg-emerald-950 hover:text-emerald-500"
            href={"/downloads"}
          >
            <h1 className="text-center text-2xl transition-all xs:text-3xl">
              Downloads
            </h1>
          </Link>
        </div>
        <div className="mx-auto flex w-full flex-col px-8 pb-2 pt-2 transition-all sm:w-1/2 sm:px-0">
          <Link
            className=" btn-block btn mx-auto mb-4 h-24 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-cyan-600 hover:bg-cyan-950 hover:text-cyan-500"
            href={"/tools"}
          >
            <h1 className="text-center text-2xl transition-all xs:text-3xl">
              Tools
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
