// pages/api/sendMagicLink.js
import axios from 'axios';
import crypto from 'crypto';

export default async function handler(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      console.error("No email provided");
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate a token
    const token = crypto.randomBytes(20).toString('hex');
    const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verifyMagicLink?token=${token}&email=${email}`;

    const data = {
      from: 'FlashReviews <postmaster@' + process.env.MAILGUN_DOMAIN + '>',
      to: email,
      subject: 'Your Magic Link',
      text: `Click this link to log in: ${magicLink}`,
    };

    const response = await axios.post(
      `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`,
      new URLSearchParams(data).toString(),
      {
        auth: {
          username: 'api',
          password: process.env.MAILGUN_API_KEY,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status === 200) {
      res.status(200).json({ message: 'Magic link sent' });
    } else {
      console.error("Mailgun error:", response.data);
      res.status(500).json({ error: 'Error sending email' });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: 'Unexpected error' });
    }
  }
}