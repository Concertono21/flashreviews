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
        setReviews(data.reviews);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load reviews. Please try again.');
      }
    };

    if (session) {
      fetchReviews();
    }
  }, [session]);

  // If stripePlan is null, return null and don't render the component
  if (!session?.user?.stripePlan) {
    return null;
  }

  return (
    <div className={`bg-[#1C1C1E] border border-[#3A3A3C] p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6`}>
      <h2 className="text-2xl font-semibold mb-4 text-[#F0F0F3]">View Reviews</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.slice(0, 5).map((review) => (
            <li key={review._id} className="mb-4 text-[#F0F0F3]">
              <p><strong>Popup:</strong> {review.popupTitle}</p>
              <p><strong>Comments:</strong> {review.comments || 'No comments provided'}</p>
              {review.rating !== undefined && (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <strong style={{ marginRight: '5px' }}>Rating:</strong>
                  <div style={{ display: 'flex' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4"
                        fill={review.rating >= star ? 'gold' : 'gray'}
                        viewBox="0 0 24 24"
                        stroke="none"
                        style={{ fontSize: '12px', color: 'grey', marginRight: '2px' }}
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
        <p className="text-[#F0F0F3]">No reviews available.</p>
      )}
      <button
        className="bg-[#1C1C1E] text-[#F0F0F3] border border-[#3A3A3C] px-4 py-2 rounded-full w-full mt-4"
        onClick={() => router.push('/dashboard/all-reviews')}
      >
        View All Reviews
      </button>
    </div>
  );
};

export default ViewReviews;