import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CARES Leadership Self-Assessment",
  description:
    "Measure your leadership capabilities across 5 dimensions: Communicate, Adapt, Relationships, Empower, Stay Calm.",
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
