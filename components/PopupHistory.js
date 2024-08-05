import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const PopupHistory = ({ handleDeletePopup, websites = [], refreshData }) => {
  const [popupHistory, setPopupHistory] = useState([]);
  const [selectedWebsite, setSelectedWebsite] = useState('all');
  const [generatedCode, setGeneratedCode] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log('Fetching popups for user:', session.user.email); // Debugging info
      fetch('/api/dashboard/popups', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log('Fetched Popups Data:', data); // Debugging info
          setPopupHistory(data.popups);
        })
        .catch(err => console.error('Failed to fetch popups:', err));
    }
  }, [session]);

  const handleWebsiteChange = (e) => {
    setSelectedWebsite(e.target.value);
  };

  const filteredPopups = selectedWebsite === 'all'
    ? popupHistory
    : popupHistory.filter(popup => popup.website === selectedWebsite);

  const handleGenerateCode = () => {
    if (selectedWebsite === 'all') {
      alert('Please select a website to generate the code.');
    } else {
      const code = `<script src="${process.env.NEXT_PUBLIC_BASE_URL}/embed.js" data-website="${selectedWebsite}"></script>`;
      setGeneratedCode(code);
    }
  };

  const handleDelete = async (id) => {
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

      handleDeletePopup(id);
      refreshData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="bg-transparent border border-[#bafd00] p-6 rounded-lg shadow-md w-full max-w-md mt-6">
      <h2 className="text-xl font-bold mb-4 text-white">Active Pop Up</h2>
      <select
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        value={selectedWebsite}
        onChange={handleWebsiteChange}
      >
        <option value="all" key="all">All</option>
        {websites.map((website, index) => (
          <option key={index} value={website.website}>{website.website}</option>
        ))}
      </select>
      <div className="popup-container">
        {Array.isArray(filteredPopups) && filteredPopups.length > 0 ? (
          filteredPopups.map((popup) => (
            <div key={popup._id} className="popup">
              <div className="notification">
                <div className="notification-header">
                  <div className="notification-icon">
                    {popup.logo && (
                      <Image
                        src={popup.logo}
                        alt="Logo"
                        width={40}
                        height={40}
                        style={{ objectFit: 'contain' }}
                      />
                    )}
                  </div>
                  <div className="notification-title-container">
                    <div className="notification-title">
                      {popup.title}
                    </div>
                  </div>
                  <button
                    className="close-button"
                    onClick={() => handleDelete(popup._id)}
                  >
                    &times;
                  </button>
                </div>
                <div className="notification-content">
                  {popup.enableStars && (
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4 star"
                          fill="gray"
                          viewBox="0 0 24 24"
                          stroke="none"
                        >
                          <path
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          />
                        </svg>
                      ))}
                    </div>
                  )}
                  <p className="notification-timing">
                    Timing: {popup.timing} seconds
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No popups created yet.</p>
        )}
      </div>
      <div className="bg-transparent border border-[#bafd00] p-4 rounded-lg mt-4 text-white">
        <h3 className="text-lg font-bold mb-2">Make your FlashReviews live 🎉</h3>
        <p>Paste this snippet in the &lt;head&gt; of your website.</p>
      </div>
      <button
        className="bg-black text-[#bafd00] px-4 py-2 rounded-full w-full mt-4"
        onClick={handleGenerateCode}
      >
        Generate Code
      </button>
      {generatedCode && (
        <div
          className="bg-transparent border border-[#bafd00] p-4 rounded-lg mt-4 text-white relative"
          style={{ wordWrap: 'break-word' }}
        >
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: 'white', marginRight: '30px' }}>
            {generatedCode}
          </pre>
          <button
            onClick={handleCopyCode}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              margin: 0,
            }}
          >
            <Image
              src="/copy-icon.png" // Ensure this file is in the public folder
              alt="Copy Icon"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default PopupHistory;