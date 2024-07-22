// pages/api/verifyMagicLink.js
export default async function handler(req, res) {
  const { token, email } = req.query;

  // Verify the token and email (mocked here as an example)
  if (token && email) {
    // Set a cookie or session for the authenticated user
    res.redirect('/dashboard');
  } else {
    res.status(400).json({ error: 'Invalid or expired magic link' });
  }
}