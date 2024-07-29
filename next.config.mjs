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
        ],
      },
    ];
  },
};