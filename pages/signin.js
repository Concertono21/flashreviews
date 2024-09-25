// pages/signup.js
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Optionally, you can create the user in your database if you need to store additional info
      // But since you're using NextAuth.js, you can let it handle user creation

      // Initiate passwordless sign-in via email
      const result = await signIn('email', {
        redirect: false,
        email,
        callbackUrl: '/dashboard',
      });

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess('Check your email for a sign-in link.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Failed to send sign-in email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="bg-transparent border border-[#bafd00] p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#bafd00] text-black px-4 py-2 rounded-full w-full"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}