import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ViewReviews = ({ session, reviews }) => {
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log('Fetching new reviews...');
        const response = await fetch('/api/dashboard/reviews?new=true', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.user.accessToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Response Error:', errorData);
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        console.log('Fetched New Reviews Data:', data);
        setReviews(data.reviews.slice(0, 5)); // Get only the last 5 reviews
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load reviews. Please try again.');
      }
    };

    if (session) {
      fetchReviews();
    }
  }, [session]);

  return (
    <div className={`bg-transparent border border-[#bafd00] p-6 rounded-lg shadow-md w-full max-w-md mt-6 ${reviews.length === 0 ? 'h-auto' : ''}`}>
      <h2 className="text-xl font-bold mb-4 text-white">View Reviews</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review._id} className="mb-4 text-white">
              <p><strong>Popup:</strong> {review.popupTitle}</p>
              <p><strong>Comments:</strong> {review.comments || 'No comments provided'}</p>
              {review.rating !== undefined && (
                <div>
                  <strong>Rating:</strong>
                  <div style={{ display: 'flex', marginTop: '5px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4"
                        fill={review.rating >= star ? 'gold' : 'gray'}
                        viewBox="0 0 24 24"
                        stroke="none"
                        style={{ fontSize: '12px', color: 'grey', marginRight: '5px' }}
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              )}
              <p><strong>Submitted on:</strong> {new Date(review.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No reviews available.</p>
      )}
      <button
        className="bg-black text-[#bafd00] px-4 py-2 rounded-full w-full mt-4"
        onClick={() => router.push('/dashboard/all-reviews')}
      >
        View All Reviews
      </button>
    </div>
  );
};

export default ViewReviews;