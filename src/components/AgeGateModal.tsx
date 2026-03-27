"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AgeGateModal() {
  const [isOpen, setIsOpen] = useState(true); // 👈 start OPEN
  const [isReady, setIsReady] = useState(false); // prevent flicker
  const router = useRouter();

  useEffect(() => {
    const accepted = localStorage.getItem("age_verified");

    if (accepted) {
      setIsOpen(false);
    } else {
      document.body.style.overflow = "hidden";
    }

    setIsReady(true);
  }, []);

  const handleContinue = () => {
    localStorage.setItem("age_verified", "true");
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleExit = () => {
    router.push("https://www.gamma2dot2.com/renders");
  };

  // 👇 Prevent ANY render until we check localStorage
  if (!isReady) {
    return <div className="fixed inset-0 z-50 bg-black" />;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border-2 border-red-600 bg-brand-200 p-8 text-center shadow-xl">
        <h2 className="mb-4 text-2xl font-semibold text-brand-600">
          Age Restricted Content
        </h2>
        <p className="mb-6 text-gray-600">
          You must be 18 years or older to view this content.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleContinue}
            className="rounded-lg border-2 border-brand-600 bg-brand-700 px-5 py-2 text-lg font-medium text-brand-300 transition-all hover:border-sky-600 hover:bg-sky-950 hover:text-sky-500"
          >
            I am 18+
          </button>

          <button
            onClick={handleExit}
            className="rounded-lg border-2 border-red-600 bg-red-900 px-5 py-2 text-lg font-medium text-brand-300 transition-all hover:border-red-600 hover:bg-red-950 hover:text-red-500"
          >
            Take me back
          </button>
        </div>
      </div>
    </div>
  );
}
