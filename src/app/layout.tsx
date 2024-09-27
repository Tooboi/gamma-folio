import Footer from "./Footer";
import Navbar from "../components/Navbar/Navbar";
import Tabs from "../components/Navbar/Tabs";
import "./globals.css";
import { Rubik } from "next/font/google";
import SessionProvider from "./SessionProvider";
import Script from "next/script";

import { GoogleTagManager } from "@next/third-parties/google";

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
      <head></head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-DF8DN8Q9LH"
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
                     
            gtag('config', 'G-DF8DN8Q9LH');
         `}
      </Script>
      <body className={rubik.className}>
        <SessionProvider>
          <Navbar />
          <div className="flex lg:hidden">
            <Tabs />
          </div>
          <main className="m-auto min-h-screen min-w-[300px] max-w-7xl p-4">
            {children}
          </main>
          <GoogleTagManager gtmId="GTM-KMB769RD" />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
