import MayaSVG from "@/components/SVG/MayaSVG";
import ArnoldSVG from "@/components/SVG/ArnoldSVG";
import ZbrushSVG from "@/components/SVG/ZbrushSVG";
import BlenderSVG from "@/components/SVG/BlenderSVG";
import SubstanceSVG from "@/components/SVG/SubstanceSVG";
import OctaneSVG from "@/components/SVG/OctaneSVG";
import DesignerSVG from "@/components/SVG/DesignerSVG";
import TouchdesignerSVG from "@/components/SVG/TouchdesignerSVG";
import ResolumeSVG from "@/components/SVG/ResolumeSVG";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata = {
  title: "GAMMA2DOT2 - About Me",
  caption: "Gamma 2.2 - Josh Pica",
};

export default function About() {
  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 pb-6 pt-6 md:px-4 lg:px-10">
      <h1 className="select-none py-3 text-center text-2xl tracking-tight text-brand-400">
        Hey I&apos;m Josh Pica :)
      </h1>
      <h1 className="select-none py-3 text-center text-[1.3rem] tracking-tight text-brand-400">
        I am a passionate 3D artist who loves to create original and visually
        captivating content through the world of computer-generated art.
      </h1>
      <h1 className="select-none py-3 text-center text-[1.3rem] tracking-tight text-brand-400">
        Ever since I was young, I have been fascinated by the boundless
        possibilities of digital art. With a deep-rooted love for both
        technology and creativity, I found my true calling in the realm of 3D
        art. Through meticulous attention to detail and a keen eye for
        aesthetics, I strive to push the boundaries of imagination and bring my
        artistic visions to life.
      </h1>
      <h1 className="select-none py-3 text-center text-[1.3rem] tracking-tight text-brand-400">
        I believe that art has the power to transcend boundaries and connect
        people from all walks of life. My ultimate goal is to inspire, provoke
        thought, and create experiences that leave a lasting impact on viewers.
        Through my passion for 3D art, I aspire to contribute to the
        ever-evolving landscape of digital creativity and make a meaningful
        difference in the world.
      </h1>
      <h1 className="select-none py-3 text-center text-[1.3rem] tracking-tight text-brand-400">
        Over the past few years my love for web development has grown. I am
        always trying to keep up to date with recent technologies and improve on
        my JS development skills.
      </h1>
      <h1 className="select-none py-3 text-center text-2xl tracking-tight text-brand-400">
        Inspired by the world around me
      </h1>
      <h1 className="select-none py-3 text-center text-2xl tracking-tight text-brand-400">
        Learning everyday
      </h1>
      <div className="mx-auto max-w-lg rounded-lg border-2 border-accent-800 bg-accent-950">
        <h1 className="select-none py-3 text-center text-lg tracking-tight text-brand-400 sm:text-2xl">
          Contact me at:
        </h1>
        <h1 className="select-none pb-3 text-center text-lg tracking-tight text-brand-400 sm:text-2xl">
          gamma2dot2@gmail.com
        </h1>
      </div>

      <div className="pt-8">
        <div className="flex flex-wrap justify-center">
          <span className="my-0.5 me-2 inline-flex items-center rounded border border-brand-500 bg-brand-700 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 ">
            <div className="h-5 w-5">
              <MayaSVG />
            </div>
            <p className="text-md select-none pl-2 font-normal">Maya</p>
          </span>
          <span className="my-0.5 me-2 inline-flex items-center rounded border border-brand-500 bg-brand-700 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 ">
            <div className="h-5 w-5">
              <ArnoldSVG />
            </div>
            <p className="text-md select-none pl-2 font-normal">Arnold</p>
          </span>
          <span className="my-0.5 me-2 inline-flex items-center rounded border border-brand-500 bg-brand-700 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 ">
            <div className="h-5 w-5">
              <BlenderSVG />
            </div>
            <p className="text-md select-none pl-2 font-normal">Blender</p>
          </span>
          <span className="my-0.5 me-2 inline-flex items-center rounded border border-brand-500 bg-brand-700 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 ">
            <div className="h-5 w-5">
              <OctaneSVG />
            </div>
            <p className="text-md select-none pl-2 font-normal">Octane</p>
          </span>
          <span className="my-0.5 me-2 inline-flex items-center rounded border border-brand-500 bg-brand-700 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 ">
            <div className="h-5 w-5">
              <ZbrushSVG />
            </div>
            <p className="text-md select-none pl-2 font-normal">ZBrush</p>
          </span>
          <span className="my-0.5 me-2 inline-flex items-center rounded border border-brand-500 bg-brand-700 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 ">
            <div className="h-5 w-5">
              <SubstanceSVG />
            </div>
            <p className="text-md select-none pl-2 font-normal">
              Substance Painter
            </p>
          </span>
          <span className="my-0.5 me-2 inline-flex items-center rounded border border-brand-500 bg-brand-700 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 ">
            <div className="h-5 w-5">
              <DesignerSVG />
            </div>
            <p className="text-md select-none pl-2 font-normal">
              Substance Designer
            </p>
          </span>
          <span className="my-0.5 me-2 inline-flex items-center rounded border border-brand-500 bg-brand-700 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 ">
            <div className="h-5 w-5">
              <TouchdesignerSVG />
            </div>
            <p className="text-md select-none pl-2 font-normal">
              TouchDesigner
            </p>
          </span>
          <span className="my-0.5 me-2 inline-flex items-center rounded border border-brand-500 bg-brand-700 px-2.5 py-[0.18rem] text-xs font-medium text-brand-400 ">
            <div className="h-5 w-5">
              <ResolumeSVG />
            </div>
            <p className="text-md select-none pl-2 font-normal">Resolume</p>
          </span>
        </div>
      </div>
      {/* <GoogleTagManager gtmId="GTM-KMB769RD" /> */}
    </div>
  );
}
