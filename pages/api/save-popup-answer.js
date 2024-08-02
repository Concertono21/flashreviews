import Cors from 'cors';
import { MongoClient } from 'mongodb';
import initMiddleware from '../../lib/initMiddleware';
import getAllowedOrigins from '../../lib/getAllowedOrigins';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Initialize the cors middleware
const initCorsMiddleware = (allowedOrigins) => {
  return initMiddleware(
    Cors({
      methods: ['GET', 'POST', 'OPTIONS'],
      origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    })
  );
};

export default async function handler(req, res) {
  const allowedOrigins = await getAllowedOrigins();
  const cors = initCorsMiddleware(allowedOrigins);

  await cors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { popupId, comments, userEmail, rating } = req.body;

    if (!popupId || !comments || !userEmail) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      await client.connect();
      const db = client.db('flashreviews');
      const answersCollection = db.collection('reviews');

      const result = await answersCollection.insertOne({
        popupId,
        comments,
        userEmail,
        rating,
        isNew: 'yes',
        createdAt: new Date(),
      });

      // Dynamically set the Access-Control-Allow-Origin header
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.status(200).json({ message: 'Answer saved', result });
    } catch (error) {
      console.error('Error saving answer:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}