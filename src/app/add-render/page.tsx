import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CldUploadWrapper from "@/components/CldUploadWrapper";
import CldThumbWrapper from "@/components/CldThumbWrapper";
import CldImgColWrapper from "@/components/CldImgColWrapper";
import SubstanceSVG from "@/components/SVG/SubstanceSVG";
import BlenderSVG from "@/components/SVG/BlenderSVG";
import ArnoldSVG from "@/components/SVG/ArnoldSVG";
import MayaSVG from "@/components/SVG/MayaSVG";
import ZbrushSVG from "@/components/SVG/ZbrushSVG";
// import React, { useState } from "react";

export const metadata = {
  title: "Add Render - GAMMA2DOT2",
};

type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

async function addRender(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  const name = formData.get("name")?.toString();
  const caption = formData.get("caption")?.toString();
  const description = formData.get("description")?.toString();
  const thumbnail = formData.get("publicId")?.toString();
  const year = Number(formData.get("year") || 0);

  const blender = Boolean(formData.get("blender") || false);
  const zbrush = Boolean(formData.get("zbrush") || false);
  const substance = Boolean(formData.get("substance") || false);
  const maya = Boolean(formData.get("maya") || false);
  const arnold = Boolean(formData.get("arnold") || false);

  // Check if running on the client side before using localStorage
  const imageCollection = ["one", "two", "three", "four"];
  //   typeof window !== "undefined"
  //     ? JSON.parse(localStorage.getItem("uploadedPublicIds") || "[]")
  //     : [];

  // console.log("Stored Public IDs:", imageCollection);

  if (!name || !caption || !description || !thumbnail || !year) {
    throw Error("Missing required fields");
  }

  await prisma.render.create({
    data: {
      name,
      caption,
      description,
      thumbnail,
      imageCollection,
      year,
      blender,
      zbrush,
      substance,
      maya,
      arnold,
    },
  });

  redirect("/");
}

export default async function AddRenderPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // const [imageCollection, setImageCollection] = useState([]);

  if (user?.email != process.env.ADMIN_EMAIL) {
    redirect("/unathorized");
  }

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  // const [uploadedImages, setUploadedImages] = useState([]);

  // const handleUploadSuccess = (updatedPublicIds) => {
  //   // Update the state with the latest uploaded images
  //   setUploadedImages(updatedPublicIds);
  // };

  return (
    <div className="w-full">
      <form
        action={addRender}
        className="rounded-lg border-2 border-stone-700 p-2 px-4 backdrop-blur-2xl"
      >
        <h1 className="pb-3 text-center text-2xl font-bold text-stone-300">
          Add Render
        </h1>
        <div className="flex flex-row">
          <div className="">
            <CldThumbWrapper />
          </div>
          <div className="w-full pl-4">
            <input
              required
              name="name"
              placeholder="Name"
              className="input mb-3 w-full rounded-lg border-2 border-stone-700 bg-transparent backdrop-blur-sm placeholder:text-stone-600 focus-within:border-stone-500"
            />
            <input
              required
              name="caption"
              placeholder="Caption"
              className="input mb-3 w-full rounded-lg border-2 border-stone-700 bg-transparent backdrop-blur-sm placeholder:text-stone-600 focus-within:border-stone-500"
            />
            <textarea
              required
              name="description"
              placeholder="Description"
              className="textarea mb-3 w-full rounded-lg border-2 border-stone-700 bg-transparent backdrop-blur-sm placeholder:text-stone-600 focus-within:border-stone-500"
            />
            <input
              required
              name="year"
              placeholder="Year"
              type="number"
              className="input mb-3 w-full rounded-lg border-2 border-stone-700 bg-transparent backdrop-blur-sm placeholder:text-stone-600 focus-within:border-stone-500"
            />
            <div className="rounded-lg border-2 border-stone-700">
              <div className="text-md border-b-2 border-r-2 border-stone-700 bg-stone-700 pl-2 font-semibold text-stone-300/80">
                Software Used
              </div>
              <div className="flex w-full flex-wrap px-2">
                <label className="label join-item cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    name="blender"
                    className=" peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-stone-700 bg-stone-800 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 transition-all peer-checked:border-stone-400 peer-checked:bg-stone-700 peer-checked:text-stone-300 peer-hover:border-stone-400">
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
                    name="substance"
                    className="peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-stone-700 bg-stone-800 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 transition-all peer-checked:border-stone-400 peer-checked:bg-stone-700 peer-checked:text-stone-300 peer-hover:border-stone-400">
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
                    name="arnold"
                    className="peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-stone-700 bg-stone-800 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 transition-all peer-checked:border-stone-400 peer-checked:bg-stone-700 peer-checked:text-stone-300 peer-hover:border-stone-400">
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
                    name="maya"
                    className="peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-stone-700 bg-stone-800 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 transition-all peer-checked:border-stone-400 peer-checked:bg-stone-700 peer-checked:text-stone-300 peer-hover:border-stone-400">
                    <div className="h-5 w-5">
                      <MayaSVG />
                    </div>
                    <p className="text-md select-none pl-2 font-normal">Maya</p>
                  </span>
                </label>
                <label className="label join-item cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    name="zbrush"
                    className="peer checkbox hidden"
                  />
                  <span className="my-0.5 me-2 inline-flex items-center rounded border-2 border-stone-700 bg-stone-800 px-2.5 py-[0.18rem] text-xs font-medium text-stone-400 transition-all peer-checked:border-stone-400 peer-checked:bg-stone-700 peer-checked:text-stone-300 peer-hover:border-stone-400">
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

        <CldImgColWrapper />

        {/* <CldUploadWrapper onUploadSuccess={handleUploadSuccess} /> */}
        <FormSubmitButton className="btn-accent btn-block rounded-lg">
          Add Render
        </FormSubmitButton>
      </form>
    </div>
  );
}
