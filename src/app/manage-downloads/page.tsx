import { prisma } from "@/lib/db/prisma";
import Link from "next/link";
import DownloadForm from "@/components/Admin/DownloadForm";
import ConfirmDeleteButton from "@/components/Admin/ConfirmDeleteButton";
import CldImageWrapped from "@/components/Wrappers/CldImageWrapper";
import { deleteDownload } from "@/app/actions/downloads";
import { requireAdmin } from "@/lib/admin";

export const metadata = {
  title: "GAMMA2DOT2 - Manage Downloads",
};

export default async function ManageDownloadsPage() {
  await requireAdmin("/manage-downloads");

  const downloads = await prisma.download.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="mx-auto w-full max-w-5xl pb-10 pt-4">
      <DownloadForm />

      <div className="mb-3 mt-10 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-300">
          Current Downloads{" "}
          <span className="text-base font-normal text-brand-500">
            ({downloads.length})
          </span>
        </h2>
        <Link
          href="/downloads"
          target="_blank"
          className="text-sm text-brand-500 hover:text-brand-300"
        >
          View page ↗
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {downloads.map((d) => (
          <div
            key={d.id}
            className="flex flex-col gap-3 overflow-hidden rounded-lg border-2 border-brand-700 bg-brand-800 sm:h-24 sm:flex-row sm:items-center"
          >
            <div className="h-24 w-full shrink-0 overflow-hidden bg-black sm:w-40">
              <CldImageWrapped
                width={320}
                height={180}
                crop="fill"
                src={d.imageName}
                sizes="160px"
                alt={d.label}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 px-3 sm:px-0">
              <p className="line-clamp-1 text-lg font-medium text-brand-200">
                {d.label}
              </p>
              <p className="text-sm text-brand-400">
                {d.mobile ? "Portrait" : "Landscape"}
                {d.pValue ? ` · ${d.pValue}p` : ""} · “{d.buttonText}” ·{" "}
                {d.downloads} download{d.downloads === 1 ? "" : "s"}
              </p>
              <a
                href={d.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="line-clamp-1 text-xs text-brand-500 hover:text-brand-300"
              >
                {d.fileName || d.downloadUrl}
              </a>
            </div>
            <div className="px-3 pb-3 sm:pb-0">
              <ConfirmDeleteButton
                id={d.id}
                action={deleteDownload}
                title={`Delete "${d.label}"?`}
                message="It will be removed from the downloads page. The file stays in Cloudinary."
                className="btn-sm btn rounded-lg border-2 border-rose-700 bg-brand-600 text-brand-300 hover:bg-rose-950 hover:text-rose-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
