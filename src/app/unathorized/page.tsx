import Link from "next/link";

export default function UnAuthPage() {
  return (
    <div className="flex w-full justify-center">
      <div
        role="alert"
        className="text-semibold alert my-24 max-w-xl border-2 border-red-500 bg-red-950 text-lg text-red-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Not authorized - Only available to admins</span>
        <div>
          <Link
            href="/"
            className="btn-md btn rounded-lg border-2 border-red-500 bg-red-950 text-red-500 hover:border-red-400 hover:bg-red-800 hover:text-red-400 active:border-red-600 active:text-red-600"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
