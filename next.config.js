/** @type {import('next').NextConfig} */
const nextConfig = {
  // Frontend-only demo: static export, no server runtime.
  // All "backend" behavior (plans DB, Stripe, webhooks) is simulated in the browser.
  output: "export",
  images: { unoptimized: true },
};

module.exports = nextConfig;
