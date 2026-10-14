"use client";

import { ArrowUpTrayIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useUploadWidget } from "./useUploadWidget";
import { useState } from "react";
import CldImageWrapper from "../Wrappers/CldImageWrapper";
import { cldSrc, formatBytes } from "@/lib/cld";

type Props = {
  name?: string;
  initial?: string;
  maxFileSize?: number;
};

export default function ThumbnailPicker({
  name = "thumbnail",
  initial = "",
  maxFileSize = 10485760, // 10MB
}: Props) {
  const [publicId, setPublicId] = useState(initial);
  const uploader = useUploadWidget(
    {
      uploadPreset: "gamma-folio",
      maxImageFileSize: maxFileSize,
      maxFiles: 1,
      multiple: false,
      sources: ["local", "dropbox", "google_drive"],
    },
    (info) => info?.public_id && setPublicId(info.public_id)
  );

  return (
    <div className="relative flex w-full flex-col items-center gap-2 md:w-64">
      <div className="relative aspect-square w-full max-w-[256px] overflow-hidden rounded-lg border-2 border-brand-700 bg-brand-900">
        {publicId ? (
          <CldImageWrapper
            alt="Thumbnail"
            src={cldSrc(publicId)}
            width="512"
            height="512"
            crop="fill"
            aspectRatio="1:1"
            sizes="256px"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-brand-600">
            <PhotoIcon className="w-2/3 text-brand-700" />
            <p className="select-none text-xs lg:text-sm">
              Max {formatBytes(maxFileSize)} · 800 × 800
            </p>
          </div>
        )}
      </div>

      {/* Visually hidden but still validated, so the form can't submit without a thumbnail */}
      <input
        required
        name={name}
        value={publicId}
        onChange={() => {}}
        tabIndex={-1}
        aria-label="Thumbnail"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <button
        type="button"
        onClick={uploader.open}
        disabled={!uploader.ready}
        className="btn-block btn max-w-[256px] rounded-lg border-2 border-brand-700 bg-brand-600 text-brand-300 hover:border-brand-500 hover:bg-brand-700"
      >
        <ArrowUpTrayIcon className="h-4 w-4" />
        {!uploader.ready
          ? "Loading uploader…"
          : publicId
          ? "Change Thumbnail"
          : "Add Thumbnail"}
      </button>
      {uploader.error && (
        <p className="text-sm text-rose-400">{uploader.error}</p>
      )}
    </div>
  );
}
