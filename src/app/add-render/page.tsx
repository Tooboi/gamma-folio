import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { google } from "googleapis";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Render - GAMMA2DOT2",
};

async function addRender(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const year = Number(formData.get("year") || 0);

  if (!name || !description || !imageUrl || !year) {
    throw Error("Missing required fields");
  }

  await prisma.render.create({
    data: { name, description, imageUrl, year },
  });

  redirect("/");
}

// const oauth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// const drive = google.drive({
//   version: "v3",
//   auth: oauth2Client,
// });

// async function uploadFile() {
//   try {
//     const response = await drive.files.create({
//       requestBody: {

//       }
//     })
//   } catch (error) {
    
//   }
// }

export default function AddRenderPage() {
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
