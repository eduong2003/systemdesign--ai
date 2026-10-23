import Link from "next/link";
import { notFound } from "next/navigation";
import { problems } from "@/lib/data";
import { Workspace } from "@/components/workspace";
export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      problems.find((p) => p.slug === slug)?.title ?? "Challenge not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = problems.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <section className="shell section">
      <Link className="text-link" href="/problems">
        ← All challenges
      </Link>
      <div className="challenge-title">
        <h1 className="page-title">{p.title}</h1>
        <span className={"badge " + p.difficulty.toLowerCase()}>
          {p.difficulty}
        </span>
        <span className="time">{p.minutes} minutes</span>
      </div>
      <div className="challenge-grid">
        <article className="requirements">
          <p className="intro">{p.description}</p>
          {[
            { title: "Functional requirements", items: p.functional },
            { title: "Non-functional requirements", items: p.nonFunctional },
            { title: "Constraints & assumptions", items: p.constraints },
          ].map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <ul>
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
          ))}
          <h2>Topics covered</h2>
          <div className="tags">
            {p.topics.map((t) => (
              <Link
                key={t}
                href={"/learn/" + t.toLowerCase().replaceAll(" ", "-")}
              >
                {t}
              </Link>
            ))}
          </div>
          <details>
            <summary>Need a starting point? Open hints</summary>
            <ol>
              {p.hints.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ol>
          </details>
        </article>
        <Workspace key={slug} problem={p} />
      </div>
    </section>
  );
}
export const dynamicParams = false;
