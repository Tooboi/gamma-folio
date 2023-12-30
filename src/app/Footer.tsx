"use client";
import Artstation from "@/assets/artstation.svg";
import Insta from "@/assets/insta.svg";
import Linked from "@/assets/linked.svg";
import Github from "@/assets/github.svg";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="static bottom-0 flex w-full justify-between px-8 pb-4">
      <div className="h-full">
        <p className="mt-3 select-none text-stone-700">© All Rights Reserved</p>
      </div>
      <div onClick={scrollToTop}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8 stroke-stone-600 hover:animate-pulse"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
          />
        </svg>
      </div>
    </div>
  );
}
