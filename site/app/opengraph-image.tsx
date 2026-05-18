import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kasetto — Declarative AI agent environment manager";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens (sRGB fallbacks; ImageResponse renders in sRGB)
const BG = "#0a0908";
const FG = "#ebe8e2";
const MUTED = "#a8a5a0";
const BORDER = "#232220";
const MAUVE = "#b89cdc";
// Side B accent — amber (`--accent-warm` in `app/globals.css`).
const ACCENT_WARM = "#d4b070";
const TAPE = "#c4ad88";

async function loadFont(family: string, weight: 400 | 600 | 700) {
  const res = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&display=swap`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  );
  const css = await res.text();
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Failed to load ${family} ${weight}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function OpengraphImage() {
  const [regular, semibold, bold, jp] = await Promise.all([
    loadFont("JetBrains Mono", 400),
    loadFont("JetBrains Mono", 600),
    loadFont("JetBrains Mono", 700),
    loadFont("Noto Sans JP", 700),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: BG,
        color: FG,
        fontFamily: "JetBrains Mono, monospace",
        padding: 56,
        position: "relative",
      }}
    >
      {/* J-card border */}
      <div
        style={{
          position: "absolute",
          inset: 32,
          border: `2px solid ${BORDER}`,
          display: "flex",
        }}
      />

      {/* Side A tag */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            padding: "8px 14px",
            border: `1px solid ${MAUVE}`,
            color: MAUVE,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.32em",
          }}
        >
          SIDE A
        </div>
        <div style={{ flex: 1, height: 1, background: BORDER }} />
        <div
          style={{
            color: MUTED,
            fontSize: 18,
            letterSpacing: "0.28em",
            fontWeight: 600,
          }}
        >
          TRACK 01 · OVERVIEW
        </div>
      </div>

      {/* Title block */}
      <div
        style={{
          marginTop: 72,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            color: ACCENT_WARM,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.32em",
            fontFamily: "Noto Sans JP",
          }}
        >
          カセット
        </div>
        <div
          style={{
            fontSize: 140,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: ACCENT_WARM,
          }}
        >
          Kasetto
        </div>
        <div
          style={{
            fontSize: 32,
            color: MUTED,
            letterSpacing: "0.02em",
            maxWidth: 1040,
            lineHeight: 1.3,
          }}
        >
          Declarative AI Agent Environment Manager written in Rust
        </div>
      </div>

      {/* Footer bar */}
      <div
        style={{
          position: "absolute",
          left: 56,
          right: 56,
          bottom: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 20,
          letterSpacing: "0.24em",
          fontWeight: 600,
          color: TAPE,
        }}
      >
        <span>KASETTO.DEV</span>
        <span style={{ color: MUTED }}>$ curl -fsSL kasetto.dev/install | sh</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: semibold, weight: 600, style: "normal" },
        { name: "JetBrains Mono", data: bold, weight: 700, style: "normal" },
        { name: "Noto Sans JP", data: jp, weight: 700, style: "normal" },
      ],
    }
  );
}
