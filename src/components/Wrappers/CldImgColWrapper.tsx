"use client";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import CldImageWrapper from "./CldImageWrapper";

type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

// - Formats B to MB
function formatBytes(fileSize: number): string {
  const sizes = ["B", "KB", "MB"];
  if (fileSize === 0) return "0 B";
  const i = Math.floor(Math.log(fileSize) / Math.log(1024));
  const formattedSize = (fileSize / Math.pow(1024, i)).toFixed(1);
  const formattedSizeWithoutDecimal = formattedSize.endsWith(".0")
    ? formattedSize.split(".")[0]
    : formattedSize;

  return `${formattedSizeWithoutDecimal} ${sizes[i]}`;
}

export default function CldUploadImageWrapper() {
  const [publicIdsArray, setPublicIdsArray] = useState<string[]>([]);
  const [buttonClassName, setButtonClassName] = useState(
    "btn bg-brand-600 hover:bg-brand-700 hover:border-brand-500 hover:border-2 btn-block rounded-lg justify-center mx-auto"
  );
  const maxFileSize = 41943040; // 40MB in B

  const handleSuccess = (result: UploadResult) => {
    const { info } = result;
    const { public_id } = info;
    if (!publicIdsArray.includes(public_id)) {
      setPublicIdsArray((prevPublicIds) => [...prevPublicIds, public_id]);
    }
  };

  const removeImage = (index: number) => {
    setPublicIdsArray((prevPublicIds) => {
      const newArray = [...prevPublicIds];
      newArray.splice(index, 1);
      return newArray;
    });
  };

  useEffect(() => {}, [publicIdsArray]);

  return (
    <div className="flex h-full flex-row flex-wrap">
      <CldUploadWidget
        uploadPreset="gamma-folio"
        options={{
          maxImageFileSize: maxFileSize,
          maxFiles: 10,
          sources: [
            "local",
            "dropbox",
            "google_drive",
            // "instagram",
            // "unsplash",
          ],
          autoMinimize: false,
        }}
        onSuccess={(result: any) => {
          // console.log("Resulting Image Collection Object: " + result.info);
          // const publicId = result.info.public_id;
          // setImageId(publicId);
          setButtonClassName("hidden");
          handleSuccess(result);
        }}
      >
        {({ open }) => {
          return (
            <div className="mx-auto flex w-full flex-col justify-center">
              <button
                className={buttonClassName}
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}
              >
                Add Images - Max 10
              </button>
              {publicIdsArray.length === 0 && (
                <div className="mx-auto mt-4 flex flex-row gap-4">
                  <div className="hidden max-w-[256px] rounded-lg border-2 border-brand-700 bg-brand-900 md:block">
                    <PhotoIcon className="mx-auto w-full text-brand-700" />
                    <p className="mt-[-1rem] select-none pb-2 text-center text-xs text-brand-600 lg:text-sm">
                      Max {formatBytes(maxFileSize)}
                    </p>
                  </div>
                  <div className="hidden max-w-[256px] rounded-lg border-2 border-brand-700 bg-brand-900 sm:block">
                    <PhotoIcon className="mx-auto w-full text-brand-700" />
                    <p className="mt-[-1rem] select-none pb-2 text-center text-xs text-brand-600 lg:text-sm">
                      Max {formatBytes(maxFileSize)}
                    </p>
                  </div>
                  <div className="max-w-[256px] rounded-lg border-2 border-brand-700 bg-brand-900">
                    <PhotoIcon className="mx-auto w-full text-brand-700" />
                    <p className="mt-[-1rem] select-none pb-2 text-center text-xs text-brand-600 lg:text-sm">
                      Max {formatBytes(maxFileSize)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>

      {publicIdsArray.length > 0 && (
        <>
          {publicIdsArray.map((id, index) => (
            <div key={index} className="h-full p-2">
              <div className="relative overflow-hidden">
                <div
                  onClick={() => removeImage(index)}
                  className="group absolute right-2 w-8 cursor-pointer rounded-bl-lg rounded-tr-lg border-b-2 border-s-2 border-brand-700 bg-brand-800 transition-all hover:bg-rose-600"
                >
                  <div className="w-8 pr-1 ">
                    <XMarkIcon className="fill-brand-500 transition-all group-hover:fill-brand-200" />
                  </div>
                </div>
                <CldImageWrapper
                  alt={`Thumbnail ${index}`}
                  src={id}
                  width="256"
                  height="256"
                  crop="fill"
                  aspectRatio="1:1"
                  sizes="100vw"
                  className="mx-auto rounded-lg border-2 border-brand-700"
                />
              </div>
              <input
                placeholder={id}
                className="border-byte-500 focus:border-byte-600 input-disabled input mb-3 hidden w-full rounded-lg border-2 bg-transparent text-brand-600 backdrop-blur-sm placeholder:text-brand-600 focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-brand-950"
                name="imageCollectionArray"
                value={publicIdsArray}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
