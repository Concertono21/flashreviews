import { getSession } from 'next-auth/react';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('flashreviews');
    const reviewsCollection = database.collection('reviews');
    const popupsCollection = database.collection('popups');

    const userEmail = session.user.email;
    console.log(`Fetching popups for user: ${userEmail}`);
    const userPopups = await popupsCollection.find({ user: userEmail }).toArray();
    console.log('User Popups:', userPopups);

    if (userPopups.length === 0) {
      console.log('No popups found for this user.');
      return res.status(200).json({ reviews: [] });
    }

    const popupIds = userPopups.map(popup => popup._id.toString());
    console.log('Popup IDs:', popupIds);

    const reviews = await reviewsCollection.find({ popupId: { $in: popupIds } }).toArray();
    console.log('Fetched Reviews:', reviews);

    const reviewsWithTitles = reviews.map(review => {
      const popup = userPopups.find(p => p._id.toString() === review.popupId);
      return {
        ...review,
        popupTitle: popup ? popup.title : 'Unknown Popup',
      };
    });

    console.log('Reviews with Titles:', reviewsWithTitles);
    res.status(200).json({ reviews: reviewsWithTitles });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
}