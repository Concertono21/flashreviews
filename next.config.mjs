import fs from 'fs';
import path from 'path';

let allowedOrigins = [];

try {
  const allowedOriginsPath = path.join(__dirname, 'scripts', 'allowedOrigins.json');
  if (fs.existsSync(allowedOriginsPath)) {
    allowedOrigins = JSON.parse(fs.readFileSync(allowedOriginsPath, 'utf-8'));
  }
} catch (error) {
  console.error('Error loading allowed origins:', error);
}

export default {
  env: {
    NEXT_PUBLIC_BASE_URL: 'https://www.flashreviews.co',
    MAILGUN_API_KEY: 'your_mailgun_api_key',
    MAILGUN_DOMAIN: 'your_mailgun_domain',
  },
  async headers() {
    const corsHeaders = allowedOrigins.map(origin => ({
      key: 'Access-Control-Allow-Origin',
      value: origin,
    }));

    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          ...corsHeaders,
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.flashreviews.co https://js.stripe.com/v3; object-src 'none';",
          },
        ],
      },
    ];
  },
};