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

export default function CldThumbWrapper() {
  const [imageId, setImageId] = useState("");
  const [buttonClassName, setButtonClassName] = useState(
    "btn bg-brand-600 hover:bg-brand-700 hover:border-brand-500 hover:border-2 btn-wide rounded-lg "
  );
  const maxFileSize = 41943040; // 40MB in B

  return (
    <div className="flex flex-col">
      <CldUploadWidget
        uploadPreset="gamma-folio"
        options={{
          maxImageFileSize: maxFileSize,
          maxFiles: 1,
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
          const publicId = result.info.public_id;
          setImageId(publicId);
          setButtonClassName("hidden");
        }}
        // signatureEndpoint="<Endpoint (ex: /api/sign-cloudinary-params)>"
      >
        {({ open }) => {
          return (
            <button className={buttonClassName} onClick={(e) => {e.preventDefault(); open()}}>
              Add Thumbnail
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
              className="mx-auto rounded-lg border-2 border-brand-700"
            />
          </div>
          <input
            required
            placeholder={imageId}
            className="border-byte-500 focus:border-byte-600 input-disabled input mb-3 hidden w-full rounded-lg border-2 bg-transparent text-brand-600 backdrop-blur-sm placeholder:text-brand-600 focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-brand-950"
            name="publicId"
            value={imageId}
          />
        </div>
      ) : (
        <div className="mt-2 max-w-[256px] rounded-lg border-2 border-brand-700 bg-brand-900">
          <PhotoIcon className="mx-auto w-full text-brand-700" />
          <p className="mt-[-1rem] select-none pb-2 text-center text-xs text-brand-600 lg:text-sm">
            Max {formatBytes(maxFileSize)}
          </p>
          <p className="mt-[-0.5rem] select-none pb-2 text-center text-xs text-brand-600 lg:text-sm">
            800px x 800px
          </p>
        </div>
      )}
    </div>
  );
}
