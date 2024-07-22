"use client"; // Ensure this is a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const sendMagicLink = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/sendMagicLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage('Error sending email');
    }
  };

  const handleConnectClick = () => {
    router.push('/dashboard'); // Assuming /dashboard is the route for the user's dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to FlashReviews</h1>
        <form onSubmit={sendMagicLink}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          {message && <p className="text-red-500 text-xs italic">{message}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Magic Link
            </button>
            <button
              type="button"
              onClick={handleConnectClick}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Connect
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}