"use client";

import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRightStartOnRectangleIcon,
  AdjustmentsHorizontalIcon,
  UserIcon,
  PencilSquareIcon,
  FilmIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="dropdown-end dropdown">
      <div role="button" tabIndex={0} className="btn-ghost btn-circle btn">
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
      </div>
      {user ? (
        <ul
          tabIndex={0}
          role="list"
          className="dropdown-content menu menu-sm z-30 mt-2 w-52 gap-2 rounded-lg border-2 border-brand-700 bg-brand-900 p-2 shadow"
        >
          <li className="group rounded-lg transition-all hover:bg-brand-800 active:bg-brand-900 active:ring-2 active:ring-inset active:ring-brand-700">
            <Link
              href="/add-render"
              className="z-30 flex items-center rounded-lg p-2 text-brand-300 transition group-hover:bg-brand-800 group-active:bg-brand-900"
              role="button"
            >
              <PhotoIcon className="h-6 w-6 text-brand-400 group-hover:text-brand-500" />
              <span className="ml-3 flex group-hover:text-brand-200">
                Add Render
              </span>
            </Link>
          </li>
          <li className="group rounded-lg transition-all hover:bg-brand-800 active:bg-brand-900 active:ring-2 active:ring-inset active:ring-brand-700">
            <Link
              href="/edit"
              className="z-30 flex items-center rounded-lg p-2 text-brand-300 transition group-hover:bg-brand-800 group-active:bg-brand-900"
              role="button"
            >
              <PencilSquareIcon className="h-6 w-6 text-brand-400 group-hover:text-brand-500" />
              <span className="ml-3 flex group-hover:text-brand-200">
                Edit Renders
              </span>
            </Link>
          </li>
          <li className="group rounded-lg transition-all hover:bg-brand-800 active:bg-brand-900 active:ring-2 active:ring-inset active:ring-brand-700">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text  flex w-full items-center rounded-lg p-2 text-brand-300 transition "
            >
              <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-brand-400 group-hover:text-brand-500" />

              <span className="ml-3 flex group-hover:text-brand-200">
                Sign Out
              </span>
            </button>
          </li>
        </ul>
      ) : (
        <ul
          tabIndex={0}
          role="list"
          className="dropdown-content menu menu-sm z-30 mt-2 w-52 rounded-lg border-2 border-brand-700 bg-brand-900 p-2 shadow "
        >
          <li className="group rounded-lg transition-all hover:bg-brand-800 active:bg-brand-900 active:ring-2 active:ring-inset active:ring-brand-700">
            <button
              onClick={() => signIn()}
              className="text flex w-full items-center rounded-lg p-2 text-brand-300 transition active:bg-brand-900 group-hover:bg-brand-800"
            >
              <UserIcon className="h-6 w-6 text-brand-400 group-hover:text-brand-500 " />

              <span className="ml-3 hidden group-hover:text-brand-200 md:flex">
                Sign In
              </span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
