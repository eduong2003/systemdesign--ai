"use client";
import { useState } from "react";
import { readProgress, saveProgress, useProgress } from "@/lib/progress";
import { Button } from "./ui/button";
export function LessonComplete({ slug }: { slug: string }) {
  const p = useProgress();
  const done = p.lessons.includes(slug);
  const [error, setError] = useState("");
  return (
    <>
      <Button
        onClick={() => {
          try {
            const current = readProgress();
            saveProgress({
              ...current,
              lessons: done
                ? current.lessons.filter((s) => s !== slug)
                : [...new Set([...current.lessons, slug])],
            });
            setError("");
          } catch {
            setError("Unable to save progress in this browser.");
          }
        }}
      >
        {done ? "✓ Learned — mark unread" : "Mark as learned"}
      </Button>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
    </>
  );
}
