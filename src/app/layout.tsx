import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Do YOUKNOW? | YOUKNOW Technologies",
  description:
    "Test your ability to recognize the software stack that YOUKNOW Technologies resells. A memory card matching game.",
  openGraph: {
    title: "Do YOUKNOW? | YOUKNOW Technologies",
    description:
      "How well do you know the YOUKNOW tech stack? Play the memory game!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
