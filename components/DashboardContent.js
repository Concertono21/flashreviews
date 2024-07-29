import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import EditPopupReview from './EditPopupReview';
import PreviewPopup from './PreviewPopup';
import AddWebsite from './AddWebsite';
import ViewReviews from './ViewReviews';
import PopupHistory from './PopupHistory';
import Script from 'next/script';

const DashboardContent = () => {
  const { data: session, status } = useSession();
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
  });
  const [reviews, setReviews] = useState([]);
  const [popupHistory, setPopupHistory] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    if (session) {
      fetchData();
      fetchReviews();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/dashboard/popups', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPopupsCount(data.popups.length);
        setPopupHistory(data.popups);
        setWebsites(data.websites || []);
      } else {
        throw new Error('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load dashboard. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/dashboard/reviews?new=true', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
      } else {
        throw new Error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews. Please try again.');
    }
  };

  const handleTitleChange = (e) => {
    setPopupSettings({ ...popupSettings, title: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPopupSettings({ ...popupSettings, logo: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRatingChange = (rating) => {
    setPopupSettings({ ...popupSettings, rating });
  };

  const handleTimingChange = (timing) => {
    setPopupSettings({ ...popupSettings, timing });
  };

  const handleStyleChange = (e) => {
    setPopupSettings({ ...popupSettings, style: e.target.value });
  };

  const handleSavePopupSettings = async () => {
    if (!websites[0]) {
      setError('No websites available to save popup settings');
      return;
    }

    const newPopup = { ...popupSettings, id: popupHistory.length, website: websites[0].website };

    try {
      const response = await fetch('/api/dashboard/popups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify(newPopup),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save popup settings.');
      }

      alert('Popup settings saved.');
      setPopupHistory([...popupHistory, newPopup]);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to save popup settings. Please try again.');
    }
  };

  const handlePreviewPopup = () => {
    setIsPreviewOpen(true);
  };

  const handleGenerateCode = () => {
    const code = `<script src="${process.env.NEXT_PUBLIC_BASE_URL}/embed.js" data-website="${websites[0].website}"></script>`;
    setGeneratedCode(code);
  };

  const handleDeletePopup = async (id) => {
    setPopupHistory(popupHistory.filter(popup => popup.id !== id));

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
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to delete popup. Please try again.');
    }
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const addWebsite = async (website) => {
    try {
      const response = await fetch('/api/dashboard/websites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify({ website }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add website.');
      }

      const newWebsites = [...websites, { website }];
      setWebsites(newWebsites);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to add website. Please try again.');
    }
  };

  const deleteWebsite = async (website) => {
    if (window.confirm(`Are you sure you want to delete ${website}? All related pop-ups will be lost.`)) {
      try {
        const response = await fetch(`/api/dashboard/websites/${website}`, {
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
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to delete website. Please try again.');
      }
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://flashreviews.vercel.app/embed.js';
    script.setAttribute('data-website', 'https://flashreviews.vercel.app/');
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
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-5xl p-5 bg-black rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-white">{loading ? 'Loading...' : `${popupsCount} FlashReviews`}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <AddWebsite addWebsite={addWebsite} websites={websites} deleteWebsite={deleteWebsite} />
        <ViewReviews reviews={reviews} />
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
          handleGenerateCode={() => setGeneratedCode(`<script src="https://flashreviews.vercel.app/embed.js" data-website="${websites[0].website}"></script>`)}
          handleTimingChange={(timing) => setPopupSettings({ ...popupSettings, timing })}
          handleStyleChange={(e) => setPopupSettings({ ...popupSettings, style: e.target.value })}
          setPopupSettings={setPopupSettings}
          websites={websites}
        />
        <PopupHistory 
          popupHistory={popupHistory} 
          handleDeletePopup={handleDeletePopup} 
          websites={websites} 
        />
      </div>
      {isPreviewOpen && (
        <PreviewPopup 
          popupSettings={popupSettings} 
          handleClose={handleClosePreview} 
        />
      )}
    </div>
  );
};

export default DashboardContent;