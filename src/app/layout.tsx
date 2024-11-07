import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/navbar/footer";
import Navbar from "./components/navbar/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bozpar",
  description: "Where banking meets technology",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}>
        {/* Wrapper layout */}
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
          <Navbar /> {/* Top navigation bar */}
          <main className="flex-1 flex flex-col justify-between overflow-auto">
            <div className="flex-1 flex items-center justify-center">{children}</div>
          </main>
          <Footer /> {/* Bottom footer */}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
