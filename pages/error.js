import Link from 'next/link';

export default function ErrorPage({ error }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="bg-transparent border border-[#bafd00] p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Authentication Error</h1>
        <p className="text-red-500">{error}</p>
        <Link href="/login" legacyBehavior>
          <a className="text-blue-500 underline mt-4">Go back to login</a>
        </Link>
      </div>
    </div>
  );
}

ErrorPage.getInitialProps = ({ query }) => {
  return {
    error: query.error,
  };
};