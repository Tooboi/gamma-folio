import { prisma } from "@/lib/db/prisma";
import EditRenderCard from "@/components/Cards/EditRenderCard";
import PaginationBar from "@/components/PaginationBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface Props {
  page?: string;
}

export default async function EditRendersPage({ page }: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user?.email != process.env.ADMIN_EMAIL) {
    redirect("/unathorized");
  }
  const currentPage = parseInt("1"); // Default to page 1 if page is not defined
  const pageSize = 24;
  const heroItemCount = 0;

  const totalItemCount = await prisma.render.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const renders = await prisma.render.findMany({
    orderBy: { createdAt: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-8xl mx-auto min-h-screen pb-6 pt-4 ">
        <div className="flex flex-col gap-4">
          {renders.map((render) => (
            <EditRenderCard render={render} key={render.id} />
          ))}
        </div>
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
