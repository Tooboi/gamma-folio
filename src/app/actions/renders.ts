"use server";

import { prisma } from "@/lib/db/prisma";
import { assertAdmin } from "@/lib/admin";
import { parseRenderForm } from "@/lib/renderFields";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRender(formData: FormData) {
  await assertAdmin();
  const data = parseRenderForm(formData);
  const render = await prisma.render.create({ data });
  revalidatePath("/", "layout");
  redirect(`/renders/${render.id}`);
}

export async function updateRender(formData: FormData) {
  await assertAdmin();
  const id = formData.get("id")?.toString();
  if (!id) throw new Error("ID is missing");
  const data = parseRenderForm(formData);
  await prisma.render.update({ where: { id }, data });
  revalidatePath("/", "layout");
  redirect("/edit");
}

export async function deleteRender(formData: FormData) {
  await assertAdmin();
  const id = formData.get("id")?.toString();
  if (!id) throw new Error("ID is missing");
  await prisma.render.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/edit");
}
