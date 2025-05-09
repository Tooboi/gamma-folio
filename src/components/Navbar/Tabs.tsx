import Link from "next/link";

export default function Tabs() {
  return (
    <div className="w-full">
      <ul className="mx-auto items-center  flex flex-row justify-center px-2 md:w-1/2">
        <li>
          <div className="dropdown-hover dropdown">
            <div
              tabIndex={0}
              role="button"
              className="group btn block content-center rounded-lg border-none border-transparent bg-transparent pt-1 text-[1.08rem] font-normal normal-case transition-all duration-300 hover:bg-transparent xs:px-6 md:pt-0 md:text-xl"
            >
              Portfolios
              <span className="mt-1 block h-[3px] max-w-0 rounded-full bg-brand-600 transition-all duration-300 group-focus-within:max-w-full group-hover:max-w-full md:mt-0"></span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content  menu z-[100] w-52 rounded-lg border-2 border-brand-700 bg-brand-900 p-2 group-hover:bg-transparent"
            >
              <li>
                <Link
                  href="/renders"
                  className="rounded-md text-[1rem] text-brand-300"
                >
                  Renders
                </Link>
              </li>
              <li>
                <Link
                  href="/animations"
                  className="rounded-md text-[1rem] text-brand-300"
                >
                  Animations
                </Link>
              </li>
              <li>
                <Link
                  href="/devs"
                  className="rounded-md text-[1rem] text-brand-300"
                >
                  Development
                </Link>
              </li>
            </ul>
          </div>
        </li>

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
          href="/downloads"
          className="group mx-auto px-2 text-[1.08rem] transition-all  xs:px-6 md:text-xl"
        >
          <li>
            Downloads
            <span className="block h-[3px] max-w-0 rounded-full bg-brand-600 transition-all duration-300 group-focus-within:max-w-full group-hover:max-w-full"></span>
          </li>
        </Link>
        <Link
          href="/tools"
          className="group mx-auto px-2 text-[1.08rem] transition-all  xs:px-6 md:text-xl"
        >
          <li>
            Tools
            <span className="block h-[3px] max-w-0 rounded-full bg-brand-600 transition-all duration-300 group-focus-within:max-w-full group-hover:max-w-full"></span>
          </li>
        </Link>
      </ul>
    </div>
  );
}
