"use client";

import { useState } from "react";
import { GoogleTagManager, sendGTMEvent } from "@next/third-parties/google";
import { sendGAEvent } from "@next/third-parties/google";

export default function BpmToFramesConverter() {
  const [bpm, setBpm] = useState(0);
  const [fps, setFps] = useState(0);
  const [framesPerBeat, setFramesPerBeat] = useState<number | null>(null);
  const [framesPerBar, setFramesPerBar] = useState<number | null>(null);
  const [timeSignature, setTimeSignature] = useState("4/4");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state

  const formatNumber = (num: number) => {
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (bpm <= 0 || fps <= 0) {
      setErrorMessage("BPM and FPS must be greater than 0.");
      setFramesPerBeat(null);
      setFramesPerBar(null);
      return;
    }

    const beatsPerBar = timeSignature === "3/4" ? 3 : 4;
    const secondsPerBeat = 60 / bpm;
    const framesBeat = fps * secondsPerBeat;
    const framesBar = framesBeat * beatsPerBar;

    setFramesPerBeat(framesBeat);
    setFramesPerBar(framesBar);
    setErrorMessage(null); // Clear any previous errors
  };

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 pb-6 pt-4 md:px-4 lg:px-10">
      <section className="rounded-lg border-2 border-stone-700 bg-stone-800">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <h2 className="mb-1 text-xl font-bold text-stone-300">
            BPM to Frames Converter
          </h2>
          <h2 className="text-md font-regular mb-6 text-stone-300">
            Convert Beats Per Minute (BPM) to Frames Per Second (FPS)
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Beats Per Minute (BPM)</span>
                </div>
                <input
                  type="number"
                  name="bpm"
                  id="bpm"
                  placeholder="0"
                  className="input w-full max-w-xs rounded-lg border-2 border-cyan-600 bg-cyan-950/20"
                  onChange={(e) => setBpm(Number(e.target.value))}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Frames Per Second (FPS)</span>
                </div>
                <input
                  type="number"
                  name="fps"
                  id="fps"
                  placeholder="0"
                  className="input w-full max-w-xs rounded-lg border-2 border-cyan-600 bg-cyan-950/20"
                  onChange={(e) => setFps(Number(e.target.value))}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Time Signature</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={timeSignature === "4/4" ? "font-bold" : ""}>
                    4/4
                  </span>
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={timeSignature === "3/4"}
                    onChange={() =>
                      setTimeSignature(timeSignature === "4/4" ? "3/4" : "4/4")
                    }
                  />
                  <span className={timeSignature === "3/4" ? "font-bold" : ""}>
                    3/4
                  </span>
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="btn-block btn mx-auto my-8 h-12 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-sky-600 hover:bg-sky-950 hover:text-sky-500"
              onSubmit={() => {
                sendGAEvent("event", "buttonClicked", { value: "BPM to FPS" });
                sendGTMEvent({ event: "buttonClicked", value: "BPM to FPS" });
              }}
            >
              Calculate
            </button>

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-4 text-lg font-semibold text-red-500">
                {errorMessage}
              </div>
            )}
          </form>

          {/* Displaying calculated values */}
          {framesPerBeat !== null && framesPerBar !== null && !errorMessage && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-stone-300">
                Frames Per Beat:{" "}
                <strong className="text-cyan-500">
                  {formatNumber(framesPerBeat)}
                </strong>
              </h3>
              <h3 className="text-lg font-semibold text-stone-300">
                Frames Per Bar:{" "}
                <strong className="text-cyan-500">
                  {formatNumber(framesPerBar)}
                </strong>
              </h3>
              <h3 className="text-lg font-semibold text-stone-300">
                Frames Per 4 Bars:{" "}
                <strong className="text-cyan-500">
                  {formatNumber(framesPerBar * 4)}
                </strong>
              </h3>
            </div>
          )}
        </div>
      </section>
      <GoogleTagManager gtmId="GTM-KMB769RD" />
    </div>
  );
}
