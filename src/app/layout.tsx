import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Farid Iqbal - Full Stack Developer",
  description: "Software Developer specializing in Laravel, Next.js, and modern web technologies. Building exceptional digital experiences with 3+ years of experience.",
  keywords: ["Muhammad Farid Iqbal", "full stack developer", "laravel developer", "next.js", "react", "nuxt", "software developer", "web developer", "malaysia"],
  authors: [{ name: "Muhammad Farid Iqbal" }],
  openGraph: {
    title: "Muhammad Farid Iqbal - Full Stack Developer",
    description: "Software Developer specializing in Laravel, Next.js, and modern web technologies",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-ferrari antialiased">
        {children}
      </body>
    </html>
  );
}