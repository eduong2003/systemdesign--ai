import Link from "next/link";
import {
  ArrowRight,
  Check,
  Layers,
  Terminal,
  BookOpen,
  MoveUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProblemCard } from "@/components/problem-card";
import { problems } from "@/lib/data";
export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div>
          <div className="announcement">
            <span className="dot" /> YOUR NEXT LEVEL STARTS HERE
          </div>
          <h1>
            Master System
            <br />
            Design <span>with AI.</span>
          </h1>
          <p className="hero-copy">
            Go beyond memorizing diagrams. Learn the fundamentals, tackle
            real-world challenges, and build the confidence to design at scale.
          </p>
          <div className="hero-actions">
            <Button asChild>
              <Link href="/problems">
                Start practicing <ArrowRight size={17} />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/learn">
                <BookOpen size={17} />
                Explore the fundamentals
              </Link>
            </Button>
          </div>
          <div className="hero-notes">
            <span>
              <Check size={15} /> No account needed
            </span>
            <span>
              <Check size={15} /> Progress saved locally
            </span>
          </div>
        </div>
        <div className="architecture">
          <div className="window-bar">
            <div>
              <i />
              <i />
              <i />
            </div>
            <span>url-shortener.architecture</span>
            <Terminal size={14} />
          </div>
          <div className="diagram">
            <div className="diagram-label">THINK BIG. START SIMPLE.</div>
            <div className="node client">
              Clients <span>web · mobile</span>
            </div>
            <div className="wire" />
            <div className="node balance">
              Load balancer <span>distribute traffic</span>
            </div>
            <div className="wire" />
            <div className="node-row">
              <div className="node">
                API server <span>create & redirect</span>
              </div>
              <div className="node">
                API server <span>create & redirect</span>
              </div>
            </div>
            <div className="wire" />
            <div className="node-row">
              <div className="node cache">
                Cache <span>hot links</span>
              </div>
              <div className="node">
                Database <span>durable storage</span>
              </div>
            </div>
          </div>
          <div className="diagram-foot">
            <span className="dot" /> An example architecture to get you thinking
          </div>
          <div className="floating-note">
            <Layers size={20} />
            <div>
              From idea to architecture<span>One tradeoff at a time.</span>
            </div>
          </div>
        </div>
      </section>
      <section className="stats-strip shell">
        <div>
          <strong>08</strong>
          <span>Real-world challenges</span>
        </div>
        <div>
          <strong>10</strong>
          <span>Essential concepts</span>
        </div>
        <div>
          <strong>01</strong>
          <span>Place to build your intuition</span>
        </div>
        <div className="strip-note">
          Built for curious engineers.
          <br />
          <span>Designed for deliberate practice.</span>
        </div>
      </section>
      <section className="section shell">
        <div className="section-title">
          <div>
            <span className="eyebrow">PUT THEORY INTO PRACTICE</span>
            <h2>Small links. Big systems.</h2>
            <p>
              Start with the essentials, then take on the systems you use every
              day.
            </p>
          </div>
          <Link className="text-link" href="/problems">
            All challenges <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid-three">
          {problems.slice(0, 3).map((p, i) => (
            <ProblemCard key={p.slug} problem={p} index={i} />
          ))}
        </div>
      </section>
      <section className="section shell how">
        <div>
          <span className="eyebrow">A BETTER WAY TO LEARN</span>
          <h2>
            Build understanding.
            <br />
            Then build systems.
          </h2>
          <p>
            No perfect answers. Just clearer thinking,
            <br />
            better questions, and thoughtful tradeoffs.
          </p>
          <Link className="text-link" href="/learn">
            Find your starting point <MoveUpRight size={17} />
          </Link>
        </div>
        <ol>
          {[
            [
              "Learn the building blocks",
              "Get comfortable with caching, queues, databases, and the concepts that connect them.",
            ],
            [
              "Take on a real challenge",
              "Define requirements, estimate scale, and explain your architecture in your own words.",
            ],
            [
              "Reflect and improve",
              "Save your design, use the review checklist, and revisit your tradeoffs as you learn.",
            ],
          ].map(([t, d], i) => (
            <li key={t}>
              <span>0{i + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="shell final-cta">
        <span className="eyebrow">YOUR FIRST DESIGN IS A CLICK AWAY</span>
        <h2>Great systems start with a question.</h2>
        <p>How would you design a URL shortener?</p>
        <Button asChild>
          <Link href="/problems/url-shortener">
            Take your first challenge <ArrowRight size={17} />
          </Link>
        </Button>
      </section>
    </>
  );
}
