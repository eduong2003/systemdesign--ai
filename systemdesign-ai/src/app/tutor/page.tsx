import Link from "next/link";
import { Sparkles } from "lucide-react";
import { AiTutorChat } from "@/components/ai-tutor";
export const metadata = { title: "AI Tutor" };
export default function Page() {
  return (
    <section className="shell section">
      <div className="tutor tutor-page card">
        <div className="tutor-intro">
          <Sparkles size={36} />
          <span className="eyebrow">SYSTEM DESIGN COACH</span>
          <h1 className="page-title">Think through the tradeoffs.</h1>
          <p>
            Work through a challenge with a Socratic tutor. Choose a problem and
            ask about an architecture decision, scaling limit, or failure mode.
          </p>
        </div>
        <AiTutorChat />
        <Link className="button button-primary" href="/learn">
          Explore the learning library
        </Link>
      </div>
    </section>
  );
}
