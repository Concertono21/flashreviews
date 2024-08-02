import Cors from 'cors';
import { MongoClient } from 'mongodb';
import initMiddleware from '../../lib/initMiddleware';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const getCorsMiddleware = async () => {
  await client.connect();
  const db = client.db('flashreviews');
  const websitesCollection = db.collection('websites');
  const websites = await websitesCollection.find().toArray();
  const allowedOrigins = websites.map(website => website.url);

  return initMiddleware(
    Cors({
      methods: ['GET', 'POST', 'OPTIONS'],
      origin: allowedOrigins,
      credentials: true,
    })
  );
};

export default async function handler(req, res) {
  const cors = await getCorsMiddleware();
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
        isNew: 'yes', // Add the isNew field here
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