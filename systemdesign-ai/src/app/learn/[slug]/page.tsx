import Link from "next/link";
import { notFound } from "next/navigation";
import { topics, problems } from "@/lib/data";
import { LessonComplete } from "@/components/lesson-complete";
import { ProblemCard } from "@/components/problem-card";
export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: topics.find((t) => t.slug === slug)?.title ?? "Lesson not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = topics.find((t) => t.slug === slug);
  if (!t) notFound();
  return (
    <section className="shell section">
      <Link className="text-link" href="/learn">
        ← All concepts
      </Link>
      <article className="lesson-content">
        <span className="eyebrow">SYSTEM DESIGN FUNDAMENTALS</span>
        <h1 className="page-title">{t.title}</h1>
        <h2>The concept</h2>
        <p>{t.explanation}</p>
        <h2>In the real world</h2>
        <p>{t.example}</p>
        <div className="review">
          <h2>The tradeoff</h2>
          <p>{t.tradeoff}</p>
        </div>
        <LessonComplete slug={slug} />
      </article>
      <div className="section-title">
        <div>
          <h2>Put this concept to work.</h2>
          <p>Use what you learned in a real design challenge.</p>
        </div>
      </div>
      <div className="grid-three">
        {problems
          .filter((p) => p.topics.includes(t.title))
          .map((p) => (
            <ProblemCard key={p.slug} problem={p} index={problems.indexOf(p)} />
          ))}
      </div>
    </section>
  );
}
export const dynamicParams = false;
