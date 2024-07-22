import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result.error) {
          setError(result.error);
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to sign up');
        }

        const data = await response.json();
        console.log(data.message); // Log success message

        // Automatically sign in after successful signup
        const signInResult = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (signInResult.error) {
          setError(signInResult.error);
        } else {
          window.location.href = '/dashboard';
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="bg-transparent border border-[#bafd00] p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleAuth}>
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
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#bafd00] text-black px-4 py-2 rounded-full w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="bg-gray-500 text-white px-4 py-2 rounded-full w-full mt-4"
          disabled={loading}
        >
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
}