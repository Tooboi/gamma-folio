"use client";
import { CldImage, CldUploadButton } from "next-cloudinary";
// import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CldUploadWrapper(
  // { onUploadSuccess }
  ) {
  const router = useRouter();
  // const [imageId, setImageId] = useState("");
  // const [publicIdsArray, setPublicIdsArray] = useState([]);

  // useEffect(() => {
  //   // Retrieve existing array from local storage or initialize an empty array
  //   const storedPublicIds = JSON.parse(
  //     localStorage.getItem("uploadedPublicIds") || "[]"
  //   );
  //   setPublicIdsArray(storedPublicIds);
  // }, []);

  // const handleUploadSuccess = (result) => {
  //   const newPublicId = result.info.public_id;
  //   setImageId(newPublicId);

  //   // Retrieve existing array from local storage or initialize an empty array
  //   const storedPublicIds = JSON.parse(
  //     localStorage.getItem("uploadedPublicIds") || "[]"
  //   );

  //   // Add the new public_id to the array
  //   const updatedPublicIds = [...storedPublicIds, newPublicId];

  //   // Save the updated array to local storage
  //   localStorage.setItem("uploadedPublicIds", JSON.stringify(updatedPublicIds));

  //   setPublicIdsArray(updatedPublicIds);

  //   // Pass the updatedPublicIds to the parent component
  //   onUploadSuccess(updatedPublicIds);

  //   setTimeout(() => {
  //     router.refresh();
  //   }, 2000);
  //   console.log(newPublicId);
  // };

  return (
    <div className="flex flex-row py-4">
      {/* <CldUploadButton
        uploadPreset="gamma-folio"
        onSuccess={handleUploadSuccess}
        className="btn-secondary btn"
      >
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <h1 className="mt-[0.15rem]">Upload Images</h1>
        </div>
      </CldUploadButton > */}
      {/* {imageId && (
        <div className="mx-4 rounded-lg border-2 border-stone-800 bg-transparent p-2 backdrop-blur-sm">
          <h2 className="text-sm">Uploaded Public IDs:</h2>
          <ul>
            {publicIdsArray.map((publicId) => (
              <li key={publicId}>
                <h2 className="">{publicId}</h2>
                <CldImage
                  width="128"
                  height="128"
                  src={publicId}
                  sizes="100vw"
                  alt={publicId}
                  className="rounded-lg"
                />
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}
