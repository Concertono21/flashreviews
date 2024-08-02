import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function getAllowedOrigins() {
  try {
    await client.connect();
    const db = client.db('flashreviews');
    const websitesCollection = db.collection('websites');
    const websites = await websitesCollection.find().toArray();
    return websites.map(website => website.website);
  } catch (error) {
    console.error('Error fetching allowed origins:', error);
    return [];
  } finally {
    await client.close();
  }
}

export default getAllowedOrigins;