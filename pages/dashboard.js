import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import EditPopupReview from '../components/EditPopupReview';
import PreviewPopup from '../components/PreviewPopup';
import ViewReviews from '../components/ViewReviews';
import PopupHistory from '../components/PopupHistory';
import WebsiteManager from '../components/WebsiteManager';
import DashboardLayout from '../components/DashboardLayout';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [popupsCount, setPopupsCount] = useState(0);
  const [popupSettings, setPopupSettings] = useState({
    title: 'Default Title',
    logo: '',
    rating: 0,
    enableStars: true,
    timing: 3,
    style: 'classic-white',
    website: '',
    code: '' // Add the code field
  });
  const [reviews, setReviews] = useState([]);
  const [popupHistory, setPopupHistory] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [newReviewCount, setNewReviewCount] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]); // Include 'router' in the dependency array

  useEffect(() => {
    if (!session) return;

    async function fetchData() {
      try {
        const response = await fetch('/api/dashboard/popups', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.user.accessToken}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch dashboard data');

        const data = await response.json();
        setPopupsCount(data.popups.length);
        setPopupHistory(data.popups);

        const websitesResponse = await fetch('/api/dashboard/websites', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.user.accessToken}`,
          },
        });

        if (!websitesResponse.ok) throw new Error('Failed to fetch websites data');

        const websitesData = await websitesResponse.json();
        setWebsites(websitesData.websites || []);

        const reviewsResponse = await fetch('/api/dashboard/reviews?new=true', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.user.accessToken}`,
          },
        });

        if (!reviewsResponse.ok) throw new Error('Failed to fetch reviews data');

        const reviewsData = await reviewsResponse.json();
        setNewReviewCount(reviewsData.newReviewCount);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load dashboard. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session]);

  const refreshData = async () => {
    if (!session) return;

    try {
      const response = await fetch('/api/dashboard/popups', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch dashboard data');

      const data = await response.json();
      setPopupsCount(data.popups.length);
      setPopupHistory(data.popups);

      const websitesResponse = await fetch('/api/dashboard/websites', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
      });

      if (!websitesResponse.ok) throw new Error('Failed to fetch websites data');

      const websitesData = await websitesResponse.json();
      setWebsites(websitesData.websites || []);

      const reviewsResponse = await fetch('/api/dashboard/reviews?new=true', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
      });

      if (!reviewsResponse.ok) throw new Error('Failed to fetch reviews data');

      const reviewsData = await reviewsResponse.json();
      setNewReviewCount(reviewsData.newReviewCount);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load dashboard. Please try again.');
    }
  };

  const handleSavePopupSettings = async () => {
    try {
      const response = await fetch('/api/dashboard/popups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify({
          ...popupSettings,
          rating: popupSettings.rating ? 'yes' : 'no',
          user: session.user.email,
          code: `
            <script>
              function handleStarHover(star) {
                const stars = document.querySelectorAll('.notification .rating svg');
                stars.forEach((s, index) => {
                  if (index < star) {
                    s.setAttribute('fill', 'gold');
                  } else {
                    s.setAttribute('fill', 'gray');
                  }
                });
              }
              function handleStarClick(star) {
                const stars = document.querySelectorAll('.notification .rating svg');
                stars.forEach((s, index) => {
                  s.setAttribute('fill', index < star ? 'gold' : 'gray');
                });
                document.querySelector('.notification').setAttribute('data-rating', star);
              }
              function submitReview(popupId, userEmail) {
                const comments = document.getElementById('review-comments').value;
                const rating = document.querySelector('.notification').getAttribute('data-rating');
                fetch('/api/save-popup-answer', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    popupId: popupId,
                    comments: comments,
                    userEmail: userEmail,
                    rating: rating ? parseInt(rating) : undefined
                  })
                }).then(response => {
                  if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message); });
                  }
                  return response.json();
                }).then(data => {
                  console.log('Review saved:', data);
                  alert('Thank you for your feedback!');
                }).catch(error => {
                  console.error('Error saving review:', error);
                });
              }
                        </script>
            <div className="notification" style="
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background-color: #fff;
              border-radius: 20px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              display: flex;
              flex-direction: column;
              transition: opacity 0.5s, transform 0.5s;
              opacity: 1;
              width: 300px;
              max-width: 100%;
              cursor: default;
              padding: 10px;
              text-align: center;
              align-items: center;
            ">
              <div className="notification-header" style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                position: relative;
                width: 100%;
              ">
                <div className="notification-icon" style="
                  flex: 0 0 auto;
                  width: 40px;
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 5px;
                  margin-left: 10px;
                ">
                  ${popupSettings.logo ? `<img src="${popupSettings.logo}" alt="Logo" style="width: 100%; height: 100%; object-fit: contain;" />` : ''}
                </div>
                <div className="notification-title-container" style="
                  flex-grow: 1;
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  max-width: calc(100% - 40px);
                  padding-right: 30px;
                ">
                  <div className="notification-title" style="
                    font-weight: 600;
                    font-size: 14px;
                    text-align: justify;
                    white-space: normal;
                    word-wrap: break-word;
                    width: 100%;
                    color: black;
                  ">
                    ${popupSettings.title}
                  </div>
                </div>
                <button className="close-button" style="
                  background: none;
                  border: none;
                  font-size: 20px;
                  cursor: pointer;
                  color: #cecece;
                  flex: 0 0 auto;
                  align-self: flex-start;
                  padding: 0;
                  margin: 0;
                  transition: color 0.3s;
                  line-height: 1;
                  position: absolute;
                  top: 10px;
                  right: 10px;
                  width: 20px;
                  height: 20px;
                  text-align: center;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                " onclick="handleClose()">
                  &times;
                </button>
              </div>
              <div className="notification-content" style="
                display: flex;
                flex-direction: column;
                padding: 0 10px 10px;
                align-items: center;
                width: 100%;
              ">
                ${popupSettings.enableStars ? `
                  <div className="rating" style="
                    display: flex;
                    justify-content: center;
                    margin: 0;
                    margin-top: 5px;
                  ">
                    ${[1, 2, 3, 4, 5].map((star) => `
                      <svg
                        key=${star}
                        onMouseEnter="handleStarHover(${star})"
                        onClick="handleStarClick(${star})"
                        className="w-4 h-4"
                        fill="gray"
                        viewBox="0 0 24 24"
                        stroke="none"
                        style="
                          font-size: 12px;
                          cursor: pointer;
                          color: grey;
                          margin-right: 5px;
                        "
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    `).join('')}
                  </div>
                ` : ''}
                <p className="notification-timing" style="
                  font-size: 12px;
                  color: black;
                  margin-top: 5px;
                ">
                  Timing: ${popupSettings.timing} seconds
                </p>
                <textarea id="review-comments" placeholder="Enter your comments" style="
                  margin-top: 10px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  padding: 10px;
                  resize: none;
                  width: 100%;
                  height: 50px;
                  font-size: 12px;
                  box-sizing: border-box;
                "></textarea>
                <button onclick="submitReview('${popupSettings._id}', '${session.user.email}')" style="
                  background-color: #acacac;
                  color: white;
                  border: none;
                  padding: 10px;
                  cursor: pointer;
                  border-radius: 5px;
                  font-size: 14px;
                  width: 100%;
                  margin-top: 10px;
                ">Submit</button>
              </div>
            </div>
          ` // Create the popup code dynamically
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save popup settings.');
      }

      alert('Popup settings saved.');
      const newPopup = await response.json();
      setPopupHistory([...popupHistory, newPopup.popup]);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to save popup settings. Please try again.');
    }
  };

  const handleDeletePopup = async (id) => {
    try {
      const response = await fetch(`/api/dashboard/popups/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete popup.');
      }

      setPopupHistory(popupHistory.filter(popup => popup._id !== id));
      refreshData();
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to delete popup. Please try again.');
    }
  };

  const addWebsite = (newWebsite) => setWebsites([...websites, newWebsite]);

  const deleteWebsite = async (website) => {
    if (!window.confirm(`Are you sure you want to delete ${website}? All related pop-ups will be lost.`)) return;

    try {
      const params = new URLSearchParams({ website });
      const response = await fetch(`/api/dashboard/websites?${params.toString()}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete website.');
      }

      setWebsites(websites.filter(w => w.website !== website));
      setPopupHistory(popupHistory.filter(popup => popup.website !== website));
      refreshData();
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to delete website. Please try again.');
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'http://localhost:3000/embed.js';
    script.setAttribute('data-website', 'http://localhost:3000/dashboard');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Redirecting...</div>;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center w-full max-w-5xl p-5 bg-black rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-white">{loading ? 'Loading...' : `${newReviewCount} New FlashReviews`}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <WebsiteManager addWebsite={addWebsite} websites={websites} deleteWebsite={deleteWebsite} />
        <ViewReviews session={session} /> {/* Pass session here */}
        <EditPopupReview
          popupSettings={popupSettings}
          handleTitleChange={(e) => setPopupSettings({ ...popupSettings, title: e.target.value })}
          handleLogoChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => setPopupSettings({ ...popupSettings, logo: e.target.result });
              reader.readAsDataURL(file);
            }
          }}
          handleRatingChange={(rating) => setPopupSettings({ ...popupSettings, rating })}
          handleSavePopupSettings={handleSavePopupSettings}
          handlePreviewPopup={() => setIsPreviewOpen(true)}
          handleGenerateCode={() => setGeneratedCode(`<script src="http://localhost:3000/embed.js" data-website="${websites[0].website}"></script>`)}
          handleTimingChange={(timing) => setPopupSettings({ ...popupSettings, timing })}
          handleStyleChange={(e) => setPopupSettings({ ...popupSettings, style: e.target.value })}
          setPopupSettings={setPopupSettings}
          websites={websites}
        />
        <PopupHistory 
          popupHistory={popupHistory} 
          handleDeletePopup={handleDeletePopup} 
          websites={websites} 
          refreshData={refreshData} 
        />
      </div>
      {isPreviewOpen && (
        <PreviewPopup popupSettings={popupSettings} handleClose={() => setIsPreviewOpen(false)} />
      )}
    </DashboardLayout>
  );
}