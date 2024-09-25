// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import Mailgun from 'mailgun.js';
import formData from 'form-data';

// Initialize Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

export default NextAuth({
  providers: [
    EmailProvider({
      from: `Your App Name <no-reply@${process.env.MAILGUN_DOMAIN}>`,
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        try {
          await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: provider.from,
            to: email,
            subject: 'Sign in to Your App Name',
            text: `Sign in to Your App Name:\n\n${url}\n\n`,
            html: `<p>Sign in to Your App Name:</p><p><a href="${url}">Click here to sign in</a></p>`,
          });
        } catch (error) {
          console.error('Error sending email:', error);
          throw new Error('Error sending email');
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      // Add additional session properties if needed
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // Add additional token properties if needed
      }
      return token;
    },
  },
});