"use client";

import { useEffect, useRef, useState } from "react";

const SCRIPT_SRC = "https://upload-widget.cloudinary.com/global/all.js";
let loader: Promise<any> | null = null;

/** Loads Cloudinary's widget script once per page, however many uploaders mount. */
function loadCloudinary(): Promise<any> {
  const w = window as any;
  if (w.cloudinary) return Promise.resolve(w.cloudinary);
  if (!loader) {
    loader = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${SCRIPT_SRC}"]`
      );
      const script = existing ?? document.createElement("script");
      script.addEventListener("load", () =>
        w.cloudinary
          ? resolve(w.cloudinary)
          : reject(new Error("Cloudinary upload widget failed to load"))
      );
      script.addEventListener("error", () => {
        loader = null;
        reject(new Error("Could not load the Cloudinary upload widget"));
      });
      if (!existing) {
        script.src = SCRIPT_SRC;
        script.async = true;
        document.body.appendChild(script);
      }
    });
  }
  return loader;
}

/**
 * Cloudinary upload widget as a hook. `onUpload` runs once per uploaded file
 * with Cloudinary's upload info (public_id, secure_url, width, height, …).
 */
export function useUploadWidget(
  options: Record<string, unknown>,
  onUpload: (info: any) => void
) {
  const onUploadRef = useRef(onUpload);
  onUploadRef.current = onUpload;
  const widgetRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    let cancelled = false;
    loadCloudinary()
      .then((cloudinary) => {
        if (cancelled) return;
        widgetRef.current = cloudinary.createUploadWidget(
          {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            ...JSON.parse(optionsKey),
          },
          (err: any, result: any) => {
            if (err) {
              setError(err?.statusText || err?.message || "Upload failed");
              return;
            }
            if (result?.event === "success") {
              setError("");
              onUploadRef.current(result.info);
            }
          }
        );
        setReady(true);
      })
      .catch((e) => !cancelled && setError(e.message));

    return () => {
      cancelled = true;
      try {
        widgetRef.current?.destroy?.();
      } catch {}
      widgetRef.current = null;
      setReady(false);
    };
  }, [optionsKey]);

  const open = () => widgetRef.current?.open();

  return { open, ready, error };
}
