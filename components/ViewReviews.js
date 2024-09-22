import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ViewReviews = () => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/dashboard/reviews?new=true', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        setError('Failed to load reviews. Please try again.');
      }
    };

    if (session) {
      fetchReviews();
    }
  }, [session]);

  if (!session?.user?.stripePlan) {
    return null;
  }

  return (
    <div
      className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg mx-auto mt-8 max-w-md"
      style={{
        height: '667px', // Fixed height for iPhone 6/7/8
        overflowY: 'scroll',
      }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-white text-center">View Reviews</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {reviews.length > 0 ? (
        <ul className="space-y-6">
          {reviews.slice(0, 5).map((review) => (
            <li key={review._id} className="text-white">
              <p className="font-medium mb-2 text-lg">{review.popupTitle}</p>
              {review.rating !== undefined && (
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        review.rating >= star ? 'text-yellow-400' : 'text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927a1 1 0 011.902 0l1.25 3.847a1 1 0 00.95.69h4.05a1 1 0 01.592 1.806l-3.28 2.388a1 1 0 00-.364 1.118l1.25 3.847a1 1 0 01-1.54 1.118L10 13.347l-3.408 2.488a1 1 0 01-1.54-1.118l1.25-3.847a1 1 0 00-.364-1.118L2.659 9.27a1 1 0 01.592-1.806h4.05a1 1 0 00.95-.69l1.25-3.847z" />
                    </svg>
                  ))}
                </div>
              )}
              <p className="text-gray-300 mb-2">
                {review.comments || 'No comments provided'}
              </p>
              <p className="text-gray-500 text-sm">
                Submitted on: {new Date(review.createdAt).toLocaleString()}
              </p>
              <hr className="border-gray-700 mt-4" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-center">No reviews available.</p>
      )}
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-full w-full mt-6 hover:bg-blue-500 transition-colors duration-200"
        onClick={() => router.push('/dashboard/all-reviews')}
      >
        View All Reviews
      </button>
    </div>
  );
};

export default ViewReviews;