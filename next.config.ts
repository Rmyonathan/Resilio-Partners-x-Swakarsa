import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'got-scraping',
    'header-generator',
  ],
  // Allow Wix to embed this app in an iframe
  // No CSP headers set = Next.js allows iframe embedding by default
  // If you still see CSP errors after redeploy, check Vercel Dashboard:
  // Settings > Security > Headers (disable any CSP or X-Frame-Options there)
};

export default nextConfig;
