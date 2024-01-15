import { prisma } from "@/lib/db/prisma";
import { DevProject } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import CldImageWrapped from "./CldImageWrapper";

interface DevCardProps {
  dev: DevProject;
}

export default function DevCard({ dev }: DevCardProps) {
  return (
    <div>
        
      <p>{dev.title}</p>
      <div className="h-full w-full">
          <CldImageWrapped
            priority
            width="1200"
            height="720"
            crop="fill"
            aspectRatio="16:9"
            src={dev.image}
            sizes="100vw"
            alt={dev.title}
          />
        </div>
    </div>
  );
}
