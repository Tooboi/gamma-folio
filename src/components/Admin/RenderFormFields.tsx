import { Render } from "@prisma/client";
import { SoftwareKey } from "@/lib/renderFields";
import ThumbnailPicker from "./ThumbnailPicker";
import ImageCollectionEditor from "./ImageCollectionEditor";

import BlenderSVG from "@/components/SVG/BlenderSVG";
import HoudiniSVG from "@/components/SVG/HoudiniSVG";
import OctaneSVG from "@/components/SVG/OctaneSVG";
import RendermanSVG from "@/components/SVG/RendermanSVG";
import SubstanceSVG from "@/components/SVG/SubstanceSVG";
import DesignerSVG from "@/components/SVG/DesignerSVG";
import ArnoldSVG from "@/components/SVG/ArnoldSVG";
import MayaSVG from "@/components/SVG/MayaSVG";
import ZbrushSVG from "@/components/SVG/ZbrushSVG";

export const SOFTWARE: {
  key: SoftwareKey;
  label: string;
  Icon: () => JSX.Element;
}[] = [
  { key: "blender", label: "Blender", Icon: BlenderSVG },
  { key: "houdini", label: "Houdini", Icon: HoudiniSVG },
  { key: "octane", label: "Octane", Icon: OctaneSVG },
  { key: "renderman", label: "RenderMan", Icon: RendermanSVG },
  { key: "substance", label: "Substance Painter", Icon: SubstanceSVG },
  { key: "designer", label: "Substance Designer", Icon: DesignerSVG },
  { key: "arnold", label: "Arnold", Icon: ArnoldSVG },
  { key: "maya", label: "Maya", Icon: MayaSVG },
  { key: "zbrush", label: "ZBrush", Icon: ZbrushSVG },
];

const inputClass =
  "input mb-3 w-full rounded-lg border-2 border-brand-700 bg-transparent backdrop-blur-sm placeholder:text-brand-600 focus-within:border-brand-500";
const labelClass = "pl-1 text-sm text-brand-400";

type Props = {
  /** Existing render when editing; omit when adding. */
  render?: Render | null;
};

export default function RenderFormFields({ render }: Props) {
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <ThumbnailPicker initial={render?.thumbnail ?? ""} />

        <div className="w-full">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            required
            id="name"
            name="name"
            defaultValue={render?.name}
            placeholder="Name"
            className={inputClass}
          />
          <label htmlFor="caption" className={labelClass}>
            Caption
          </label>
          <input
            id="caption"
            name="caption"
            defaultValue={render?.caption}
            placeholder="Caption"
            className={inputClass}
          />
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={render?.description}
            placeholder="Description"
            className="textarea mb-3 w-full rounded-lg border-2 border-brand-700 bg-transparent text-base backdrop-blur-sm placeholder:text-brand-600 focus-within:border-brand-500"
          />
          <div className="flex flex-col gap-x-4 sm:flex-row sm:items-end">
            <div className="sm:w-40">
              <label htmlFor="year" className={labelClass}>
                Year
              </label>
              <input
                required
                id="year"
                name="year"
                type="number"
                defaultValue={render?.year ?? new Date().getFullYear()}
                className={inputClass}
              />
            </div>
            <label className="mb-3 flex cursor-pointer items-center gap-2 sm:h-12">
              <input
                type="checkbox"
                name="nsfw"
                defaultChecked={render?.nsfw ?? false}
                className="checkbox rounded-lg border-2 border-brand-700 bg-transparent"
              />
              <span className="text-brand-300">NSFW</span>
              <span className="text-xs text-brand-600">
                hidden from main page — shown at /renders/NSFW
              </span>
            </label>
          </div>

          <div className="rounded-lg border-2 border-brand-700">
            <div className="text-md border-b-2 border-brand-700 bg-brand-700 pl-2 font-semibold text-brand-300/80">
              Software Used
            </div>
            <div className="flex w-full flex-wrap justify-center px-2 py-1">
              {SOFTWARE.map(({ key, label, Icon }) => (
                <label key={key} className="label cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    name={key}
                    defaultChecked={render?.[key] ?? false}
                    className="peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-brand-700 bg-brand-800 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 transition-all peer-checked:border-brand-400 peer-checked:bg-brand-700 peer-checked:text-brand-300 peer-hover:border-brand-400">
                    <div className="h-5 w-5">
                      <Icon />
                    </div>
                    <p className="text-md select-none pl-2 font-normal">
                      {label}
                    </p>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <ImageCollectionEditor initial={render?.imageCollection ?? []} />
    </>
  );
}
