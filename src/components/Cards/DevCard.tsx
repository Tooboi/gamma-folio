import { prisma } from "@/lib/db/prisma";
import { DevProject } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import CldImageWrapped from "../Wrappers/CldImageWrapper";

interface DevCardProps {
  dev: DevProject;
}

export default function DevCard({ dev }: DevCardProps) {
  // Check if "gamma-folio" is already present in the thumbnail URL
  const thumbnailSrc = dev.image.includes("gamma-folio")
    ? dev.image // If already present, use the thumbnail as it is
    : `gamma-folio/${dev.image}`; // If not, add "gamma-folio" to this file so the image is correctly imported

  return (
    <div className="overflow-hidden rounded-md">
      <Link
        href={"/devs/" + dev.id}
        className="aspect-h-1 aspect-w-1 relative mx-auto min-w-[150px] max-w-[512px] bg-brand-800 "
      >
        <section className="group absolute inset-0 z-10 opacity-0 transition-all hover:opacity-100 ">
          <div className="image-gradient-dev flex h-full w-full flex-row transition-all " />
          <div className="absolute bottom-0 left-0 z-20 p-4">
            <p className="select-none text-left text-lg font-medium text-brand-200 sm:text-2xl">
              {dev.title}
            </p>
            <p className="select-none text-left text-sm font-light text-brand-200 ">
              {dev.description}
            </p>
          </div>
        </section>
        <div className="h-full w-full">
              <CldImageWrapped
                width="800"
                height="800"
                crop="thumb"
                aspectRatio="1:1"
                src={thumbnailSrc}
                sizes="100vw"
                alt={dev.title}
              />
            </div>
      </Link>
    </div>
  );
}
