"use client";
import { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { AiReview } from "./ai-tutor";
import { readProgress, saveProgress, useProgress } from "@/lib/progress";
import type { Problem } from "@/lib/data";
export function Workspace({ problem }: { problem: Problem }) {
  const p = useProgress();
  const saved = p.designs[problem.slug];
  const [draft, setDraft] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const text = draft ?? saved?.draft ?? "";
  function save(completed: boolean) {
    setNotice("");
    setError("");
    if (completed && text.trim().length < 100) {
      setError(
        "Write at least 100 characters explaining your architecture before submitting.",
      );
      return;
    }
    try {
      const current = readProgress();
      saveProgress({
        ...current,
        designs: {
          ...current.designs,
          [problem.slug]: {
            draft: text,
            completed,
            updatedAt: new Date().toISOString(),
          },
        },
      });
      setNotice(
        completed
          ? "Design submitted and marked complete. Review your tradeoffs below."
          : "Draft saved in this browser.",
      );
    } catch {
      setError(
        "Browser storage is unavailable or full. Copy your design somewhere safe and retry.",
      );
    }
  }
  return (
    <div className="card workspace">
      <div className="workspace-heading">
        <h2>Your architecture</h2>
        <span className="tiny">TEXT WORKSPACE</span>
      </div>
      <p>
        Explain your APIs, data model, request flow, scaling strategy, and
        tradeoffs.
      </p>
      <label htmlFor="design" className="eyebrow">
        DESIGN NOTES
      </label>
      <textarea
        id="design"
        maxLength={30000}
        value={text}
        onChange={(e) => {
          setDraft(e.target.value);
          setNotice("");
        }}
        placeholder={
          "1. Requirements & estimates\n2. API contracts\n3. Data model\n4. High-level architecture\n5. Bottlenecks & tradeoffs"
        }
      />
      <div className="editor-footer">
        <span>{text.length.toLocaleString()} / 30,000 characters</span>
        <span>{saved?.completed ? "Submitted" : "Draft"}</span>
      </div>
      <div className="hero-actions">
        <Button variant="outline" onClick={() => save(false)}>
          <Save size={16} />
          Save draft
        </Button>
        <Button onClick={() => save(true)}>
          <CheckCircle2 size={16} />
          Submit design
        </Button>
      </div>
      <p className="storage-note">
        Save before leaving. Completion records submission, not correctness.
      </p>
      <div aria-live="polite">
        {notice && <p className="success">{notice}</p>}
      </div>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <div className="review">
        <h3>Review your design</h3>
        <ul>
          <li>Does every requirement have a request flow?</li>
          <li>Have you estimated traffic, storage, and the busiest path?</li>
          <li>What happens when a server, cache, or database fails?</li>
          <li>Which consistency and latency tradeoffs did you choose?</li>
        </ul>
      </div>
      <AiReview problem={problem} design={text} />
    </div>
  );
}
