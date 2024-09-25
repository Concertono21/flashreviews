// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import nodemailer from "nodemailer";

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.mailgun.org
  port: process.env.SMTP_PORT, // e.g., 587
  auth: {
    user: process.env.SMTP_USER, // e.g., postmaster@admin.flashreviews.co
    pass: process.env.SMTP_PASS, // Your SMTP password
  },
});

export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST, // e.g., smtp.mailgun.org
        port: process.env.SMTP_PORT, // e.g., 587
        auth: {
          user: process.env.SMTP_USER, // e.g., postmaster@admin.flashreviews.co
          pass: process.env.SMTP_PASS, // Your SMTP password
        },
      },
      from: `FlashReviews <no-reply@${process.env.MAILGUN_DOMAIN}>`,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Ensure this matches your login page route
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
});