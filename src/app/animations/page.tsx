import { YouTubeEmbed } from "@next/third-parties/google";

export const metadata = {
  title: "GAMMA2DOT2 - Animations",
  caption: "Gamma 2.2 - Josh Pica",
};

export default function Animations() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl ">Animations & Reels</h1>
      <div className="mt-6 hidden h-auto overflow-hidden rounded-xl border-2 border-brand-600 md:block">
        <YouTubeEmbed
          videoid="q5Tu5aOQK3s"
          height={405}
          width={720}
          params="controls=1&widget_referrer&start=12"
        />
        <div className="border-t-2 border-brand-600 bg-brand-800">
          <h1 className="select-none py-1 text-center text-lg text-brand-400">
            VJ Demo Reel 2022
          </h1>
        </div>
      </div>
      <div className="mt-6 block h-auto overflow-hidden rounded-xl border-2 border-brand-600 md:hidden">
        <YouTubeEmbed
          videoid="q5Tu5aOQK3s"
          height={202.5}
          width={360}
          params="controls=1&widget_referrer&start=12"
        />
        <div className="border-t-2 border-brand-600 bg-brand-800">
          <h1 className="select-none py-1 text-center text-lg text-brand-400">
            VJ Demo Reel 2022
          </h1>
        </div>
      </div>
      <div className="mt-6 hidden h-auto overflow-hidden rounded-xl border-2 border-brand-600 md:block">
        <YouTubeEmbed
          videoid="fO186W4wKbQ"
          height={405}
          width={720}
          params="controls=1&widget_referrer"
        />
        <div className="border-t-2 border-brand-600 bg-brand-800">
          <h1 className="select-none py-1 text-center text-lg text-brand-400">
            Kylee & Their Blob
          </h1>
        </div>
      </div>
      <div className="mt-6 block h-auto overflow-hidden rounded-xl border-2 border-brand-600 md:hidden">
        <YouTubeEmbed
          videoid="fO186W4wKbQ"
          height={202.5}
          width={360}
          params="controls=1&widget_referrer&start=12"
        />
        <div className="border-t-2 border-brand-600 bg-brand-800">
          <h1 className="select-none py-1 text-center text-lg text-brand-400">
            Kylee & Their Blob
          </h1>
        </div>
      </div>
    </div>
  );
}
