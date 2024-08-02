export default {
  env: {
    NEXT_PUBLIC_BASE_URL: 'https://flashreviews.vercel.app',
    MAILGUN_API_KEY: 'your_mailgun_api_key',
    MAILGUN_DOMAIN: 'your_mailgun_domain',
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
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