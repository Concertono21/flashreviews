import { MongoClient } from 'mongodb';
import Cors from 'cors';

// Middleware to initialize CORS
const initMiddleware = (middleware) => {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: '*', // Allow all origins for testing; restrict to your domain in production
  })
);

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { website } = req.query;
  if (!website) {
    return res.status(400).json({ message: 'Website is required' });
  }

  try {
    await client.connect();
    const db = client.db('flashreviews');
    const popupsCollection = db.collection('popups');

    const popups = await popupsCollection.find({ website }).toArray();
    if (popups.length === 0) {
      return res.status(404).json({ message: 'No popups found for this website' });
    }

    res.status(200).json({ popups });
  } catch (error) {
    console.error('Error fetching popups:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
}