import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add Render - GAMMA2DOT2",
};

async function addRender(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const year = Number(formData.get("year") || 0);

  if (!name || !description || !imageUrl || !year) {
    throw Error("Missing required fields");
  }

  //- Loop to add many
  // for (let i = 0; i < 50; i++) {
  //   await prisma.render.create({
  //     data: { name, description, imageUrl, year },
  //   });
  // }

  await prisma.render.create({
    data: { name, description, imageUrl, year },
  });

  redirect("/");
}

export default async function AddRenderPage() {
  const session = await getServerSession(authOptions);

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
          className="input-bordered input-secondary input mb-3 w-full rounded-lg"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-secondary textarea mb-3 w-full rounded-lg"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input-secondary input mb-3 w-full rounded-lg"
        />
        <input
          required
          name="year"
          placeholder="Year"
          type="number"
          className="input-bordered input-secondary input mb-3 w-full rounded-lg"
        />
        <FormSubmitButton className="btn-block rounded-lg">
          Add Render
        </FormSubmitButton>
      </form>
    </div>
  );
}
