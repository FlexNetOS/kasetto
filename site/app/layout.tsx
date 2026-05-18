import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { TopNav } from "./components/top-nav";
import "./globals.css";

// Variable axis covers wght 100–800 — see SKILL.md for the brand weight ladder.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Kasetto",
  description: "Declarative AI Agent Environment Manager written in Rust",
  openGraph: {
    title: "Kasetto",
    description: "Declarative AI Agent Environment Manager written in Rust",
    url: "https://kasetto.dev",
    siteName: "Kasetto",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrainsMono.className} dark`} data-theme="dark">
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <TopNav />
        <div id="main" tabIndex={-1}>
          {children}
        </div>
      </body>
    </html>
  );
}
