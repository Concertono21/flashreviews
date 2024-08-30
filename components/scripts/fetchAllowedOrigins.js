// scripts/fetchAllowedOrigins.js

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function fetchAllowedOrigins() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('flashreviews');
    const websitesCollection = db.collection('websites');
    const websites = await websitesCollection.find().toArray();
    const allowedOrigins = websites.map(website => website.website);

    // Write allowed origins to a JSON file
    const filePath = path.join(__dirname, 'allowedOrigins.json');
    fs.writeFileSync(filePath, JSON.stringify(allowedOrigins));
  } catch (error) {
    console.error('Error fetching allowed origins:', error);
    process.exit(1); // Exit with an error code
  } finally {
    await client.close();
  }
}

fetchAllowedOrigins();