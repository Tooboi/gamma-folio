import Link from "next/link";

export default function Tabs() {
  return (
    <div className="w-full">
      <ul className="mx-auto flex flex-row justify-center px-2 md:w-1/2">
        <li className="mx-auto px-2 text-[1.08rem] transition-all hover:tracking-widest active:tracking-normal xs:px-6 md:text-xl">
          <Link href="/renders">Renders</Link>
        </li>
        <li className="mx-auto px-2 text-[1.08rem] transition-all hover:tracking-widest active:tracking-normal xs:px-6 md:text-xl">
          <Link href="/devs">Dev</Link>
        </li>
        <li className="mx-auto px-2 text-[1.08rem] transition-all hover:tracking-widest active:tracking-normal xs:px-6 md:text-xl">
          <Link href="/about">About</Link>
        </li>
        <li className="mx-auto px-2 text-[1.08rem] transition-all hover:tracking-widest active:tracking-normal xs:px-6 md:text-xl">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
}
