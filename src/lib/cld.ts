/** Render images live in the "gamma-folio" Cloudinary folder; older IDs were saved without the prefix. */
export function cldSrc(publicId: string) {
  return publicId.includes("gamma-folio") ? publicId : `gamma-folio/${publicId}`;
}

export function formatBytes(fileSize: number): string {
  const sizes = ["B", "KB", "MB", "GB"];
  if (fileSize === 0) return "0 B";
  const i = Math.floor(Math.log(fileSize) / Math.log(1024));
  const formatted = (fileSize / Math.pow(1024, i)).toFixed(1);
  return `${formatted.endsWith(".0") ? formatted.split(".")[0] : formatted} ${sizes[i]}`;
}
