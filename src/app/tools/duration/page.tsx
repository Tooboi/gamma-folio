"use client";

import { useState } from "react";

export default function AnimationCalculator() {
  const [totalFrames, setTotalFrames] = useState<number | "">(0);
  const [framesPerSecond, setFramesPerSecond] = useState<number | "">(0);
  const [totalMinutes, setTotalMinutes] = useState<number | "">(0);
  const [totalSeconds, setTotalSeconds] = useState<number | "">(0);
  const [result, setResult] = useState<{ minutes?: number; seconds?: number; frames?: number } | null>(null);
  const [mode, setMode] = useState<"calculateTime" | "calculateFrames">("calculateTime");

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "calculateTime" && totalFrames && framesPerSecond) {
      // Calculate total time from frames
      const totalSeconds = totalFrames / framesPerSecond;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.floor(totalSeconds % 60);
      setResult({ minutes, seconds });
    } else if (mode === "calculateFrames" && totalMinutes && totalSeconds && framesPerSecond) {
      // Calculate total frames from time
      const totalTimeInSeconds = totalMinutes * 60 + totalSeconds;
      const frames = totalTimeInSeconds * framesPerSecond;
      setResult({ frames });
    }
  };

  const handleModeChange = (newMode: "calculateTime" | "calculateFrames") => {
    setMode(newMode);
    setResult(null); // Clear result when switching modes
  };

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 pb-6 pt-4 transition-all md:px-4 lg:px-10 lg:pt-16">
      <section className="rounded-lg border-2 border-stone-700 bg-stone-800">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <h2 className="mb-1 text-xl font-bold text-stone-300">
            Animation Duration & Frame Calculator
          </h2>
          <h2 className="text-md font-regular mb-6 text-stone-300">
            Calculate animation duration or total frames based on total time
          </h2>

          <div className="mb-4 flex">
            <button
              className={`btn mr-2 ${mode === "calculateTime" ? "btn rounded-lg border-2 border-teal-600 bg-teal-950 text-lg font-medium text-teal-500 transition-all hover:border-2 hover:border-teal-500 hover:bg-teal-800 hover:text-brand-300" : "btn rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-teal-600 hover:bg-teal-950 hover:text-teal-500"}`}
              onClick={() => handleModeChange("calculateTime")}
            >
              Total Time
            </button>
            <button
              className={`btn ${mode === "calculateFrames" ? "btn rounded-lg border-2 border-cyan-600 bg-cyan-950 text-lg font-medium text-cyan-500 transition-all hover:border-2 hover:border-cyan-500 hover:bg-cyan-800 hover:text-brand-300" : "btn rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-cyan-600 hover:bg-cyan-950 hover:text-cyan-500"}`}
              onClick={() => handleModeChange("calculateFrames")}
            >
              Total Frames
            </button>
          </div>

          <form onSubmit={handleCalculate}>
            {mode === "calculateTime" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Total Frames</span>
                    </div>
                    <input
                      type="number"
                      name="totalFrames"
                      id="totalFrames"
                      placeholder="0"
                      className="input w-full max-w-xs rounded-lg border-2 border-teal-600 bg-teal-950/20"
                      onChange={(e) => setTotalFrames(Number(e.target.value))}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Frames Per Second</span>
                    </div>
                    <input
                      type="number"
                      name="framesPerSecond"
                      id="framesPerSecondTime"
                      placeholder="In FPS"
                      className="input w-full max-w-xs rounded-lg border-2 border-teal-600 bg-teal-950/20"
                      onChange={(e) => setFramesPerSecond(Number(e.target.value))}
                    />
                  </label>
                </div>
              </>
            )}

            {mode === "calculateFrames" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Total Minutes</span>
                    </div>
                    <input
                      type="number"
                      name="totalMinutes"
                      id="totalMinutes"
                      placeholder="0"
                      className="input w-full max-w-xs rounded-lg border-2 border-teal-600 bg-teal-950/20"
                      onChange={(e) => setTotalMinutes(Number(e.target.value))}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Total Seconds</span>
                    </div>
                    <input
                      type="number"
                      name="totalSeconds"
                      id="totalSeconds"
                      placeholder="0"
                      className="input w-full max-w-xs rounded-lg border-2 border-teal-600 bg-teal-950/20"
                      onChange={(e) => setTotalSeconds(Number(e.target.value))}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Frames Per Second</span>
                    </div>
                    <input
                      type="number"
                      name="framesPerSecond"
                      id="framesPerSecondFrames"
                      placeholder="In FPS"
                      className="input w-full max-w-xs rounded-lg border-2 border-teal-600 bg-teal-950/20"
                      onChange={(e) => setFramesPerSecond(Number(e.target.value))}
                    />
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn-block btn mx-auto my-8 h-12 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-cyan-600 hover:bg-cyan-950 hover:text-cyan-500"
            >
              Calculate
            </button>
          </form>

          {result !== null && (
            <div className="mt-6">
              {mode === "calculateTime" && (
                <h3 className="text-lg font-semibold text-stone-300">
                  Total Animation Duration: {result.minutes} minutes and{" "}
                  {result.seconds} seconds
                </h3>
              )}
              {mode === "calculateFrames" && (
                <h3 className="text-lg font-semibold text-stone-300">
                  Total Frames: {result.frames}
                </h3>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
