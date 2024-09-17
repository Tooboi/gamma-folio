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

type CldEditImgColWrapperProps = {
  render: {
    imageCollection: string[];
  };
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

export default function CldEditUploadImageWrapper({
  render,
}: CldEditImgColWrapperProps) {
  // console.log(render.imageCollection);

  // Initialize publicIdsArray with the values from render.imageCollection
  const [publicIdsArray, setPublicIdsArray] = useState<string[]>([]);

  // Add images from render.imageCollection to publicIdsArray when the component mounts
  useEffect(() => {
    if (render.imageCollection?.length > 0) {
      setPublicIdsArray(render.imageCollection);
    }
  }, [render.imageCollection]);

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

  return (
    <div className="flex h-full flex-row flex-wrap">
      <CldUploadWidget
        uploadPreset="gamma-folio"
        options={{
          maxImageFileSize: maxFileSize,
          maxFiles: 10,
          sources: ["local", "dropbox", "google_drive"],
          autoMinimize: false,
        }}
        onSuccess={(result: any) => {
          const publicId = result.info.public_id;
          setButtonClassName("hidden");
          handleSuccess(result);
          console.log(publicId + "_ADDED");
        }}
      >
        {({ open }) => {
          return (
            <div className="mx-auto flex w-full flex-col justify-center">
              <div className="pb-4">
                <button
                  className={buttonClassName}
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                >
                  Add Images - Max 10
                </button>
                <div className="flex justify-center">
                  {publicIdsArray.length > 0 && (
                    <div className="flex flex-wrap place-content-center pt-4">
                      {publicIdsArray.map((publicId, index) => {
                        // Check if "gamma-folio" is already present in the thumbnail URL
                        const thumbnailSrc = publicId.includes("gamma-folio")
                          ? publicId // If already present, use the URL as it is
                          : `gamma-folio/${publicId}`; // If not, add "gamma-folio"

                        return (
                          <div key={index} className="p-2">
                            <div className="relative overflow-hidden ">
                              <div
                                onClick={() => removeImage(index)}
                                className="group absolute right-0 w-8 cursor-pointer rounded-bl-lg rounded-tr-lg border-b-2 border-s-2 border-brand-700 bg-brand-800 transition-all hover:border-rose-500 hover:bg-rose-700"
                              >
                                <div className="w-8 pr-1 ">
                                  <XMarkIcon className="fill-brand-500 transition-all group-hover:fill-rose-300" />
                                </div>
                              </div>
                              <CldImageWrapper
                                alt={`Thumbnail ${index}`}
                                src={`${thumbnailSrc}`}
                                width="256"
                                height="256"
                                crop="fill"
                                aspectRatio="1:1"
                                sizes="100vw"
                                className="mx-auto rounded-lg border-2 border-brand-700"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
