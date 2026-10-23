"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Network, ArrowUpRight } from "lucide-react";
export function Navigation() {
  const path = usePathname();
  return (
    <header className="nav">
      <Link className="brand" href="/">
        <span className="brand-icon">
          <Network size={21} />
        </span>
        SystemDesign<span className="brand-ai">AI</span>
      </Link>
      <nav aria-label="Main navigation">
        {[
          ["/problems", "Problems"],
          ["/learn", "Learn"],
          ["/tutor", "AI Tutor"],
          ["/dashboard", "Dashboard"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={path.startsWith(href) ? "page" : undefined}
          >
            {label}
            {label === "AI Tutor" && <span className="tiny">SOON</span>}
          </Link>
        ))}
      </nav>
      <Link className="nav-cta" href="/problems">
        Start practicing <ArrowUpRight size={16} />
      </Link>
    </header>
  );
}
