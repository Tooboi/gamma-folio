"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import Link from "next/link";
import { useState } from "react";

export default function Remaining() {
  const [elapsed, setElapsed] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [timePerFrame, setTimePerFrame] = useState(0);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const remainingFrames = totalFrames - elapsed;
    const timeInSeconds = remainingFrames * timePerFrame;
    const timeInHours = timeInSeconds / 3600;
    setRemainingTime(timeInHours);
  };

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 pb-6 pt-4 transition-all  md:px-4 lg:px-10">
      <section className="relative rounded-lg border-2 border-stone-700 bg-stone-800">
        <Link
          href="/tools"
          className="absolute -left-[4rem] hidden rounded-md border-2 border-stone-600 bg-stone-800 p-2 transition-all hover:border-stone-500 hover:bg-stone-700 active:scale-95 active:border-stone-600 active:bg-stone-800 lg:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="stroke-stone-300"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </Link>
        <div className="mx-auto max-w-2xl px-4 py-8">
          <h2 className="mb-1 text-xl font-bold text-stone-300">
            Time Remaining
          </h2>
          <h2 className="text-md font-regular mb-6 text-stone-300">
            How much longer will my animation take to finish rendering
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Elapsed Frames</span>
                </div>
                <input
                  type="number"
                  name="elapsed"
                  id="elapsed"
                  placeholder="0"
                  className="input w-full max-w-xs rounded-lg border-2 border-emerald-600 bg-emerald-950/20"
                  onChange={(e) => setElapsed(Number(e.target.value))}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Total Frames</span>
                </div>
                <input
                  type="number"
                  name="totalFrames"
                  id="totalFrames"
                  placeholder="0"
                  className="input w-full max-w-xs rounded-lg border-2 border-emerald-600 bg-emerald-950/20"
                  onChange={(e) => setTotalFrames(Number(e.target.value))}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">
                    Average Time / Frame (seconds)
                  </span>
                </div>
                <input
                  type="number"
                  name="timePerFrame"
                  id="timePerFrame"
                  placeholder="In seconds"
                  className="input w-full max-w-xs rounded-lg border-2 border-emerald-600 bg-emerald-950/20"
                  onChange={(e) => setTimePerFrame(Number(e.target.value))}
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn-block btn mx-auto my-8 h-12 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-teal-600 hover:bg-teal-950 hover:text-teal-500"
            >
              Calculate
            </button>
          </form>

          {remainingTime !== null && (
            <div className="">
              <h3 className="text-lg font-semibold text-stone-300">
                Estimated Time Remaining: {remainingTime.toFixed(2)} hours
              </h3>
            </div>
          )}
        </div>
      </section>
      {/* <GoogleTagManager gtmId="GTM-KMB769RD" /> */}
    </div>
  );
}
