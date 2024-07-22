import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  tls: true, 
  tlsInsecure: true // This is for local development; not recommended for production
});

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await client.connect();
      const db = client.db('flashreviews');
      const { email, password } = req.body;

      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        email,
        password: hashedPassword,
      };

      const result = await db.collection('users').insertOne(newUser);

      // Automatically log in the user after successful signup
      const token = sign({ userId: result.insertedId }, process.env.NEXTAUTH_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token, message: 'User created successfully' });
    } catch (error) {
      console.error('Error during sign up:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;