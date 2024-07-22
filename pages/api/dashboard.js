import { getSession } from 'next-auth/react';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsInsecure: true // For local development
  });

  try {
    await client.connect();
    const db = client.db('flashreviews');
    
    const user = await db.collection('users').findOne({ email: session.user.email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const data = {
      popupsCount: user.popupsCount || 0,
      reviews: user.reviews || [],
      popupHistory: user.popupHistory || [],
      websites: user.websites || []
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load dashboard data' });
  } finally {
    await client.close();
  }
}