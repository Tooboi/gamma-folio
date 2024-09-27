"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { useState } from "react";

export default function RatioCalculator() {
  const [A, setA] = useState<number | null>(null);
  const [B, setB] = useState<number | null>(null);
  const [C, setC] = useState<number | null>(null);
  const [D, setD] = useState<number | null>(null);
  const [calculated, setCalculated] = useState<{
    A: number;
    B: number;
    C: number;
    D: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatNumber = (num: number) => {
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check how many fields are missing
    const filledInputs = [A, B, C, D].filter((value) => value !== null).length;

    if (filledInputs !== 3) {
      setErrorMessage("Please fill any combo of 3");
      setCalculated(null);
      return;
    }

    let result = { A: A ?? 0, B: B ?? 0, C: C ?? 0, D: D ?? 0 };

    if (A === null) {
      result.A = (B! * C!) / D!;
    } else if (B === null) {
      result.B = (A! * D!) / C!;
    } else if (C === null) {
      result.C = (A! * D!) / B!;
    } else if (D === null) {
      result.D = (B! * C!) / A!;
    }

    setErrorMessage(null); // Clear any previous error
    setCalculated(result);
  };

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 pb-6 pt-4 transition-all md:px-4 lg:px-10">
      <section className="rounded-lg border-2 border-stone-700 bg-stone-800">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <h2 className="mb-1 text-xl font-bold text-stone-300">
            Ratio Calculator
          </h2>
          <h2 className="text-md font-regular mb-6 text-stone-300">
            A : B = C : D
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-11 sm:gap-6">
              <label className="form-control col-span-2 w-full max-w-xs">
                <div className="label">
                  <span className="label-text">A</span>
                </div>
                <input
                  type="number"
                  name="A"
                  id="A"
                  placeholder="0"
                  className="input w-full max-w-xs rounded-lg border-2 border-sky-600 bg-sky-950/20"
                  onChange={(e) =>
                    setA(e.target.value ? Number(e.target.value) : null)
                  }
                />
              </label>
              <h1 className="col-span-1 mt-11 hidden text-center text-xl font-black sm:block">
                :
              </h1>
              <label className="form-control col-span-2 w-full max-w-xs">
                <div className="label">
                  <span className="label-text">B</span>
                </div>
                <input
                  type="number"
                  name="B"
                  id="B"
                  placeholder="0"
                  className="input w-full max-w-xs rounded-lg border-2 border-sky-600 bg-sky-950/20"
                  onChange={(e) =>
                    setB(e.target.value ? Number(e.target.value) : null)
                  }
                />
              </label>
              <h1 className="col-span-1 mt-11 hidden text-center text-xl font-black sm:block">
                =
              </h1>
              <label className="form-control col-span-2 w-full max-w-xs">
                <div className="label">
                  <span className="label-text">C</span>
                </div>
                <input
                  type="number"
                  name="C"
                  id="C"
                  placeholder="0"
                  className="input w-full max-w-xs rounded-lg border-2 border-sky-600 bg-sky-950/20"
                  onChange={(e) =>
                    setC(e.target.value ? Number(e.target.value) : null)
                  }
                />
              </label>
              <h1 className="col-span-1 mt-11 hidden text-center text-xl font-black sm:block">
                :
              </h1>
              <label className="form-control col-span-2 w-full max-w-xs">
                <div className="label">
                  <span className="label-text">D</span>
                </div>
                <input
                  type="number"
                  name="D"
                  id="D"
                  placeholder="0"
                  className="input w-full max-w-xs rounded-lg border-2 border-sky-600 bg-sky-950/20"
                  onChange={(e) =>
                    setD(e.target.value ? Number(e.target.value) : null)
                  }
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn-block btn mx-auto my-8 h-12 justify-center rounded-lg border-2 border-brand-600 bg-brand-700 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-blue-700 hover:bg-blue-950/50 hover:text-blue-500"
            >
              Calculate
            </button>
          </form>

          {errorMessage && (
            <div className="text-lg font-semibold text-red-500">
              {errorMessage}
            </div>
          )}

          {calculated && !errorMessage && (
            <div className="">
              <h3 className="text-lg font-semibold text-stone-300">
                Calculated Results:
              </h3>
              <p className="text-stone-300 text-xl">
                {A === null ? (
                  <strong className="text-sky-400">{formatNumber(calculated.A)}</strong>
                ) : (
                  formatNumber(calculated.A)
                )}{" "}
                :{" "}
                {B === null ? (
                  <strong className="text-sky-400">{formatNumber(calculated.B)}</strong>
                ) : (
                  formatNumber(calculated.B)
                )}{" "}
                ={" "}
                {C === null ? (
                  <strong className="text-sky-400">{formatNumber(calculated.C)}</strong>
                ) : (
                  formatNumber(calculated.C)
                )}{" "}
                :{" "}
                {D === null ? (
                  <strong className="text-sky-400">{formatNumber(calculated.D)}</strong>
                ) : (
                  formatNumber(calculated.D)
                )}
              </p>
            </div>
          )}
        </div>
      </section>
      {/* <GoogleTagManager gtmId="GTM-KMB769RD" /> */}
    </div>
  );
}
