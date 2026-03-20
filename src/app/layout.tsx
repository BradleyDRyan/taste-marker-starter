import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skill Learning Console",
  description: "Learning agent interface for turning experiment history into stronger skill-file guidance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
