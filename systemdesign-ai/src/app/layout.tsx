import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "SystemDesign AI — Build your architectural intuition",
    template: "%s | SystemDesign AI",
  },
  description:
    "Learn the fundamentals, practice eight system design challenges, and build your architectural intuition.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <footer>
          <Link className="brand" href="/">
            SystemDesign<span className="brand-ai">AI</span>
          </Link>
          <span>Think in systems. Build with confidence.</span>
          <span>Practice-first learning · MVP</span>
        </footer>
      </body>
    </html>
  );
}
