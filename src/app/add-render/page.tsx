import FormSubmitButton from "@/components/FormSubmitButton";
import RenderFormFields from "@/components/Admin/RenderFormFields";
import { createRender } from "@/app/actions/renders";
import { requireAdmin } from "@/lib/admin";

export const metadata = {
  title: "Add Render - GAMMA2DOT2",
};

export default async function AddRenderPage() {
  await requireAdmin("/add-render");

  return (
    <div className="w-full">
      <form
        action={createRender}
        className="rounded-lg border-2 border-brand-700 p-2 px-4 backdrop-blur-2xl"
      >
        <h1 className="pb-3 text-center text-2xl font-bold text-brand-300">
          Add Render
        </h1>
        <RenderFormFields />
        <div className="divider"></div>
        <FormSubmitButton className="btn-block mx-auto mb-4 justify-center rounded-lg border-0 border-brand-600 bg-brand-600 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-accent-600 hover:bg-accent-950 hover:text-accent-500">
          Create New Render
        </FormSubmitButton>
      </form>
    </div>
  );
}
