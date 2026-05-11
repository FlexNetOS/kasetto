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
const RUST = "#d97757";
const TAPE = "#c4ad88";

export default function OpengraphImage() {
  return new ImageResponse(
    (
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
              color: RUST,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.32em",
            }}
          >
            カセット — KASETTO
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              maxWidth: 980,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ color: RUST }}>Declarative</span>
            <span>AI agent environment manager.</span>
          </div>
          <div
            style={{
              fontSize: 26,
              color: MUTED,
              letterSpacing: "0.04em",
              maxWidth: 980,
            }}
          >
            One YAML config. 21 agents. Written in Rust.
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
      </div>
    ),
    { ...size },
  );
}
