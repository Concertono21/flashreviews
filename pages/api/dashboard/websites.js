import { MongoClient } from 'mongodb';
import { getToken } from 'next-auth/jwt';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const handler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await client.connect();
    const db = client.db('flashreviews');
    const websitesCollection = db.collection('websites');
    const popupsCollection = db.collection('popups');

    if (req.method === 'POST') {
      const { website } = req.body;

      const existingWebsite = await websitesCollection.findOne({
        website,
        user: token.email,
      });

      if (existingWebsite) {
        return res.status(409).json({ message: 'Website already exists' });
      }

      await websitesCollection.insertOne({
        website,
        user: token.email,
      });

      res.status(201).json({ message: 'Website added' });
    } else if (req.method === 'DELETE') {
      const { website } = req.query;

      await websitesCollection.deleteOne({
        website,
        user: token.email,
      });

      await popupsCollection.deleteMany({
        website,
        user: token.email,
      });

      res.status(200).json({ message: 'Website and related pop-ups deleted' });
    } else if (req.method === 'GET') {
      const websites = await websitesCollection.find({ user: token.email }).toArray();
      res.status(200).json({ websites });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};

export default handler;