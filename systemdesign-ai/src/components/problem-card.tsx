import Link from "next/link";
import { ArrowUpRight, Clock, Network } from "lucide-react";
import type { Problem } from "@/lib/data";
export function ProblemCard({
  problem,
  index = 0,
}: {
  problem: Problem;
  index?: number;
}) {
  return (
    <article className="card problem-card">
      <div className="card-top">
        <span className="problem-icon">
          <Network size={23} />
        </span>
        <span className={"badge " + problem.difficulty.toLowerCase()}>
          {problem.difficulty}
        </span>
      </div>
      <span className="eyebrow">
        CHALLENGE {String(index + 1).padStart(2, "0")}
      </span>
      <h3>{problem.title}</h3>
      <p>{problem.description}</p>
      <div className="tags">
        {problem.topics.slice(0, 2).map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="card-bottom">
        <span>
          <Clock size={14} />
          {problem.minutes} min
        </span>
        <Link href={"/problems/" + problem.slug}>
          Start challenge <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
