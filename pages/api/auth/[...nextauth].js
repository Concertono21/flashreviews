import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        await client.connect();
        const db = client.db('flashreviews');
        const user = await db.collection('users').findOne({ email: credentials.email });

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          const accessToken = jwt.sign({ id: user._id }, process.env.NEXTAUTH_SECRET, { expiresIn: '1h' });
          return { id: user._id, email: user.email, accessToken }; // Set the correct accessToken
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken; // Ensure accessToken is set
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken; // Ensure accessToken is set
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true
  }
});