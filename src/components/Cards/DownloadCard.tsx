"use client";
import { Download } from "@prisma/client";
import axios from "axios";
import fileDownload from "js-file-download";
import CldImageWrapped from "../../components/Wrappers/CldImageWrapper";

interface DownloadCardProps {
  download: Download;
}

export default function DownloadCard({ download }: DownloadCardProps) {
  const handelDownload = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
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
          alt={download.imageName}
        />
        <button
          onClick={() => {
            handelDownload(download.downloadUrl, download.imageName);
          }}
          className="btn-block btn mx-auto h-10 justify-center rounded-b-md rounded-t-none border-0 border-brand-600 bg-brand-600 text-[0.985rem] text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-accent-600 hover:bg-accent-950 hover:text-accent-500 active:hover:scale-100 active:hover:border-accent-700 active:hover:text-accent-700 active:focus:scale-100"
        >
          {download.buttonText}
        </button>
      </div>
    </div>
  );
}
