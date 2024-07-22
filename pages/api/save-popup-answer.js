import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { popupId, comments, userEmail, rating } = req.body;

    if (!popupId || !userEmail || (rating === undefined && !comments.trim())) {
      return res.status(400).json({ message: 'Popup ID, user email, and either comments or rating are required' });
    }

    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db('flashreviews');
      const collection = database.collection('reviews');

      const reviewData = {
        popupId,
        userEmail,
        createdAt: new Date(),
        isNew: true // Mark the review as new
      };

      if (comments.trim()) {
        reviewData.comments = comments;
      }

      if (rating !== undefined) {
        reviewData.rating = rating;
      }

      const result = await collection.insertOne(reviewData);

      res.status(201).json({ message: 'Review saved successfully', result });
    } catch (error) {
      console.error('Error saving review:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}