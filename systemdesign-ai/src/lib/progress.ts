"use client";
import { useSyncExternalStore } from "react";
export type Design = { draft: string; completed: boolean; updatedAt: string };
export type Progress = { designs: Record<string, Design>; lessons: string[] };
const EMPTY: Progress = { designs: {}, lessons: [] };
const KEY = "systemdesign-ai:v1";
let rawCache: string | null | undefined;
let cache = EMPTY;
export function readProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === rawCache) return cache;
    rawCache = raw;
    cache = EMPTY;
    if (!raw) return (cache = EMPTY);
    const data = JSON.parse(raw);
    const designs: Progress["designs"] = {};
    for (const [key, value] of Object.entries(data.designs ?? {})) {
      const v = value as Design;
      if (
        v &&
        typeof v.draft === "string" &&
        typeof v.completed === "boolean" &&
        typeof v.updatedAt === "string"
      )
        designs[key] = v;
    }
    return (cache = {
      designs,
      lessons: Array.isArray(data.lessons)
        ? data.lessons.filter((v: unknown) => typeof v === "string")
        : [],
    });
  } catch {
    return EMPTY;
  }
}
export function saveProgress(p: Progress) {
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("progress-change"));
}
function subscribe(fn: () => void) {
  window.addEventListener("storage", fn);
  window.addEventListener("progress-change", fn);
  return () => {
    window.removeEventListener("storage", fn);
    window.removeEventListener("progress-change", fn);
  };
}
export function useProgress() {
  return useSyncExternalStore(subscribe, readProgress, () => EMPTY);
}
