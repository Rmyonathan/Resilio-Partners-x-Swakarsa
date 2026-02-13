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
            // Ganti domain di bawah sesuai domain Wix aslimu
            value: "frame-ancestors 'self' https://www.resilio-partners.com https://resilio-partners.com https://*.wix.com;",
          },
          // Note: X-Frame-Options dihilangkan karena CSP frame-ancestors sudah menangani iframe embedding
          // dan X-Frame-Options bisa konflik dengan CSP. CSP adalah metode modern yang lebih fleksibel.
        ],
      },
    ];
  },
};

export default nextConfig;
