"use client";

import { useState, type FormEvent } from "react";
import { Send, Sparkles } from "lucide-react";
import { problems, type Problem } from "@/lib/data";
import { Button } from "./ui/button";

type Message = { role: "user" | "assistant"; content: string };

async function requestTutor(payload: object) {
  const response = await fetch("/api/tutor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = (await response.json()) as {
    answer?: string;
    error?: string;
  };
  if (!response.ok) throw new Error(result.error ?? "The tutor request failed.");
  if (!result.answer) throw new Error("The tutor returned an empty response.");
  return result.answer;
}

export function AiReview({
  problem,
  design,
}: {
  problem: Problem;
  design: string;
}) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function reviewDesign() {
    setError("");
    setAnswer("");
    setBusy(true);
    try {
      setAnswer(
        await requestTutor({
          mode: "review",
          problemSlug: problem.slug,
          design,
        }),
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Unable to get feedback.",
      );
    } finally {
      setBusy(false);
    }
  }

  const canReview = design.trim().length >= 100 && design.length <= 8_000;
  return (
    <div className="ai-review">
      <span className="eyebrow">AI DESIGN REVIEW</span>
      <p>
        Get focused feedback on this draft. Your notes are sent to the AI
        provider for this request and aren&apos;t saved to an account.
      </p>
      <Button onClick={reviewDesign} disabled={!canReview || busy}>
        <Sparkles size={16} />
        {busy ? "Reviewing..." : "Review my design"}
      </Button>
      {!canReview && (
        <p className="tiny-note">
          Write 100 to 8,000 characters to request a review.
        </p>
      )}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {answer && (
        <section className="tutor-answer" aria-live="polite">
          <h3>Design feedback</h3>
          <p>{answer}</p>
        </section>
      )}
    </div>
  );
}

export function AiTutorChat() {
  const [problemSlug, setProblemSlug] = useState(problems[0].slug);
  const [history, setHistory] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = message.trim();
    if (!question || busy) return;

    setError("");
    setBusy(true);
    try {
      const answer = await requestTutor({
        mode: "chat",
        problemSlug,
        message: question,
        history: history.slice(-8),
      });
      const exchangedMessages: Message[] = [
        { role: "user", content: question },
        { role: "assistant", content: answer },
      ];
      setHistory((current) => [...current, ...exchangedMessages].slice(-20));
      setMessage("");
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Unable to reach the tutor.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="tutor-chat">
      <label htmlFor="tutor-challenge" className="eyebrow">
        CHALLENGE CONTEXT
      </label>
      <select
        id="tutor-challenge"
        className="tutor-select"
        value={problemSlug}
        disabled={busy}
        onChange={(event) => {
          setProblemSlug(event.target.value);
          setHistory([]);
          setError("");
        }}
      >
        {problems.map((problem) => (
          <option value={problem.slug} key={problem.slug}>
            {problem.title}
          </option>
        ))}
      </select>

      <div className="chat-log" aria-live="polite" aria-label="Tutor conversation">
        {history.length === 0 && (
          <p className="chat-empty">
            Ask about a design choice, a bottleneck, or how to reason through a
            tradeoff.
          </p>
        )}
        {history.map((item, index) => (
          <article className={`chat-message ${item.role}`} key={index}>
            <span className="eyebrow">
              {item.role === "user" ? "YOU" : "TUTOR"}
            </span>
            <p>{item.content}</p>
          </article>
        ))}
        {busy && <p role="status">Thinking through your question...</p>}
      </div>

      <form className="tutor-form" onSubmit={sendMessage}>
        <label htmlFor="tutor-message" className="eyebrow">
          YOUR QUESTION
        </label>
        <textarea
          id="tutor-message"
          rows={3}
          maxLength={1_000}
          disabled={busy}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="What tradeoff should I consider for this design?"
        />
        <div className="tutor-form-footer">
          <span>{message.length} / 1,000</span>
          <Button type="submit" disabled={!message.trim() || busy}>
            <Send size={15} />
            {busy ? "Sending..." : "Ask tutor"}
          </Button>
        </div>
      </form>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <p className="tutor-disclosure">
        Don&apos;t include personal or confidential information. Chats stay in
        this tab and aren&apos;t saved.
      </p>
    </div>
  );
}