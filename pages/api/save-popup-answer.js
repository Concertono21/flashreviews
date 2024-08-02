import Cors from 'cors';
import initMiddleware from '../../lib/initMiddleware';
import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const handler = nextConnect();

// Temporary CORS Configuration to allow all origins
const initCorsMiddleware = () => {
  return initMiddleware(
    Cors({
      methods: ['GET', 'POST', 'OPTIONS'],
      origin: '*', // Allow all origins temporarily
    })
  );
};

handler.use(async (req, res, next) => {
  const cors = initCorsMiddleware();
  await cors(req, res);
  next();
});

handler.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

handler.post(async (req, res) => {
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

    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.status(200).json({ message: 'Answer saved', result });
  } catch (error) {
    console.error('Error saving answer:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

export default handler;