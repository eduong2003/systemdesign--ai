import { Dashboard } from "@/components/dashboard";
export const metadata = { title: "Your dashboard" };
export default function Page() {
  return (
    <section className="shell section">
      <span className="eyebrow">PROGRESS, ONE DESIGN AT A TIME</span>
      <h1 className="page-title">Your practice pays off.</h1>
      <p className="intro">
        A little consistency. A lot of growth. Pick up where you left off.
      </p>
      <Dashboard />
    </section>
  );
}
