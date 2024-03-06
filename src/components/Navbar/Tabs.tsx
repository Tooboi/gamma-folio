import Link from "next/link";

export default function Tabs() {
  return (
    <div className="w-full">
      <ul className="mx-auto flex flex-row justify-center px-2 md:w-1/2">
        <Link
          href="/renders"
          className="group mx-auto px-2 text-[1.08rem] transition-all  xs:px-6 md:text-xl"
        >
          <li>
            Renders
            <span className="block h-[3px] max-w-0 rounded-full bg-brand-600 transition-all duration-300 group-focus-within:max-w-full group-hover:max-w-full"></span>
          </li>
        </Link>
        <Link
          href="/devs"
          className="group mx-auto px-2 text-[1.08rem] transition-all xs:px-6 md:text-xl"
        >
          <li>
            Dev
            <span className="block h-[3px] max-w-0 rounded-full bg-brand-600 transition-all duration-300 group-focus-within:max-w-full group-hover:max-w-full"></span>
          </li>
        </Link>
        <Link
          href="/about"
          className="group mx-auto px-2 text-[1.08rem] transition-all xs:px-6 md:text-xl"
        >
          <li>
            About
            <span className="block h-[3px] max-w-0 rounded-full bg-brand-600 transition-all duration-300 group-focus-within:max-w-full group-hover:max-w-full"></span>
          </li>
        </Link>
        <Link
          href="/contact"
          className="group mx-auto px-2 text-[1.08rem] transition-all xs:px-6 md:text-xl"
        >
          <li>
            Contact
            <span className="block h-[3px] max-w-0 rounded-full bg-brand-600 transition-all duration-300 group-focus-within:max-w-full group-hover:max-w-full"></span>
          </li>
        </Link>
      </ul>
    </div>
  );
}
