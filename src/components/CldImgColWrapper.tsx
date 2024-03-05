"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
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
  const [imageId, setImageId] = useState("");
  const [buttonClassName, setButtonClassName] = useState(
    "btn bg-stone-600 hover:bg-stone-700 hover:border-stone-500 hover:border-2 btn-block rounded-lg justify-center mx-auto"
  );
  const maxFileSize = 41943040; // 40MB in B

  const handleSuccess = (result: UploadResult) => {
    const { info } = result;
    // Extract the public_id from the info object
    const { public_id } = info;
    // Check if the public_id is already in the array
    if (!publicIdsArray.includes(public_id)) {
      // If not, add it to the array
      setPublicIdsArray((prevPublicIds) => [...prevPublicIds, public_id]);
    }
  };

  useEffect(() => {
    // console.log("PublicIdsArray: ", publicIdsArray);
  }, [publicIdsArray]);

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
            "instagram",
            "unsplash",
          ],
          autoMinimize: true,
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
              <button className={buttonClassName} onClick={(e) => {e.preventDefault(); open()}}>
                Add Images - Max 10
              </button>
              {publicIdsArray.length === 0 && (
                <div className="mx-auto mt-4 flex flex-row gap-4">
                  <div className="max-w-[256px] rounded-lg border-2 border-stone-700 bg-stone-900 md:block hidden">
                    <PhotoIcon className="mx-auto w-full text-stone-700" />
                    <p className="mt-[-1rem] select-none pb-2 text-center text-xs text-stone-600 lg:text-sm">
                      Max {formatBytes(maxFileSize)}
                    </p>
                  </div>
                  <div className="max-w-[256px] rounded-lg border-2 border-stone-700 bg-stone-900 sm:block hidden">
                    <PhotoIcon className="mx-auto w-full text-stone-700" />
                    <p className="mt-[-1rem] select-none pb-2 text-center text-xs text-stone-600 lg:text-sm">
                      Max {formatBytes(maxFileSize)}
                    </p>
                  </div>
                  <div className="max-w-[256px] rounded-lg border-2 border-stone-700 bg-stone-900">
                    <PhotoIcon className="mx-auto w-full text-stone-700" />
                    <p className="mt-[-1rem] select-none pb-2 text-center text-xs text-stone-600 lg:text-sm">
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
            <div key={index} className="h-full">
              <div className="overflow-hidden px-2">
                <CldImageWrapper
                  alt={`Thumbnail ${index}`}
                  src={id}
                  width="256"
                  height="256"
                  crop="fill"
                  aspectRatio="1:1"
                  sizes="100vw"
                  className="mx-auto rounded-lg border-2 border-stone-700"
                />
              </div>
              <input
                placeholder={id}
                className="border-byte-500 focus:border-byte-600 input-disabled input mb-3 hidden w-full rounded-lg border-2 bg-transparent text-stone-600 backdrop-blur-sm placeholder:text-stone-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
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
