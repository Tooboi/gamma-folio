import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";

import MayaSVG from "@/components/SVG/MayaSVG";
import ArnoldSVG from "@/components/SVG/ArnoldSVG";
import ZbrushSVG from "@/components/SVG/ZbrushSVG";
import BlenderSVG from "@/components/SVG/BlenderSVG";
import SubstanceSVG from "@/components/SVG/SubstanceSVG";
import OctaneSVG from "@/components/SVG/OctaneSVG";
import DesignerSVG from "@/components/SVG/DesignerSVG";
import HoudiniSVG from "@/components/SVG/HoudiniSVG";
import CldEditImageWrapper from "@/components/Wrappers/CldEditImageWrapper";
import FormSubmitButton from "@/components/FormSubmitButton";
import CldEditImgColWrapper from "@/components/Wrappers/CldEditImgColWrapper";
import Link from "next/link";
import DeleteRenderButton from "@/components/Wrappers/DeleteRenderButton";

interface RenderPageProps {
  params: {
    id: string;
  };
}

const getRender = cache(async (id: string) => {
  const render = await prisma.render.findUnique({ where: { id } });
  if (!render) notFound();
  return render;
});
export async function generateMetadata({
  params: { id },
}: RenderPageProps): Promise<Metadata> {
  const render = await getRender(id);

  return {
    title: render.name + " - GAMMA2DOT2",
    description: render.description,
    openGraph: {
      images: [{ url: render.thumbnail }],
    },
  };
}

async function updateRender(formData: FormData) {
  "use server";

  // Extract the ID and other fields from FormData
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString() || "";
  const caption = formData.get("caption")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const year = parseInt(formData.get("year")?.toString() || "0");

  const octane = formData.has("octane");
  const blender = formData.has("blender");
  const substance = formData.has("substance");
  const designer = formData.has("designer");
  const arnold = formData.has("arnold");
  const maya = formData.has("maya");
  const zbrush = formData.has("zbrush");
  const houdini = formData.has("houdini");

  const imageCollection = formData.getAll("imageCollection[]").map(String);
  console.log(imageCollection);
  

  if (!id) {
    throw new Error("ID is missing");
  }

  const updatedRender = await prisma.render.update({
    where: {
      id,
    },
    data: {
      name,
      caption,
      description,
      year,
      octane,
      blender,
      substance,
      designer,
      arnold,
      maya,
      zbrush,
      houdini,
      imageCollection,
    },
  });
  // return updatedRender;
  redirect("/edit")
}

async function deleteRender(id: string) {
  "use server";
  await prisma.render.delete({ where: { id } });
  redirect("/edit");
}

