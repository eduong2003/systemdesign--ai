import { ProblemList } from "@/components/problem-list";
export const metadata = { title: "Practice challenges" };
export default function Page() {
  return (
    <section className="shell section">
      <span className="eyebrow">THE PRACTICE ROOM</span>
      <h1 className="page-title">Design something that scales.</h1>
      <p className="intro">
        Eight real-world systems. Endless opportunities to sharpen your
        thinking.
      </p>
      <ProblemList />
    </section>
  );
}
