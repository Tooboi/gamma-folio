import { Render } from "@prisma/client";
import Link from "next/link";
import { PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/solid";
import CldImageWrapped from "../Wrappers/CldImageWrapper";
import { SOFTWARE } from "../Admin/RenderFormFields";
import { cldSrc } from "@/lib/cld";

interface EditRenderCardProps {
  render: Render;
}

export default function EditRenderCard({ render }: EditRenderCardProps) {
  const imageCount = render.imageCollection?.length ?? 0;

  return (
    <Link
      href={"/edit/" + render.id}
      className="group relative flex h-[110px] w-full flex-row overflow-hidden rounded-lg border-2 border-brand-700 bg-brand-800 transition-all hover:border-brand-400"
    >
      <div className="h-full w-[106px] shrink-0 overflow-hidden">
        <CldImageWrapped
          width={256}
          height={256}
          crop="fill"
          aspectRatio="1:1"
          src={cldSrc(render.thumbnail)}
          sizes="128px"
          alt={render.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2 px-2">
          <p className="line-clamp-1 select-none text-left text-lg font-medium text-brand-200 sm:text-xl">
            {render.name}
          </p>
          <div className="flex shrink-0 flex-row gap-1 pt-1">
            {SOFTWARE.filter(({ key }) => render[key]).map(({ key, Icon }) => (
              <div key={key} className="h-5 w-5">
                <Icon />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 px-2 text-sm font-medium text-brand-300">
          <span>{render.year}</span>
          <span className="inline-flex items-center gap-1 text-brand-500">
            <PhotoIcon className="h-4 w-4" /> {imageCount}
          </span>
          {render.nsfw && (
            <span className="rounded bg-rose-950 px-1.5 text-xs font-semibold text-rose-400">
              NSFW
            </span>
          )}
        </div>
        <p className="line-clamp-1 select-none border-t-2 border-brand-700 p-1 px-2 text-sm font-light text-brand-400">
          {render.caption || "—"}
        </p>
        <p className="line-clamp-1 select-none border-t-2 border-brand-700 px-2 pt-1 text-xs font-light text-brand-400">
          {render.description}
        </p>
      </div>
      <div className="flex w-10 shrink-0 items-center justify-center border-l-2 border-brand-700 text-brand-500 transition-all group-hover:border-rose-500 group-hover:bg-rose-950 group-hover:text-rose-400">
        <PencilSquareIcon className="h-5 w-5" />
      </div>
    </Link>
  );
}
