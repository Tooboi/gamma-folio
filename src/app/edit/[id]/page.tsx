import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import Link from "next/link";
import FormSubmitButton from "@/components/FormSubmitButton";
import RenderFormFields from "@/components/Admin/RenderFormFields";
import ConfirmDeleteButton from "@/components/Admin/ConfirmDeleteButton";
import { deleteRender, updateRender } from "@/app/actions/renders";
import { requireAdmin } from "@/lib/admin";

interface EditPageProps {
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
}: EditPageProps): Promise<Metadata> {
  const render = await getRender(id);
  return { title: `Edit ${render.name} - GAMMA2DOT2` };
}

export default async function EditPage({ params: { id } }: EditPageProps) {
  await requireAdmin(`/edit/${id}`);
  const render = await getRender(id);

  return (
    <div className="w-full">
      <form
        action={updateRender}
        className="rounded-lg border-2 border-brand-700 p-2 px-4 backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between pb-3">
          <Link href="/edit" className="text-sm text-brand-500 hover:text-brand-300">
            ← All renders
          </Link>
          <h1 className="text-center text-2xl font-bold text-brand-300">
            Edit Render
          </h1>
          <Link
            href={`/renders/${render.id}`}
            target="_blank"
            className="text-sm text-brand-500 hover:text-brand-300"
          >
            View live ↗
          </Link>
        </div>
        <input type="hidden" name="id" value={render.id} />
        <RenderFormFields render={render} />
        <div className="divider"></div>
        <div className="flex w-full flex-col justify-between gap-2 xs:flex-row">
          <Link
            href="/edit"
            className="btn mx-auto w-28 rounded-lg border-0 border-brand-600 bg-brand-600 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-rose-600 hover:bg-rose-950/80 hover:text-rose-500 xs:mx-0"
          >
            Cancel
          </Link>
          <FormSubmitButton className="mb-4 w-64 rounded-lg border-0 border-brand-600 bg-brand-600 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-accent-600 hover:bg-accent-950 hover:text-accent-500">
            Update Render
          </FormSubmitButton>
        </div>
      </form>

      <div className="mx-auto mt-8 max-w-xl rounded-lg border-2 border-rose-700 bg-rose-950/20">
        <h2 className="border-b-2 border-rose-700 py-2 text-center text-2xl font-bold text-brand-300">
          Danger Zone
        </h2>
        <div className="flex w-full flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row">
          <p className="text-lg">Permanently delete this render</p>
          <ConfirmDeleteButton
            id={render.id}
            action={deleteRender}
            label="Delete Render"
            title={`Delete "${render.name}"?`}
          />
        </div>
      </div>
    </div>
  );
}
