// next.config.mjs

export default {
  env: {
    NEXT_PUBLIC_BASE_URL: 'http://localhost:3000',
    MAILGUN_API_KEY: '51356527-c6d8b73f',
    MAILGUN_DOMAIN: 'sandboxd862468b60cf4f58bd5705371f28eda4.mailgun.org',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000 https://vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' http://localhost:3000 https://vercel.live; font-src 'self';",
          },
        ],
      },
    ];
  },
};