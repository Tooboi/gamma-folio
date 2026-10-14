import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";

/** True when the signed-in user is the site admin. Safe to call from server actions. */
export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  return !!email && email === process.env.ADMIN_EMAIL;
}

/** Use at the top of admin pages: sends guests to sign in and non-admins away. */
export async function requireAdmin(callbackUrl = "/") {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  if (!session.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect("/unathorized");
  }
  return session;
}

/** Throws inside server actions when the caller is not the admin. */
export async function assertAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}
