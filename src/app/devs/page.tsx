import { prisma } from "@/lib/db/prisma";
import DevCard from "@/components/Cards/DevCard";
import { GoogleTagManager } from "@next/third-parties/google";

interface HomeProps {
    searchParams: { page: string };
  }

  export const metadata = {
    title: "GAMMA2DOT2 - Devs",
    caption: "Gamma 2.2 - Josh Pica",
  };

export default async function Dev() {
    const devs = await prisma.devProject.findMany({
        orderBy: { createdAt: "desc" }
      });

      // console.log("Devs:", devs);
      

  return <div className="flex flex-col items-center">
  <div className="max-w-8xl mx-auto min-h-screen pb-6 pt-4 md:px-4 lg:px-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
      {devs.map((dev) => (
        <DevCard dev={dev} key={dev.id} />
      ))}
    </div>
  </div>
  {/* <GoogleTagManager gtmId="GTM-KMB769RD" /> */}
</div>;
}
