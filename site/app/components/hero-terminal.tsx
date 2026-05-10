"use client";

import { useEffect, useRef, useState } from "react";

type Row =
  | { kind: "command"; text: string }
  | { kind: "blank" }
  | { kind: "src"; name: string; count: string }
  | { kind: "summary"; label: string; pairs: { label: string; value: string }[] };

const SCRIPT: Row[] = [
  { kind: "command", text: "kst sync" },
  { kind: "blank" },
  { kind: "src", name: "anthropics/skills", count: "5 skills" },
  { kind: "src", name: "vercel-labs/next-skills", count: "3 skills" },
  { kind: "src", name: "pivoshenko/pivoshenko.ai", count: "6 skills" },
  { kind: "src", name: "mcps/github", count: "1 server" },
  { kind: "src", name: "mcps/obsidian", count: "1 server" },
  { kind: "blank" },
  {
    kind: "summary",
    label: "synced",
    pairs: [
      { label: "skills", value: "14" },
      { label: "mcps", value: "2" },
    ],
  },
];

export function HeroTerminal() {
  const [visible, setVisible] = useState<number>(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    let i = 0;
    const tick = () => {
      if (cancelled) return;
      if (i >= SCRIPT.length) return;
      i += 1;
      setVisible(i);
      const delay = SCRIPT[i - 1]?.kind === "command" ? 320 : 140;
      setTimeout(tick, delay);
    };
    const initial = setTimeout(tick, 220);
    return () => {
      cancelled = true;
      clearTimeout(initial);
    };
  }, [started]);

  return (
    <figure className="hero-terminal" ref={ref} aria-label="Example kst sync output">
      <div className="hero-terminal-bar">
        <span className="hero-terminal-dot" />
        <span className="hero-terminal-dot" />
        <span className="hero-terminal-dot" />
        <span className="hero-terminal-title">~/projects/my-app</span>
      </div>
      <div className="hero-terminal-body">
        <div className="t-rows">
          {SCRIPT.map((row, idx) => {
            const shown = idx < visible;
            const isLast = idx === visible - 1 && started;
            if (row.kind === "blank") {
              return <div key={idx} className="t-blank" data-shown={shown} />;
            }
            if (row.kind === "command") {
              return (
                <div key={idx} className="t-line t-fade" data-shown={shown}>
                  <span className="t-prompt">$</span>
                  <span>{row.text}</span>
                  {isLast && <span className="t-cursor" aria-hidden />}
                </div>
              );
            }
            if (row.kind === "src") {
              return (
                <div key={idx} className="t-row t-fade" data-shown={shown}>
                  <span className="t-ok">✓</span>
                  <span>{row.name}</span>
                  <span className="t-dim">{row.count}</span>
                </div>
              );
            }
            return (
              <div key={idx} className="t-summary-line t-fade" data-shown={shown}>
                <span className="t-dim">{row.label}</span>
                {row.pairs.map((p, i) => (
                  <span key={p.label} className="t-summary-pair">
                    <span className="t-summary">{p.value}</span>
                    <span className="t-dim"> {p.label}</span>
                    {i < row.pairs.length - 1 && <span className="t-dim"> · </span>}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </figure>
  );
}
