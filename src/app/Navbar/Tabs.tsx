import Link from "next/link";

export default function Tabs() {
  return (
    <div className="w-full">
      <ul className="px-2 flex flex-row justify-center mx-auto">
        <li className="transition-all px-2 xs:px-6 hover:font-semibold active:font-normal text-[1.08rem] md:text-xl"><Link href="/renders">Renders</Link></li>
        <li className="transition-all px-2 xs:px-6 hover:font-semibold active:font-normal text-[1.08rem] md:text-xl"><Link href="/devs">Dev</Link></li>
        <li className="transition-all px-2 xs:px-6 hover:font-semibold active:font-normal text-[1.08rem] md:text-xl"><Link href="/about">About</Link></li>
        <li className="transition-all px-2 xs:px-6 hover:font-semibold active:font-normal text-[1.08rem] md:text-xl"><Link href="/contact">Contact</Link></li>
      </ul>
    </div>
  );
}
