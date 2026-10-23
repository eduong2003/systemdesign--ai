import Link from "next/link";
export default function NotFound() {
  return (
    <section className="shell section empty">
      <span className="eyebrow">404</span>
      <h1 className="page-title">This page is off the map.</h1>
      <p>Find your next challenge in the practice room.</p>
      <Link className="button button-primary" href="/problems">
        Browse challenges
      </Link>
    </section>
  );
}
