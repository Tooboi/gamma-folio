"use client";
import { Download } from "@prisma/client";
import axios from "axios";
import fileDownload from "js-file-download";
import { useState } from "react";
import CldImageWrapped from "../../components/Wrappers/CldImageWrapper";
import { countDownload } from "@/app/actions/downloads";

interface DownloadCardProps {
  download: Download;
  /** Admin preview: download works but isn't counted. */
  preview?: boolean;
}

export default function DownloadCard({ download, preview }: DownloadCardProps) {
  const [busy, setBusy] = useState(false);

  const handleDownload = async () => {
    const filename = download.fileName || download.imageName;
    setBusy(true);
    if (!preview) countDownload(download.id);
    try {
      const res = await axios.get(download.downloadUrl, { responseType: "blob" });
      fileDownload(res.data, filename);
    } catch {
      // Fall back to a plain link if the file can't be fetched as a blob
      window.open(download.downloadUrl, "_blank");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pb-4">
      <div className="relative z-0 h-auto max-w-full overflow-hidden rounded-lg border-2 border-brand-600 bg-black">
        {parseInt(download.pValue) > 719 && (
          <p className="border-1 absolute right-0 top-0 z-10 select-none rounded-bl-md border-brand-600 bg-brand-600 px-1 text-sm font-semibold">
            {download.pValue}p
          </p>
        )}
        <p className="border-1 absolute left-0 top-0 z-10 select-none rounded-br-md border-brand-600 bg-brand-600 px-1 text-sm font-semibold">
          {download.label}
        </p>
        <CldImageWrapped
          width={download.mobile ? 405 : 720}
          height={download.mobile ? 720 : 405}
          crop="fill"
          aspectRatio={download.mobile ? "9:16" : "16:9"}
          src={download.imageName}
          sizes="100vw"
          alt={download.label || download.imageName}
        />
        <button
          onClick={handleDownload}
          disabled={busy}
          className="btn-block btn mx-auto h-10 justify-center rounded-b-md rounded-t-none border-0 border-brand-600 bg-brand-600 text-[0.985rem] text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-accent-600 hover:bg-accent-950 hover:text-accent-500 active:hover:scale-100 active:hover:border-accent-700 active:hover:text-accent-700 active:focus:scale-100"
        >
          {busy && <span className="loading loading-spinner loading-sm" />}
          {download.buttonText}
        </button>
      </div>
    </div>
  );
}
