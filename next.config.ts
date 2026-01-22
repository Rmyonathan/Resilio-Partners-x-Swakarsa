import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'got-scraping',
    'header-generator',
  ],
  // Allow Wix to embed this app in an iframe
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            // This allows wix.com to embed your site
            value: "frame-ancestors 'self' https://*.wix.com https://*.wixstatic.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
