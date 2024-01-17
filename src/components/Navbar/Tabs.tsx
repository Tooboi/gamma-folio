import Link from "next/link";

export default function Tabs() {
  return (
    <div className="w-full">
      <ul className="mx-auto flex flex-row justify-center px-2 md:w-1/2">
        <li className="group mx-auto px-2 text-[1.08rem] transition-all  xs:px-6 md:text-xl">
          <Link href="/renders">Renders</Link>
          <span className="block h-[3px] max-w-0 rounded-full bg-stone-600 transition-all duration-300 group-focus-within:max-w-full group-hover:max-w-full"></span>
        </li>
        <li className="group mx-auto px-2 text-[1.08rem] transition-all xs:px-6 md:text-xl">
          <Link href="/devs">Dev</Link>
          <span className="block h-[3px] max-w-0 rounded-full bg-stone-600 transition-all duration-300 group-focus-within:max-w-full group-hover:max-w-full"></span>
        </li>
        <li className="group mx-auto px-2 text-[1.08rem] transition-all xs:px-6 md:text-xl">
          <Link href="/about">About</Link>
          <span className="block h-[3px] max-w-0 rounded-full bg-stone-600 transition-all duration-300 group-focus-within:max-w-full group-hover:max-w-full"></span>
        </li>
        <li className="group mx-auto px-2 text-[1.08rem] transition-all xs:px-6 md:text-xl">
          <Link href="/contact">Contact</Link>
          <span className="block h-[3px] max-w-0 rounded-full bg-stone-600 transition-all duration-300 group-focus-within:max-w-full group-hover:max-w-full"></span>
        </li>
      </ul>
    </div>
  );
}
