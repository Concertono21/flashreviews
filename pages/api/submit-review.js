import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  console.log('API route hit:', req.method, req.body);
  if (req.method === 'POST') {
    const { title, rating, comments } = req.body;
    if (!title || !rating || !comments) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('flashreviews');
      const collection = db.collection('reviews');

      const review = {
        title,
        rating,
        comments,
        createdAt: new Date(),
      };

      await collection.insertOne(review);

      res.status(201).json({ message: 'Review submitted successfully!' });
    } catch (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({ message: 'Failed to submit review.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}