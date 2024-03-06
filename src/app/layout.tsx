import Footer from "./Footer";
import Navbar from "../components/Navbar/Navbar";
import Tabs from "../components/Navbar/Tabs";
import "./globals.css";
import { Rubik } from "next/font/google";
import SessionProvider from "./SessionProvider";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "GAMMA2DOT2",
  caption: "Gamma 2.2 - Josh Pica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="forest"
      className="background-grid text-brand-300"
    >
      <body className={rubik.className}>
        <SessionProvider>
          <Navbar />
          <div className="flex lg:hidden">
            <Tabs />
          </div>
          <main className="m-auto min-h-screen min-w-[300px] max-w-7xl p-4">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
