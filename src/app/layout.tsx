import "./globals.css";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "GAMMA",
  description: "Gamma 2.2 - Josh Pica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="forest">
      <body className={rubik.className}>
        <main className="m-auto min-w-[300px] max-w-7xl p-4 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
