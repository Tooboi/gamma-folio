"use client";

import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle btn">
        {user ? (
          <Image
            src={
              user?.image ||
              "https://source.boringavatars.com/marble/40/Maria%20Mitchell"
            }
            alt="Profile picture"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 p-2 "
      >
        <li>
          {user ? (
            <div className="hover:bg-transparent hover:cursor-default">
              <button className="btn-ghost btn-sm btn" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
              </button>
              {/* ADD RENDER BUTTON NOT WORKING */}
              {/* <Link href="/add-render" className="btn-accent btn-sm btn">
                Add Render
              </Link> */}
            </div>
          ) : (
            <button className="btn-acc btn-sm btn" onClick={() => signIn()}>Sign In</button>
          )}
        </li>
      </ul>
    </div>
  );
}
