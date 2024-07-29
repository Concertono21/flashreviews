import Cors from 'cors';
import initMiddleware from '../../lib/initMiddleware';
import getAllowedOrigins from '../../lib/getAllowedOrigins';
import { MongoClient } from 'mongodb';

// Middleware to initialize CORS
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
    })
  );
};

// Initialize the MongoDB client
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  const allowedOrigins = await getAllowedOrigins();
  const cors = initCorsMiddleware(allowedOrigins);

  await cors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { popupId, comments, userEmail, rating } = req.body;

  if (!popupId || !comments || !userEmail) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await client.connect();
    const db = client.db('flashreviews');
    const answersCollection = db.collection('popup_answers');

    const result = await answersCollection.insertOne({
      popupId,
      comments,
      userEmail,
      rating,
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'Answer saved', result });
  } catch (error) {
    console.error('Error saving answer:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
}