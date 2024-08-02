import Cors from 'cors';
import { MongoClient } from 'mongodb';
import initMiddleware from '../../lib/initMiddleware';
import getAllowedOrigins from '../../lib/getAllowedOrigins';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const cors = async (req, res) => {
  const allowedOrigins = await getAllowedOrigins();
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
  )(req, res);
};

export default async function handler(req, res) {
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