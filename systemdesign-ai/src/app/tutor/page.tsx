import Link from "next/link";
import { Sparkles } from "lucide-react";
export const metadata = { title: "AI Tutor" };
export default function Page() {
  return (
    <section className="shell section">
      <div className="tutor card">
        <Sparkles size={36} />
        <span className="eyebrow">COMING IN PHASE 2</span>
        <h1 className="page-title">
          A thinking partner
          <br />
          for your next design.
        </h1>
        <p>
          The AI tutor will help you explore architecture, question assumptions,
          and understand tradeoffs. Chat and automated feedback are planned for
          the next phase.
        </p>
        <p>
          For now, explore the learning library and use each challenge&apos;s
          hints and review checklist. The MVP works without an OpenAI API key.
        </p>
        <Link className="button button-primary" href="/learn">
          Explore the learning library →
        </Link>
      </div>
    </section>
  );
}