export default async function EditPage({ params: { id } }: RenderPageProps) {
  const render = await getRender(id);
  const createdAtDate = new Date(render.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return (
    <div className="w-full">
      <form
        action={updateRender}
        className="rounded-lg border-2 border-brand-700 p-2 px-4 backdrop-blur-2xl"
      >
        <h1 className="pb-3 text-center text-2xl font-bold text-brand-300">
          Edit Render
        </h1>
        <div className="flex flex-row">
          <div>
            <CldEditImageWrapper render={render} />
          </div>
          <div className="w-full pl-4">
            {/* Hidden field for ID */}
            <input type="hidden" name="id" defaultValue={render.id} />{" "}
            <label htmlFor="name" className="pl-2 text-stone-400">
              Name
            </label>
            <input
              type="text"
              defaultValue={render.name}
              id="name"
              name="name"
              placeholder={render.name}
              className="input mb-3 w-full rounded-lg border-2 border-brand-700 bg-transparent backdrop-blur-sm placeholder:text-brand-600 focus-within:border-brand-500"
            />
            <label htmlFor="caption" className="pl-2 text-stone-400">
              Caption
            </label>
            <input
              type="text"
              defaultValue={render.caption}
              id="caption"
              name="caption"
              placeholder={render.caption}
              className="input mb-3 w-full rounded-lg border-2 border-brand-700 bg-transparent backdrop-blur-sm placeholder:text-brand-600 focus-within:border-brand-500"
            />
            <label htmlFor="description" className="pl-2 text-stone-400">
              Description
            </label>
            <textarea
              defaultValue={render.description}
              id="description"
              name="description"
              placeholder={render.description}
              className="textarea w-full rounded-lg border-2 border-brand-700 bg-transparent backdrop-blur-sm placeholder:text-[1.025rem] placeholder:text-brand-600 focus-within:border-brand-500"
            />
            <label htmlFor="year" className="pl-2 text-stone-400">
              Year
            </label>
            <input
              defaultValue={render.year.toString()}
              id="year"
              name="year"
              type="number"
              placeholder={render.year.toString()}
              className="input mb-3 w-full rounded-lg border-2 border-brand-700 bg-transparent backdrop-blur-sm placeholder:text-brand-600 focus-within:border-brand-500"
            />
            <div className="rounded-lg border-2 border-brand-700">
              <div className="text-md border-b-2 border-r-2 border-brand-700 bg-brand-700 pl-2 font-semibold text-brand-300/80">
                Software Used
              </div>
              <div className="flex w-full flex-wrap justify-center px-2">
                <label className="label join-item cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    defaultChecked={render.octane}
                    name="octane"
                    className=" peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-brand-700 bg-brand-800 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 transition-all peer-checked:border-brand-400 peer-checked:bg-brand-700 peer-checked:text-brand-300 peer-hover:border-brand-400">
                    <div className="h-5 w-5">
                      <OctaneSVG />
                    </div>
                    <p className="text-md select-none pl-2 font-normal">
                      Octane
                    </p>
                  </span>
                </label>
                <label className="label join-item cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    defaultChecked={render.blender}
                    name="blender"
                    className=" peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-brand-700 bg-brand-800 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 transition-all peer-checked:border-brand-400 peer-checked:bg-brand-700 peer-checked:text-brand-300 peer-hover:border-brand-400">
                    <div className="h-5 w-5">
                      <BlenderSVG />
                    </div>
                    <p className="text-md select-none pl-2 font-normal">
                      Blender
                    </p>
                  </span>
                </label>
                <label className="label join-item cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    defaultChecked={render.houdini}
                    name="houdini"
                    className=" peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-brand-700 bg-brand-800 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 transition-all peer-checked:border-brand-400 peer-checked:bg-brand-700 peer-checked:text-brand-300 peer-hover:border-brand-400">
                    <div className="h-5 w-5">
                      <HoudiniSVG />
                    </div>
                    <p className="text-md select-none pl-2 font-normal">
                      Houdini
                    </p>
                  </span>
                </label>
                <label className="label join-item cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    defaultChecked={render.substance}
                    name="substance"
                    className="peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-brand-700 bg-brand-800 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 transition-all peer-checked:border-brand-400 peer-checked:bg-brand-700 peer-checked:text-brand-300 peer-hover:border-brand-400">
                    <div className="h-5 w-5">
                      <SubstanceSVG />
                    </div>
                    <p className="text-md select-none pl-2 font-normal">
                      Substance Painter
                    </p>
                  </span>
                </label>
                <label className="label join-item cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    defaultChecked={render.designer}
                    name="designer"
                    className="peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-brand-700 bg-brand-800 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 transition-all peer-checked:border-brand-400 peer-checked:bg-brand-700 peer-checked:text-brand-300 peer-hover:border-brand-400">
                    <div className="h-5 w-5">
                      <DesignerSVG />
                    </div>
                    <p className="text-md select-none pl-2 font-normal">
                      Substance Designer
                    </p>
                  </span>
                </label>
                <label className="label join-item cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    defaultChecked={render.arnold}
                    name="arnold"
                    className="peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-brand-700 bg-brand-800 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 transition-all peer-checked:border-brand-400 peer-checked:bg-brand-700 peer-checked:text-brand-300 peer-hover:border-brand-400">
                    <div className="h-5 w-5">
                      <ArnoldSVG />
                    </div>
                    <p className="text-md select-none pl-2 font-normal">
                      Arnold
                    </p>
                  </span>
                </label>

                <label className="label join-item cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    defaultChecked={render.maya}
                    name="maya"
                    className="peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-brand-700 bg-brand-800 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 transition-all peer-checked:border-brand-400 peer-checked:bg-brand-700 peer-checked:text-brand-300 peer-hover:border-brand-400">
                    <div className="h-5 w-5">
                      <MayaSVG />
                    </div>
                    <p className="text-md select-none pl-2 font-normal">Maya</p>
                  </span>
                </label>
                <label className="label join-item cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    defaultChecked={render.zbrush}
                    name="zbrush"
                    className="peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-brand-700 bg-brand-800 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 transition-all peer-checked:border-brand-400 peer-checked:bg-brand-700 peer-checked:text-brand-300 peer-hover:border-brand-400">
                    <div className="h-5 w-5">
                      <ZbrushSVG />
                    </div>
                    <p className="text-md select-none pl-2 font-normal">
                      ZBrush
                    </p>
                  </span>
                </label>
                <div className="join-vertical join"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <CldEditImgColWrapper render={render} />
        <div className="divider"></div>
        <div className="flex w-full flex-col justify-between gap-2 xs:flex-row">
          <Link
            href={"/edit"}
            className="btn mx-auto w-28 rounded-lg border-0 border-brand-600 bg-brand-600 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-rose-600 hover:bg-rose-950/80 hover:text-rose-500 xs:mx-0"
          >
            Cancel
          </Link>
          {/* The button to open modal */}

          {/* <button className="btn mx-auto w-48 rounded-lg border-0 border-brand-600 bg-brand-600 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-rose-600 hover:bg-rose-950 hover:text-rose-500 xs:mx-0">
            Delete Render
          </button> */}
          <FormSubmitButton className="btn mb-4 w-64 rounded-lg border-0 border-brand-600 bg-brand-600 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-accent-600 hover:bg-accent-950 hover:text-accent-500">
            Update Render
          </FormSubmitButton>
        </div>
      </form>
      <div className="mx-auto mt-8 max-w-xl rounded-lg border-2 border-rose-700 bg-rose-950/20 backdrop-blur-2xl">
        <h1 className="border-b-2 border-rose-700 py-2 text-center text-2xl font-bold text-brand-300">
          Danger Zone
        </h1>
        <div className="flex w-full justify-end px-4 py-4">
          <h1 className="pe-8 pt-2 text-lg">Permanently delete your render</h1>
          <label
            htmlFor="my_modal_6"
            className="btn mx-auto w-48 rounded-lg border-2 border-rose-700 bg-brand-600 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-rose-600 hover:bg-rose-950 hover:text-rose-500 xs:mx-0"
          >
            Delete Render
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal overflow-visible" role="dialog">
            <div className="z-100 modal-box absolute -top-96 border-2 border-rose-700">
              <h3 className="text-lg font-bold">Delete render?</h3>
              <p className="py-4">You cannot undo this action!</p>
              <div className="modal-action flex w-full justify-between">
                {/* <DeleteRenderButton id={id} /> */}
                <label
                  htmlFor="my_modal_6"
                  className="btn mx-auto w-32 rounded-lg border-0 border-brand-600 bg-brand-600 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-teal-600 hover:bg-teal-950/80 hover:text-teal-500 xs:mx-0"
                >
                  Nevermind
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
