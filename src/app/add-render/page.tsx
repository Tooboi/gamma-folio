import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CldUploadWrapper from "@/components/CldUploadWrapper";
import React, { useState } from "react";

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
  const thumbnail = formData.get("thumbnail")?.toString();
  const year = Number(formData.get("year") || 0);

  const blender = Boolean(formData.get("blender") || false);
  const zbrush = Boolean(formData.get("zbrush") || false);
  const substance = Boolean(formData.get("substance") || false);
  const maya = Boolean(formData.get("maya") || false);
  const arnold = Boolean(formData.get("arnold") || false);

  // Check if running on the client side before using localStorage
  const imageCollection =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("uploadedPublicIds") || "[]")
      : [];

  console.log("Stored Public IDs:", imageCollection);

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

  if (user?.email != process.env.ADMIN_EMAIL) {
    redirect("/unathorized");
  }

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Render</h1>
      <form action={addRender}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input-secondary input mb-3 w-full rounded-lg bg-transparent backdrop-blur-sm"
        />
        <input
          required
          name="caption"
          placeholder="Caption"
          className="input-bordered input-secondary input mb-3 w-full rounded-lg bg-transparent backdrop-blur-sm"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-secondary textarea mb-3 w-full rounded-lg bg-transparent backdrop-blur-sm"
        />
        <input
          required
          name="thumbnail"
          placeholder="Thumbnail"
          type="url"
          className="input-bordered input-secondary input mb-3 w-full rounded-lg bg-transparent backdrop-blur-sm"
        />
        <input
          required
          name="year"
          placeholder="Year"
          type="number"
          className="input-bordered input-secondary input mb-3 w-full rounded-lg bg-transparent backdrop-blur-sm"
        />
        <div className="join join-horizontal">
          <div className="join join-vertical">
            <label className="label join-item cursor-pointer">
              <span className="label-text pr-4">Blender</span>
              <input
                type="checkbox"
                name="blender"
                className="checkbox-accent checkbox mx-4 px-4"
              />
            </label>
            <label className="label join-item cursor-pointer">
              <span className="label-text">Substance</span>
              <input
                type="checkbox"
                name="substance"
                className="checkbox-accent checkbox mx-4 px-4"
              />
            </label>
            <label className="label join-item cursor-pointer">
              <span className="label-text pr-4">Arnold</span>
              <input
                type="checkbox"
                name="arnold"
                className="checkbox-accent checkbox mx-4 px-4"
              />
            </label>
          </div>
          <div className="join join-vertical">
            <label className="label join-item cursor-pointer">
              <span className="label-text pr-4">Maya</span>
              <input
                type="checkbox"
                name="maya"
                className="checkbox-accent checkbox mx-4 px-4"
              />
            </label>
            <label className="label join-item cursor-pointer">
              <span className="label-text">Zbrush</span>
              <input
                type="checkbox"
                name="zbrush"
                className="checkbox-accent checkbox mx-4 px-4"
              />
            </label>
          </div>
          <div className="join join-vertical"></div>
        </div>
        <CldUploadWrapper />
        <FormSubmitButton className="btn-accent btn-block rounded-lg">
          Add Render
        </FormSubmitButton>
      </form>
    </div>
  );
}
