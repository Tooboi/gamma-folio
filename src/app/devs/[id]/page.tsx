import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import CldImageWrapped from "../../../components/CldImageWrapper";
import Link from "next/link";

interface DevPageProps {
  params: {
    id: string;
  };
}

const getDev = cache(async (id: string) => {
  const dev = await prisma.devProject.findUnique({ where: { id } });
  if (!dev) notFound();
  return dev;
});

export async function generateMetadata({
  params: { id },
}: DevPageProps): Promise<Metadata> {
  const dev = await getDev(id);
  return {
    title: dev.title + " - GAMMA2DOT2",
    description: dev.description,
    openGraph: {
      images: [{ url: dev.image }],
    },
  };
}

export default async function DevPage({ params: { id } }: DevPageProps) {
  const dev = await getDev(id);
  return (
    <>
      <div className="container-2xl">
        <div className="mb-4 h-fit flex-row lg:hidden">
          <div className="w-full lg:p-4">
            <h1 className="text-pretty text-center text-2xl pt-4 font-bold">
              {dev.title}
            </h1>
            <p className="text-pretty mb-4 text-center">{dev.description}</p>
            <div className="flex justify-evenly gap-0 px-2 sm:justify-center sm:gap-4">
              <Link href={dev.repo} target="_blank">
                <svg
                  className="h-12 w-12 fill-stone-600 stroke-stone-600 transition-all hover:fill-stone-500 hover:stroke-stone-500 active:fill-stone-600 active:stroke-stone-600"
                  viewBox="0 0 128 128"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                  ></path>
                  <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
                </svg>
              </Link>
              <Link
                href={dev.link}
                target="_blank"
                className="btn border-stone-900 bg-stone-800 text-stone-300 transition-all hover:border-stone-800 hover:bg-stone-700 active:border-stone-900 active:bg-stone-800"
              >
                Live Link
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-6 ">
          <div className="md:col-span-3 lg:col-span-4">
            {/* Map through the ImageCollection array */}
            <div className="mx-auto flex flex-col overflow-hidden rounded-xl border-4 border-stone-900">
              <CldImageWrapped
                priority
                key={dev.id}
                quality={100}
                dpr={"auto"}
                width={1080}
                height={1080}
                src={`gamma-folio/` + dev.image}
                sizes="100vw"
                alt={dev.title}
                className="w-full border-b-4 border-stone-900 last:border-b-0"
              />
            </div>
          </div>
          <div className="sticky top-4 ml-4 hidden h-fit flex-row rounded-lg border-4 border-stone-800 bg-stone-900 md:col-span-3 lg:col-span-2  lg:flex">
            <div className="p-4">
              <h1 className="text-pretty mb-4 text-3xl font-bold text-stone-300">
                {dev.title}
              </h1>
              <p className="text-pretty mb-8 text-stone-300">
                {dev.description}
              </p>
              <div className="flex justify-between px-2">
                <Link href={dev.repo} target="_blank">
                  <svg
                    className="h-12 w-12 fill-stone-600 stroke-stone-600 transition-all hover:fill-stone-500 hover:stroke-stone-500 active:fill-stone-600 active:stroke-stone-600"
                    viewBox="0 0 128 128"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                    ></path>
                    <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
                  </svg>
                </Link>
                <Link
                  href={dev.link}
                  target="_blank"
                  className="btn border-stone-900 bg-stone-800 text-stone-300 transition-all hover:border-stone-800 hover:bg-stone-700 active:border-stone-900 active:bg-stone-800"
                >
                  Live Link
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
