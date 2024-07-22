import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const handler = async (req, res) => {
  try {
    await client.connect();
    const db = client.db('flashreviews');
    const designsCollection = db.collection('popupDesigns');
    const designs = await designsCollection.find().toArray();
    res.status(200).json(designs);
  } catch (error) {
    console.error('Error fetching designs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};

export default handler;