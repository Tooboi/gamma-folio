import { prisma } from "@/lib/db/prisma";
import EditRenderCard from "@/components/Cards/EditRenderCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

// interface Props {
//   page?: string;
// }

export default async function EditRendersPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user?.email != process.env.ADMIN_EMAIL) {
    redirect("/unauthorized");
  }

  // Fetch renders from the database
  const renders = await prisma.render.findMany({
    orderBy: { createdAt: "desc" },
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
    </div>
  );
}
