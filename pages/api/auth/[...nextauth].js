// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb'; // Import your clientPromise
import Mailgun from 'mailgun.js';
import formData from 'form-data';
import jwt from 'jsonwebtoken'; // Import jwt if you're generating access tokens

export default NextAuth({
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier: email, url }) {
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({
          username: 'api',
          key: process.env.MAILGUN_API_KEY,
        });

        const mailData = {
          from: `Your App Name <no-reply@${process.env.MAILGUN_DOMAIN}>`,
          to: email,
          subject: 'Sign in to Your App Name',
          text: `Sign in to Your App Name:\n\n${url}\n\n`,
          html: `<p>Sign in to Your App Name:</p><p><a href="${url}">Click here to sign in</a></p>`,
        };

        try {
          await mg.messages.create(process.env.MAILGUN_DOMAIN, mailData);
        } catch (error) {
          console.error('Error sending email:', error);
          throw new Error('Error sending email');
        }
      },
      from: `Your App Name <no-reply@${process.env.MAILGUN_DOMAIN}>`,
      maxAge: 15 * 60, // Magic link valid for 15 minutes
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
      session.user.accessToken = token.accessToken;
      session.user.stripePlan = token.stripePlan;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id;
        token.email = user.email;
        token.stripePlan = user.stripePlan;

        // Generate an access token if needed
        token.accessToken = jwt.sign(
          { id: token.id },
          process.env.NEXTAUTH_SECRET,
          { expiresIn: '1h' }
        );
      }
      return token;
    },
  },
});