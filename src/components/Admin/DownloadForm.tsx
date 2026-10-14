"use client";

import { ArrowUpTrayIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useUploadWidget } from "./useUploadWidget";
import { useRef, useState } from "react";
import FormSubmitButton from "../FormSubmitButton";
import DownloadCard from "../Cards/DownloadCard";
import { createDownload } from "@/app/actions/downloads";
import { formatBytes } from "@/lib/cld";

type UploadInfo = {
  public_id: string;
  secure_url: string;
  original_filename?: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
};

const inputClass =
  "input w-full rounded-lg border-2 border-brand-700 bg-transparent placeholder:text-brand-600 focus-within:border-brand-500";
const labelClass = "pl-1 text-sm text-brand-400";
const btnClass =
  "btn rounded-lg border-2 border-brand-700 bg-brand-600 text-brand-300 hover:border-brand-500 hover:bg-brand-700";

const fileNameOf = (info: UploadInfo) =>
  info.original_filename
    ? info.format && !info.original_filename.endsWith(`.${info.format}`)
      ? `${info.original_filename}.${info.format}`
      : info.original_filename
    : info.public_id.split("/").pop() ?? "download";

const MAX_FILE = 104857600; // 100MB – your Cloudinary plan may set a lower cap

export default function DownloadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<UploadInfo | null>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [label, setLabel] = useState("");
  const [buttonText, setButtonText] = useState("Download");
  const [pValue, setPValue] = useState("");
  const [mobile, setMobile] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  const applyFile = (info: UploadInfo) => {
    setDownloadUrl(info.secure_url);
    setFileName(fileNameOf(info));
    setFileSize(info.bytes ?? null);
  };

  const onPreview = (info: UploadInfo) => {
    setPreview(info);
    if (info.width && info.height) {
      setMobile(info.height > info.width);
      setPValue(String(Math.min(info.width, info.height)));
    }
    if (!label && info.original_filename) setLabel(info.original_filename);
  };

  const previewUploader = useUploadWidget(
    {
      uploadPreset: "gamma-folio",
      multiple: false,
      maxFiles: 1,
      maxImageFileSize: 52428800,
      sources: ["local", "dropbox", "google_drive"],
    },
    (info) => info?.public_id && onPreview(info)
  );
  const fileUploader = useUploadWidget(
    {
      uploadPreset: "gamma-folio",
      multiple: false,
      maxFiles: 1,
      resourceType: "auto",
      maxFileSize: MAX_FILE,
      sources: ["local", "dropbox", "google_drive"],
    },
    (info) => info?.secure_url && applyFile(info)
  );
  const uploadError = previewUploader.error || fileUploader.error;

  const reset = () => {
    formRef.current?.reset();
    setPreview(null);
    setDownloadUrl("");
    setFileName("");
    setFileSize(null);
    setLabel("");
    setButtonText("Download");
    setPValue("");
    setMobile(false);
  };

  const submit = async (formData: FormData) => {
    setError("");
    setSaved("");
    try {
      await createDownload(formData);
      setSaved(`"${label}" is live on the downloads page.`);
      reset();
    } catch (e: any) {
      setError(e?.message || "Something went wrong saving the download.");
    }
  };

  return (
    <form
      ref={formRef}
      action={submit}
      className="rounded-lg border-2 border-brand-700 p-4 backdrop-blur-2xl"
    >
      <h2 className="pb-3 text-center text-2xl font-bold text-brand-300">
        Add Download
      </h2>

      <input type="hidden" name="imageName" value={preview?.public_id ?? ""} />
      <input type="hidden" name="fileName" value={fileName} />

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          {/* 1. Preview image */}
          <div>
            <p className="mb-1 font-semibold text-brand-300">
              1. Preview image
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={previewUploader.open}
                disabled={!previewUploader.ready}
                className={btnClass}
              >
                <PhotoIcon className="h-4 w-4" />
                {preview ? "Change preview" : "Upload preview"}
              </button>
            </div>
            <p className="mt-1 text-xs text-brand-500">
              Shown on the card. Orientation and resolution fill in from it.
            </p>
          </div>

          {/* 2. The file people download */}
          <div>
            <p className="mb-1 font-semibold text-brand-300">
              2. File to download
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={fileUploader.open}
                disabled={!fileUploader.ready}
                className={btnClass}
              >
                <ArrowUpTrayIcon className="h-4 w-4" />
                Upload file
              </button>
              <button
                type="button"
                disabled={!preview}
                onClick={() => preview && applyFile(preview)}
                className={btnClass}
                title="For wallpapers: the download is the preview image itself"
              >
                Use preview image
              </button>
            </div>
            <label htmlFor="downloadUrl" className={`${labelClass} mt-2 block`}>
              File URL (filled by upload, or paste any link)
            </label>
            <input
              required
              id="downloadUrl"
              name="downloadUrl"
              type="url"
              value={downloadUrl}
              onChange={(e) => {
                setDownloadUrl(e.target.value);
                setFileSize(null);
                if (!fileName) {
                  const last = e.target.value.split("?")[0].split("/").pop();
                  if (last) setFileName(last);
                }
              }}
              placeholder="https://res.cloudinary.com/…"
              className={inputClass}
            />
            <label
              htmlFor="fileNameVisible"
              className={`${labelClass} mt-2 block`}
            >
              Saved as{fileSize ? ` · ${formatBytes(fileSize)}` : ""}
            </label>
            <input
              id="fileNameVisible"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="GammaStarter.blend"
              className={inputClass}
            />
          </div>

          {/* 3. Card details */}
          <div>
            <p className="mb-1 font-semibold text-brand-300">3. Card details</p>
            <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
              <div>
                <label htmlFor="label" className={labelClass}>
                  Label
                </label>
                <input
                  required
                  id="label"
                  name="label"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Neon Alley Wallpaper"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="buttonText" className={labelClass}>
                  Button text
                </label>
                <input
                  id="buttonText"
                  name="buttonText"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="pValue" className={labelClass}>
                  Resolution (p) — badge shows at 720+
                </label>
                <input
                  id="pValue"
                  name="pValue"
                  inputMode="numeric"
                  value={pValue}
                  onChange={(e) => setPValue(e.target.value.replace(/\D/g, ""))}
                  placeholder="2160"
                  className={inputClass}
                />
              </div>
              <label className="mt-6 flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  name="mobile"
                  checked={mobile}
                  onChange={(e) => setMobile(e.target.checked)}
                  className="checkbox rounded-lg border-2 border-brand-700"
                />
                <span className="text-brand-300">Portrait / mobile (9:16)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="w-full md:w-72">
          <p className="mb-1 font-semibold text-brand-300">Preview</p>
          {preview ? (
            <DownloadCard
              preview
              download={{
                id: "preview",
                createdAt: new Date(),
                updatedAt: new Date(),
                downloadUrl,
                fileName,
                imageName: preview.public_id,
                mobile,
                pValue,
                buttonText: buttonText || "Download",
                label: label || "Label",
                downloads: 0,
              }}
            />
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-brand-700 text-sm text-brand-600">
              Upload a preview image
            </div>
          )}
        </div>
      </div>

      {uploadError && (
        <p className="mt-4 rounded-lg border-2 border-rose-700 bg-rose-950/40 p-2 text-rose-300">
          Upload problem: {uploadError}
        </p>
      )}
      {error && (
        <p className="mt-4 rounded-lg border-2 border-rose-700 bg-rose-950/40 p-2 text-rose-300">
          {error}
        </p>
      )}
      {saved && (
        <p className="mt-4 rounded-lg border-2 border-teal-700 bg-teal-950/40 p-2 text-teal-300">
          {saved}
        </p>
      )}

      <div className="divider"></div>
      <FormSubmitButton
        disabled={!preview || !downloadUrl}
        className="btn-block rounded-lg border-0 bg-brand-600 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-accent-600 hover:bg-accent-950 hover:text-accent-500"
      >
        Publish Download
      </FormSubmitButton>
    </form>
  );
}
