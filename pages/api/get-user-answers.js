import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { user } = req.query;

    if (!user) {
      return res.status(400).json({ message: 'User is required' });
    }

    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db('flashreviews');
      const collection = database.collection('reviews');

      const answers = await collection.find({ user }).toArray();

      res.status(200).json({ answers });
    } catch (error) {
      console.error('Error fetching answers:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}