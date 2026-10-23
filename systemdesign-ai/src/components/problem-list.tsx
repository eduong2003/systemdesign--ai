"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { problems } from "@/lib/data";
import { ProblemCard } from "./problem-card";
export function ProblemList() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const filtered = problems.filter(
    (p) =>
      (difficulty === "All" || p.difficulty === difficulty) &&
      (p.title + " " + p.topics.join(" "))
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="filters">
        <label className="search">
          <Search size={18} />
          <input
            aria-label="Search challenges"
            placeholder="Search challenges or topics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="filter-buttons">
          {["All", "Easy", "Medium", "Hard"].map((d) => (
            <button
              key={d}
              aria-pressed={difficulty === d}
              onClick={() => setDifficulty(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <p className="results">{filtered.length} challenges to explore</p>
      <div className="grid-three">
        {filtered.map((p) => (
          <ProblemCard key={p.slug} problem={p} index={problems.indexOf(p)} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty">
          <h3>No matching challenges</h3>
          <p>Try another topic or difficulty.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setQuery("");
              setDifficulty("All");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
