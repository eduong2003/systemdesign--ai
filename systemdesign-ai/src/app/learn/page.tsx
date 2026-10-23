import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { topics } from "@/lib/data";
export const metadata = { title: "Learn the fundamentals" };
export default function Page() {
  return (
    <section className="shell section">
      <span className="eyebrow">YOUR ARCHITECTURAL TOOLKIT</span>
      <h1 className="page-title">Strong systems. Solid foundations.</h1>
      <p className="intro">
        Understand the building blocks before you put them together.
      </p>
      <div className="grid-three">
        {topics.map((t, i) => (
          <Link
            className="card lesson-card"
            key={t.slug}
            href={"/learn/" + t.slug}
          >
            <div className="card-top">
              <BookOpen size={22} />
              <span className="eyebrow">
                LESSON {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h2>{t.title}</h2>
            <p>{t.explanation}</p>
            <span className="text-link">
              Explore concept <ArrowUpRight size={16} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
