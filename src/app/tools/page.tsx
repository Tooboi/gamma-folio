// import { Link } from "react-router-dom";

import Link from "next/link";

export const metadata = {
  title: "GAMMA2DOT2 - Tools",
  caption: "Gamma 2.2 - Josh Pica",
};

const Home = () => {
  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 pb-6 pt-4 md:px-4 lg:px-10 lg:pt-8">
      {/* <h1 className="text-center text-3xl select-none tracking-tight font-semibold text-stone-400 pb-8 sm:hidden">RenderLogic</h1> */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Link href="tools/remaining" className="w-full">
            <div className="group h-36 rounded-lg border-2 border-emerald-800 bg-emerald-950 transition hover:bg-emerald-900 active:border-emerald-900 active:bg-emerald-950">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fdeded"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="mx-auto mt-4 stroke-emerald-500"
              >
                <path d="M10 2h4" />
                <path d="M12 14v-4" />
                <path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" />
                <path d="M9 17H4v5" />
              </svg>
              <div className="w-full pt-1 text-center text-xl font-semibold text-emerald-300 group-hover:text-emerald-200">
                Time Remaining
              </div>
              <div className="font-regular w-full pt-0 text-center text-sm text-emerald-500">
                How much longer will my animation take
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link href="tools/duration" className="w-full">
            <div className="group h-36 rounded-lg border-2 border-teal-800 bg-teal-950 transition hover:bg-teal-900 active:border-teal-900 active:bg-teal-950">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fdeded"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="mx-auto mt-4 stroke-teal-500"
              >
                <line x1="10" x2="14" y1="2" y2="2" />
                <line x1="12" x2="15" y1="14" y2="11" />
                <circle cx="12" cy="14" r="8" />
              </svg>
              <div className="w-full pt-1 text-center text-xl font-semibold text-teal-300 group-hover:text-teal-200">
                Animation Duration
              </div>
              <div className="font-regular w-full truncate pt-0 text-center text-sm text-teal-500">
                How long will my animation be
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link href="tools/bpm" className="w-full">
            <div className="group h-36 rounded-lg border-2 border-cyan-800 bg-cyan-950 transition hover:bg-cyan-900 active:border-cyan-900 active:bg-cyan-950">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fdeded"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="mx-auto mt-4 stroke-cyan-500"
              >
                <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />
              </svg>
              <div className="w-full pt-1 text-center text-xl font-semibold text-cyan-300 group-hover:text-cyan-200">
                BPM to FPS
              </div>
              <div className="font-regular w-full pt-0 text-center text-sm text-cyan-500">
                Converts BPM to FPS
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link href="tools/ratio" className="w-full">
            <div className="group h-36 rounded-lg border-2 border-sky-800 bg-sky-950 transition hover:bg-sky-900 active:border-sky-900 active:bg-sky-950">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e3e3e3"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="mx-auto mt-4 stroke-sky-500"
              >
                <path d="M16 12h6" />
                <path d="M8 12H2" />
                <path d="M12 2v2" />
                <path d="M12 8v2" />
                <path d="M12 14v2" />
                <path d="M12 20v2" />
                <path d="m19 15 3-3-3-3" />
                <path d="m5 9-3 3 3 3" />
              </svg>
              <div className="w-full pt-1 text-center text-xl font-semibold text-sky-300 group-hover:text-sky-200">
                Ratio Calculator
              </div>
              <div className="font-regular w-full pt-0 text-center text-sm text-sky-500">
                A : B = C : D
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
