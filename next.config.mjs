// next.config.mjs
export default {
  env: {
    NEXT_PUBLIC_BASE_URL: 'https://flashreviews.vercel.app',
    MAILGUN_API_KEY: 'your_mailgun_api_key',
    MAILGUN_DOMAIN: 'your_mailgun_domain',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://flashreviews.vercel.app; object-src 'none';",
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://concertono21.tumblr.com https://flashreviews.vercel.app', // Allow specific origins
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
        ],
      },
    ];
  },
};