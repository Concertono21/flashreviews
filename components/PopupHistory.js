import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaClock, FaGlobe } from 'react-icons/fa';

const styleSettings = {
  "classic-white": {
    backgroundColor: "#fff",
    color: "#000"
  },
  "dark-mode": {
    backgroundColor: "#333",
    color: "#fff"
  },
  "style4": {
    backgroundColor: "#ffcacb",
    color: "#000"
  },
  "style5": {
    backgroundColor: "#ffcd9c",
    color: "#000"
  }
};

const PopupHistory = ({ handleDeletePopup, websites = [], refreshData }) => {
  const [popupHistory, setPopupHistory] = useState([]);
  const [selectedWebsite, setSelectedWebsite] = useState('all');
  const [generatedCode, setGeneratedCode] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.stripePlan) {
      fetch('/api/dashboard/popups', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
      })
        .then(res => res.json())
        .then(data => setPopupHistory(data.popups))
        .catch(err => console.error('Failed to fetch popups:', err));
    }
  }, [session]);

  if (!session?.user?.stripePlan) {
    return null;
  }

  const handleWebsiteChange = (e) => {
    setSelectedWebsite(e.target.value);
    setGeneratedCode(''); // Clear code when changing website
  };

  const handleGenerateCode = () => {
    if (selectedWebsite === 'all') {
      alert('Please select a website to generate the code.');
    } else {
      const code = `<script src="https://flashreviews.co/embed.js" data-website="${selectedWebsite}"></script>`;
      setGeneratedCode(code);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Code copied to clipboard!');
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
      refreshData();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  const filteredPopups = selectedWebsite === 'all'
    ? popupHistory
    : popupHistory.filter(popup => popup.website === selectedWebsite);

  return (
    <div className="bg-[#1C1C1E] border border-[#3A3A3C] p-6 rounded-lg shadow-lg w-full max-w-full mx-auto mt-4">
      <h2 className="text-2xl sm:text-xl font-semibold mb-4 text-[#F0F0F3]">Active Popups</h2>
      <select
        className="w-full p-2 mb-4 border border-[#3A3A3C] rounded bg-[#2C2C2E] text-[#F0F0F3]"
        value={selectedWebsite}
        onChange={handleWebsiteChange}
      >
        <option value="all" key="all">All</option>
        {websites.map((website, index) => (
          <option key={index} value={website.website}>{website.website}</option>
        ))}
      </select>

      <button
        onClick={handleGenerateCode}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full"
      >
        Generate Embed Code
      </button>

      {generatedCode && (
        <div className="bg-[#2C2C2E] p-4 rounded-lg mb-4">
          <p className="text-sm text-[#F0F0F3] mb-2">Embed Code:</p>
          <div className="bg-[#1C1C1E] p-2 rounded-lg text-[#F0F0F3] break-all">
            <code>{generatedCode}</code>
          </div>
          <button
            onClick={handleCopyCode}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-full"
          >
            Copy to Clipboard
          </button>
        </div>
      )}

      <div className="bg-[#2C2C2E] p-4 rounded-lg">
        {Array.isArray(filteredPopups) && filteredPopups.length > 0 ? (
          filteredPopups.map((popup) => (
            <div
              key={popup._id}
              className="bg-[#1C1C1E] p-4 rounded-lg shadow-md mb-4 relative"
              style={{
                backgroundColor: styleSettings[popup.style]?.backgroundColor || '#fff',
                color: styleSettings[popup.style]?.color || '#000',
              }}
            >
              <button
                className="absolute text-[#cecece] hover:text-black transition-colors"
                onClick={() => handleDelete(popup._id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  top: '-10px',
                  left: '165px',
                }}
              >
                &times;
              </button>
              <div className="flex items-start">
                {popup.logo && (
                  <Image
                    src={popup.logo}
                    alt="Logo"
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain', borderRadius: '5px', marginRight: '10px' }}
                  />
                )}
                <div style={{ flexGrow: 1 }}>
                  <p className="font-semibold text-sm" style={{ color: styleSettings[popup.style]?.color || 'black', marginRight: '30px' }}>{popup.title}</p>
                  <p className="text-xs" style={{ color: styleSettings[popup.style]?.color || 'black' }}>
                    <FaClock className="inline-block mr-1" />{popup.timing} seconds
                  </p>
                  <p className="text-xs mb-2" style={{ color: styleSettings[popup.style]?.color || 'black' }}>
                    <FaGlobe className="inline-block mr-1" />{popup.website}
                  </p>
                  {popup.enableStars && (
                    <div className="flex justify-start">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4"
                          fill={popup.enableStars ? 'gold' : 'gray'}
                          viewBox="0 0 24 24"
                          stroke="none"
                          style={{
                            fontSize: '12px',
                            color: popup.enableStars ? 'gold' : 'grey',
                            marginRight: '5px',
                          }}
                        >
                          <path
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          />
                        </svg>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#F0F0F3]">No popups created yet.</p>
        )}
      </div>
    </div>
  );
};

export default PopupHistory;