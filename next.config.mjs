import { MongoClient } from 'mongodb';

async function fetchAllowedOrigins() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('flashreviews');
    const websitesCollection = db.collection('websites');
    const websites = await websitesCollection.find().toArray();
    const allowedOrigins = websites.map(website => website.website);
    return allowedOrigins;
  } catch (error) {
    console.error('Error fetching allowed origins:', error);
    return [];
  } finally {
    await client.close();
  }
}

const allowedOrigins = await fetchAllowedOrigins();

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