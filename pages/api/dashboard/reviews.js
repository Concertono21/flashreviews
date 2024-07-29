import { getToken } from 'next-auth/jwt';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  console.log('Handling request:', req.method, req.url);

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('flashreviews');
    const reviewsCollection = database.collection('reviews');
    const popupsCollection = database.collection('popups');

    const userEmail = token.email;
    console.log(`Fetching popups for user: ${userEmail}`);
    const userPopups = await popupsCollection.find({ user: userEmail }).toArray();
    console.log('User Popups:', userPopups);

    const popupIds = userPopups.map(popup => popup._id.toString());
    console.log('Popup IDs:', popupIds);

    if (popupIds.length === 0) {
      console.log('No popups found for this user.');
      return res.status(200).json({ reviews: [], newReviewCount: 0 });
    }

    const fetchNewReviews = req.query.new === 'true';

    const filter = { 
      popupId: { $in: popupIds } 
    };
    if (fetchNewReviews) {
      filter.isNew = true;
    }

    const reviews = await reviewsCollection.find(filter).sort({ createdAt: -1 }).toArray();
    console.log('Fetched Reviews:', reviews);

    const reviewsWithTitles = reviews.map(review => {
      const popup = userPopups.find(p => p._id.toString() === review.popupId);
      return {
        ...review,
        popupTitle: popup ? popup.title : 'Unknown Popup',
      };
    });
    console.log('Reviews with Titles:', reviewsWithTitles);

    const newReviewCount = await reviewsCollection.countDocuments({ popupId: { $in: popupIds }, isNew: true });

    if (!fetchNewReviews) {
      await reviewsCollection.updateMany({ popupId: { $in: popupIds } }, { $set: { isNew: false } });
    }

    res.status(200).json({ reviews: reviewsWithTitles, newReviewCount });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
}