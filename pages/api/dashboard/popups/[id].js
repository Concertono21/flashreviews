import { MongoClient, ObjectId } from 'mongodb';
import { getToken } from 'next-auth/jwt';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await client.connect();
      const db = client.db('flashreviews');
      const popupsCollection = db.collection('popups');

      const result = await popupsCollection.deleteOne({
        _id: new ObjectId(id),
        user: token.email,
      });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Popup deleted successfully' });
      } else {
        res.status(404).json({ message: 'Popup not found' });
      }
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}