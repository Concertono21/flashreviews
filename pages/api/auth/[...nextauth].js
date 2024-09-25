import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import Mailgun from 'mailgun.js';
import formData from 'form-data';

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