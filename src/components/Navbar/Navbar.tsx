import logo from "@/assets/logo.png";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import UserMenuButton from "./UserMenuButton";
import Tabs from "./Tabs";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-transparent">
      <div className="navbar m-auto max-w-7xl flex-row gap-2">
        <div className="flex-1">
          <Link
            href="/"
            className="btn-ghost btn text-3xl mx-auto xs:mx-0 normal-case hover:bg-transparent tracking-widest xs:tracking-wide"
          >
            {/* <Image src={logo} height={40} width={40} alt="GAMMA2DOT2" /> */}
            GAMMA2DOT2
          </Link>
        </div>
        <div className=" hidden lg:flex">
          <Tabs />
        </div>
        <div className="flex-none gap-2 hidden xs:flex">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input placeholder-stone-500 h-[2.5rem] w-full min-w-[100px] border-2 border-stone-800 bg-transparent backdrop-blur-sm "
              />
            </div>
          </form>
          {/* <UserMenuButton session={session} /> */}
        </div>
      </div>
    </div>
  );
}
