import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/katyusha-autoservice-podolsk";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? githubPagesBasePath : undefined,
  assetPrefix: isGithubPages ? `${githubPagesBasePath}/` : undefined,
  trailingSlash: isGithubPages ? true : undefined,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
