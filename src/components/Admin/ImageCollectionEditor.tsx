"use client";

import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpTrayIcon,
  Bars3Icon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useUploadWidget } from "./useUploadWidget";
import { useState } from "react";
import CldImageWrapper from "../Wrappers/CldImageWrapper";
import { cldSrc, formatBytes } from "@/lib/cld";

type Props = {
  /** Form field name; one hidden input per image, in display order. */
  name?: string;
  initial?: string[];
  maxFileSize?: number;
};

type View = "grid" | "page";

export default function ImageCollectionEditor({
  name = "imageCollection",
  initial = [],
  maxFileSize = 52428800, // 50MB
}: Props) {
  const [images, setImages] = useState<string[]>(initial);
  const [view, setView] = useState<View>("grid");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const add = (id: string) =>
    setImages((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const remove = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const move = (from: number, to: number) =>
    setImages((prev) => {
      if (to < 0 || to >= prev.length || from === to) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });

  const endDrag = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  const uploader = useUploadWidget(
    {
      uploadPreset: "gamma-folio",
      multiple: true,
      maxFiles: 30,
      maxImageFileSize: maxFileSize,
      sources: ["local", "dropbox", "google_drive"],
    },
    (info) => info?.public_id && add(info.public_id)
  );
  const open = uploader.open;

  const isGrid = view === "grid";
  const BackIcon = isGrid ? ArrowLeftIcon : ArrowUpIcon;
  const ForwardIcon = isGrid ? ArrowRightIcon : ArrowDownIcon;

  return (
    <div className="w-full">
      {images.map((id) => (
        <input key={id} type="hidden" name={name} value={id} />
      ))}

      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-brand-300">
            Image Collection{" "}
            <span className="text-sm font-normal text-brand-500">
              ({images.length})
            </span>
          </h2>
          <p className="text-sm text-brand-500">
            Drag images (or use the arrows) to set the order they appear on the
            render page, first to last.
          </p>
        </div>
        <div className="join rounded-lg border-2 border-brand-700">
          <button
            type="button"
            onClick={() => setView("grid")}
            title="Grid view"
            className={`btn-sm join-item btn border-0 ${
              isGrid
                ? "bg-brand-600 text-brand-200"
                : "bg-transparent text-brand-500"
            }`}
          >
            <Squares2X2Icon className="h-4 w-4" /> Grid
          </button>
          <button
            type="button"
            onClick={() => setView("page")}
            title="Preview the order as it appears on the render page"
            className={`btn-sm join-item btn border-0 ${
              !isGrid
                ? "bg-brand-600 text-brand-200"
                : "bg-transparent text-brand-500"
            }`}
          >
            <Bars3Icon className="h-4 w-4" /> Page order
          </button>
        </div>
      </div>

      {uploader.error && (
        <p className="mb-2 text-sm text-rose-400">{uploader.error}</p>
      )}

      <div
        className={
          isGrid
            ? "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            : "mx-auto flex max-w-xl flex-col gap-3"
        }
      >
        {images.map((id, index) => {
          const isDragging = dragIndex === index;
          const isTarget =
            overIndex === index && dragIndex !== null && dragIndex !== index;
          return (
            <div
              key={id}
              draggable
              onDragStart={(e) => {
                setDragIndex(index);
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", String(index));
              }}
              onDragOver={(e) => {
                e.preventDefault();
                if (overIndex !== index) setOverIndex(index);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragIndex !== null) move(dragIndex, index);
                endDrag();
              }}
              onDragEnd={endDrag}
              className={`group relative cursor-grab overflow-hidden rounded-lg border-2 bg-black transition-all active:cursor-grabbing ${
                isTarget
                  ? "scale-[1.02] border-accent-500"
                  : "border-brand-700 hover:border-brand-500"
              } ${isDragging ? "opacity-40" : ""}`}
            >
              <span className="absolute left-0 top-0 z-10 select-none rounded-br-md bg-brand-700 px-2 py-0.5 text-sm font-semibold text-brand-200">
                {index + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(index)}
                title="Remove image"
                className="absolute right-0 top-0 z-10 rounded-bl-md bg-brand-800 p-1 text-brand-400 transition-all hover:bg-rose-700 hover:text-rose-100"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>

              <div className={isGrid ? "aspect-square w-full" : "w-full"}>
                <CldImageWrapper
                  alt={`Image ${index + 1}`}
                  src={cldSrc(id)}
                  width={isGrid ? 400 : 800}
                  height={isGrid ? 400 : 800}
                  crop="fit"
                  sizes={isGrid ? "25vw" : "600px"}
                  draggable={false}
                  className={
                    isGrid
                      ? "pointer-events-none h-full w-full object-contain"
                      : "pointer-events-none h-auto w-full"
                  }
                />
              </div>

              <div className="flex items-center justify-between border-t-2 border-brand-700 bg-brand-800">
                <button
                  type="button"
                  onClick={() => move(index, index - 1)}
                  disabled={index === 0}
                  title="Move earlier"
                  className="p-1.5 text-brand-400 hover:text-brand-200 disabled:opacity-20"
                >
                  <BackIcon className="h-4 w-4" />
                </button>
                <span className="select-none text-xs text-brand-500">
                  drag to move
                </span>
                <button
                  type="button"
                  onClick={() => move(index, index + 1)}
                  disabled={index === images.length - 1}
                  title="Move later"
                  className="p-1.5 text-brand-400 hover:text-brand-200 disabled:opacity-20"
                >
                  <ForwardIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => open()}
          disabled={!uploader.ready}
          className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-brand-600 bg-brand-900/40 p-4 text-brand-400 transition-all hover:border-brand-400 hover:text-brand-200 ${
            isGrid ? "aspect-square" : "h-32"
          }`}
        >
          <ArrowUpTrayIcon className="h-8 w-8" />
          <span className="font-medium">
            {!uploader.ready
              ? "Loading uploader…"
              : images.length
              ? "Add more images"
              : "Add images"}
          </span>
          <span className="text-xs text-brand-500">
            Max {formatBytes(maxFileSize)} each
          </span>
        </button>
      </div>
    </div>
  );
}
