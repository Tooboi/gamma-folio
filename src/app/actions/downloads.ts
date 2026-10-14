"use server";

import { prisma } from "@/lib/db/prisma";
import { assertAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";

function refresh() {
  revalidatePath("/downloads");
  revalidatePath("/manage-downloads");
}

export async function createDownload(formData: FormData) {
  await assertAdmin();
  const str = (key: string) => (formData.get(key)?.toString() ?? "").trim();

  const downloadUrl = str("downloadUrl");
  const imageName = str("imageName");
  const label = str("label");
  if (!downloadUrl || !imageName || !label) {
    throw new Error("A preview image, a file and a label are required");
  }

  await prisma.download.create({
    data: {
      downloadUrl,
      imageName,
      label,
      fileName: str("fileName") || null,
      buttonText: str("buttonText") || "Download",
      pValue: str("pValue"),
      mobile: formData.has("mobile"),
      downloads: 0,
    },
  });
  refresh();
}

export async function deleteDownload(formData: FormData) {
  await assertAdmin();
  const id = formData.get("id")?.toString();
  if (!id) throw new Error("ID is missing");
  await prisma.download.delete({ where: { id } });
  refresh();
}

/** Public: bumps the download counter when a visitor downloads a file. */
export async function countDownload(id: string) {
  try {
    await prisma.download.update({
      where: { id },
      data: { downloads: { increment: 1 } },
    });
  } catch {
    // Counting is best-effort; never block the download.
  }
}
