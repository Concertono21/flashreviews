import { MongoClient } from 'mongodb';
import { getToken } from 'next-auth/jwt';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const handler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await client.connect();
    const db = client.db('flashreviews');
    const popupsCollection = db.collection('popups');
    const userPopups = await popupsCollection.find({ user: token.email }).toArray();
    res.status(200).json(userPopups);
  } catch (error) {
    console.error('Error fetching user popups:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};

export default handler;