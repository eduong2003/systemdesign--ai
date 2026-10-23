"use client";
import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { problems, topics } from "@/lib/data";
import { ProblemCard } from "./problem-card";
export function Dashboard() {
  const p = useProgress();
  const attempted = problems.filter((x) => p.designs[x.slug]);
  const completed = attempted.filter((x) => p.designs[x.slug].completed);
  const learned = topics.filter((t) => p.lessons.includes(t.slug));
  const next = problems.find((x) => !p.designs[x.slug]?.completed);
  const recent = [...attempted]
    .sort((a, b) =>
      p.designs[b.slug].updatedAt.localeCompare(p.designs[a.slug].updatedAt),
    )
    .slice(0, 5);
  return (
    <>
      <div className="grid-three metrics">
        {[
          ["Completed challenges", completed.length + "/" + problems.length],
          ["Attempted challenges", attempted.length],
          ["Concepts learned", learned.length + "/" + topics.length],
        ].map(([label, value]) => (
          <div className="card" key={label}>
            <p>{label}</p>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <div className="card">
          <h2>Your learning journey</h2>
          <p>
            {learned.length} of {topics.length} concepts explored
          </p>
          <progress
            aria-label="Learning progress"
            value={learned.length}
            max={topics.length}
          />
          <Link className="text-link" href="/learn">
            Keep learning →
          </Link>
          <h2 className="activity-heading">Recent challenge activity</h2>
          {recent.length ? (
            <ul className="activity">
              {recent.map((x) => (
                <li key={x.slug}>
                  <Link href={"/problems/" + x.slug}>{x.title}</Link>
                  <span>
                    {p.designs[x.slug].completed ? "Submitted" : "Draft saved"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty">
              <h3>A fresh page, a new possibility.</h3>
              <p>Save your first draft to start your journey.</p>
              <Link className="text-link" href="/problems">
                Explore challenges →
              </Link>
            </div>
          )}
          <p className="storage-note">
            Progress belongs to this browser. Clearing site data removes drafts
            and progress.
          </p>
        </div>
        <div>
          <span className="eyebrow">YOUR NEXT CHALLENGE</span>
          {next ? (
            <ProblemCard problem={next} index={problems.indexOf(next)} />
          ) : (
            <div className="card">
              <h2>Every challenge submitted!</h2>
              <Link className="text-link" href="/problems">
                Revisit your designs →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
