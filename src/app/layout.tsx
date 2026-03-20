import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skill Learning Agent",
  description: "Frontend surface for a learning agent that turns experiment history into better SKILL.md guidance.",
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
