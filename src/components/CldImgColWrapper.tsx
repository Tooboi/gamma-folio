"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { CldImage, CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import CldImageWrapper from "./CldImageWrapper";

type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

function formatBytes(fileSize: number): string {
  const sizes = ["B", "KB", "MB"];

  if (fileSize === 0) return "0 B";

  const i = Math.floor(Math.log(fileSize) / Math.log(1024));
  const formattedSize = (fileSize / Math.pow(1024, i)).toFixed(1);

  // Check if the decimal part is .0, and remove it in that case
  const formattedSizeWithoutDecimal = formattedSize.endsWith(".0")
    ? formattedSize.split(".")[0]
    : formattedSize;

  return `${formattedSizeWithoutDecimal} ${sizes[i]}`;
}

export default function CldUploadImageWrapper() {
  const [publicIds, setPublicIds] = useState<string[]>([]);
  const [imageId, setImageId] = useState("");
  const [buttonClassName, setButtonClassName] = useState(
    "btn-block btn rounded-lg border-2 border-byte-700 bg-byte-600 hover:bg-byte-700 active:border-byte-800 active:bg-byte-950 hover:border-byte-400 active:text-byte-400 text-byte-200"
  );
  const maxFileSize = 41943040; // 40MB in B

  const handleSuccess = (result: UploadResult) => {
    const { info } = result;
    const newPublicIds = [...publicIds, info.public_id];
    setPublicIds(newPublicIds);
  };

  return (
    <div className="h-full">
      <CldUploadWidget
        uploadPreset="gamma-folio"
        options={{
          maxImageFileSize: maxFileSize,
          maxFiles: 10,
          sources: [
            "local",
            "dropbox",
            "google_drive",
            "instagram",
            "unsplash",
          ],
          autoMinimize: true,
        }}
        onSuccess={(result: any) => {
          console.log(result.info);
          
          const publicId = result.info.public_id;
          setImageId(publicId);
          setButtonClassName("hidden");
        }}
        // signatureEndpoint="<Endpoint (ex: /api/sign-cloudinary-params)>"
      >
        {({ open }) => {
          return (
            <button className={buttonClassName} onClick={() => open()}>
              Add Images
            </button>
          );
        }}
      </CldUploadWidget>

      {imageId ? (
        <div className="h-full ">
          <div className=" overflow-hidden">
            <CldImageWrapper
              alt="Thumbnail"
              src={imageId}
              width="256"
              height="256"
              crop="fill"
              aspectRatio="1:1"
              sizes="100vw"
              className="mx-auto rounded-lg border-2 border-stone-700"
            />
          </div>
          <input
            required
            placeholder={imageId}
            className="input-disabled input mb-3 hidden w-full rounded-lg border-2 border-byte-500 bg-transparent text-stone-600 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
            name="publicIdCol"
            value={imageId}
          />
        </div>
      ) : (
        <div className="mx-auto mt-2 max-w-[256px] rounded-lg border border-byte-600 bg-byte-950">
          <PhotoIcon className="mx-auto w-full text-byte-800/80" />
          <p className="mt-[-1rem] select-none pb-2 text-center text-xs text-byte-800/80 lg:text-sm">
            Max {formatBytes(maxFileSize)}
          </p>
        </div>
      )}
    </div>
  );
}
