"use client"

import { PhotoIcon } from "@heroicons/react/24/solid";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import CldImageWrapper from "./CldImageWrapper";

type CldEditImageWrapperProps = {
  render: any; // Use 'any' type as a workaround
};

function formatBytes(fileSize: number): string {
  const sizes = ["B", "KB", "MB"];

  if (fileSize === 0) return "0 B";

  const i = Math.floor(Math.log(fileSize) / Math.log(1024));
  const formattedSize = (fileSize / Math.pow(1024, i)).toFixed(1);

  // - Check if the decimal part is .0, and remove it in that case
  const formattedSizeWithoutDecimal = formattedSize.endsWith(".0")
    ? formattedSize.split(".")[0]
    : formattedSize;

  return `${formattedSizeWithoutDecimal} ${sizes[i]}`;
}

export default function CldEditImageWrapper({
  render,
}: CldEditImageWrapperProps) {
  const [profilePic, setProfilePic] = useState(render.thumbnail);
  const [buttonClassName, setButtonClassName] = useState(
    "btn bg-brand-600 hover:bg-brand-700 hover:border-brand-500 hover:border-2 btn-block rounded-lg "
  );
  const maxFileSize = 10485760; // * 25MB in B

  // Check if "gamma-folio" is already present in the thumbnail URL
  const thumbnailSrc = render.thumbnail.includes("gamma-folio")
    ? render.thumbnail // If already present, use the thumbnail as it is
    : `gamma-folio/${render.thumbnail}`; // If not, add "gamma-folio"

  return (
    <div className="flex flex-col w-full items-center">
      <CldUploadWidget
        uploadPreset="soundbyte-next"
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
          setProfilePic(publicId);
          setButtonClassName("hidden");
        }}
        // signatureEndpoint="<Endpoint (ex: /api/sign-cloudinary-params)>"
      >
        {({ open }) => {
          return (
            <button
              className={buttonClassName}
              onClick={(e) => {
                e.preventDefault(); // Prevent default form submission
                open();
              }}
            >
              Change Thumbnail
            </button>
          );
        }}
      </CldUploadWidget>

      {render.thumbnail !== "" ? (
        <div className="h-full ">
          <div className=" overflow-hidden">
            <CldImageWrapper
              alt="Thumbnail"
              src={thumbnailSrc} 
              width="256"
              height="256"
              crop="fill"
              aspectRatio="1:1"
              sizes="100vw"
              className="mx-auto rounded-lg border-2 border-stone-700 mt-2"
            />
          </div>
          <input
            placeholder={render.thumbnail}
            id="thumbnail"
            className="input-disabled input mb-3 hidden w-full rounded-lg border-2 border-byte-500 bg-transparent text-stone-600 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
            name="thumbnail"
            value={render.thumbnail}
          />
        </div>
      ) : (
        <div className="mx-auto max-w-[256px] rounded-lg border border-byte-600 bg-byte-950">
          <PhotoIcon className="mx-auto w-full text-byte-800/80" />
          <p className="mt-[-1rem] select-none pb-2 text-center text-xs text-byte-800/80 lg:text-sm">
            Max {formatBytes(maxFileSize)}
          </p>
        </div>
      )}
    </div>
  );
}
