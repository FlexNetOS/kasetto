import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const DOC_SLUGS = [
  "agents",
  "authentication",
  "ci",
  "commands",
  "configuration",
  "cookbook",
  "faq",
  "how-sync-works",
  "installation",
  "security",
  "sync-flow",
  "writing-skills",
];

const docsHost = [{ type: "host", value: "docs.kasetto.dev" }];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // docs.kasetto.dev/ → kasetto.dev/docs
      {
        source: "/",
        has: docsHost,
        destination: "https://kasetto.dev/docs",
        permanent: true,
      },
      // docs.kasetto.dev/<slug>(/) → kasetto.dev/docs/<slug>
      ...DOC_SLUGS.flatMap((slug) => [
        {
          source: `/${slug}`,
          has: docsHost,
          destination: `https://kasetto.dev/docs/${slug}`,
          permanent: true,
        },
        {
          source: `/${slug}/`,
          has: docsHost,
          destination: `https://kasetto.dev/docs/${slug}`,
          permanent: true,
        },
      ]),
    ];
  },
};

export default withMDX(nextConfig);
