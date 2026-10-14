export const SOFTWARE_KEYS = [
  "blender",
  "houdini",
  "octane",
  "renderman",
  "substance",
  "designer",
  "arnold",
  "maya",
  "zbrush",
] as const;

export type SoftwareKey = (typeof SOFTWARE_KEYS)[number];

/** Reads the shared add/edit render form. Image order is the order of the hidden inputs. */
export function parseRenderForm(formData: FormData) {
  const str = (key: string) => (formData.get(key)?.toString() ?? "").trim();

  const name = str("name");
  const caption = str("caption");
  const description = str("description");
  const thumbnail = str("thumbnail");
  const year = parseInt(str("year"), 10);
  const nsfw = formData.has("nsfw");
  const imageCollection = formData
    .getAll("imageCollection")
    .map((v) => v.toString().trim())
    .filter(Boolean);

  const software = Object.fromEntries(
    SOFTWARE_KEYS.map((key) => [key, formData.has(key)])
  ) as Record<SoftwareKey, boolean>;

  const missing = [
    !name && "name",
    !thumbnail && "thumbnail",
    !year && "year",
  ].filter(Boolean);
  if (missing.length) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }

  return {
    name,
    caption,
    description,
    thumbnail,
    year,
    nsfw,
    imageCollection,
    ...software,
  };
}
