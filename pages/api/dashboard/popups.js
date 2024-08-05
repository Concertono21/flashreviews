import { MongoClient } from 'mongodb';
import { getToken } from 'next-auth/jwt';
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
  origin: '*' // Update this to restrict allowed origins if needed
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    console.log('Unauthorized: No token provided');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  console.log('User token:', token.email);

  try {
    await client.connect();
    const db = client.db('flashreviews');
    const popupsCollection = db.collection('popups');

    if (req.method === 'POST') {
      const { title, logo, rating, timing, style, website, code, enableStars } = req.body;

      // Validate required fields
      if (!title || !logo || rating === undefined || !timing || !style || !website || !code || enableStars === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Validate rating
      const validRating = rating === 'yes' ? true : rating === 'no' ? false : null;
      if (validRating === null) {
        return res.status(400).json({ message: 'Rating must be "yes" or "no"' });
      }

      // Validate timing
      const validTiming = parseInt(timing, 10);
      if (isNaN(validTiming) || validTiming < 0) {
        return res.status(400).json({ message: 'Timing must be a non-negative integer' });
      }

      // Validate style
      const validStyles = ['classic-white', 'dark-mode', 'apple-notification', 'style4', 'style5'];
      if (!validStyles.includes(style)) {
        return res.status(400).json({ message: 'Invalid style' });
      }

      const newPopup = {
        title,
        logo,
        rating: validRating,
        timing: validTiming,
        style,
        website,
        user: token.email,
        enableStars: enableStars,
        code, // Store the entire popup code
      };

      const result = await popupsCollection.insertOne(newPopup);
      console.log('New popup created:', newPopup);

      return res.status(201).json({ message: 'Popup saved successfully', popup: { ...newPopup, _id: result.insertedId } });
    } else if (req.method === 'GET') {
      console.log(`Fetching popups for user: ${token.email}`);
      const popups = await popupsCollection.find({ user: token.email }).toArray();
      console.log('Fetched Popups:', popups);

      return res.status(200).json({ popups });
    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
}