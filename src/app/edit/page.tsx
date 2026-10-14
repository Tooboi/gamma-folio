import { prisma } from "@/lib/db/prisma";
import Link from "next/link";
import EditRenderCard from "@/components/Cards/EditRenderCard";
import { requireAdmin } from "@/lib/admin";

export const metadata = {
  title: "GAMMA2DOT2 - Edit Renders",
};

export default async function EditRendersPage() {
  await requireAdmin("/edit");

  const renders = await prisma.render.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl pb-6 pt-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-300">
          Edit Renders{" "}
          <span className="text-base font-normal text-brand-500">
            ({renders.length})
          </span>
        </h1>
        <Link
          href="/add-render"
          className="btn rounded-lg border-0 bg-brand-600 text-brand-300 hover:border-2 hover:border-accent-600 hover:bg-accent-950 hover:text-accent-500"
        >
          + Add Render
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {renders.map((render) => (
          <EditRenderCard render={render} key={render.id} />
        ))}
      </div>
    </div>
  );
}
