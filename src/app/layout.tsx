import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scoring Agent Console",
  description: "Dashboard output quality evaluation workspace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
