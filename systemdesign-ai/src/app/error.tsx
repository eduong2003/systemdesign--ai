"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="shell section empty">
      <h1 className="page-title">Something went wrong.</h1>
      <p>Try loading this page again.</p>
      <button className="button button-primary" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
