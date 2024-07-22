// next.config.mjs

export default {
  env: {
    NEXT_PUBLIC_BASE_URL: 'https://flashreviews-j8un272ai-concertono21s-projects.vercel.app',
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
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live; object-src 'none';",
          },
        ],
      },
    ];
  },
};