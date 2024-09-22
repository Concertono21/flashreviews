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
    <div className="bg-gray-100 border border-gray-300 p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Active Popups
      </h2>
      <select
        className="w-full p-3 mb-6 border border-gray-300 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
        value={selectedWebsite}
        onChange={handleWebsiteChange}
      >
        <option value="all" key="all">All Websites</option>
        {websites.map((website, index) => (
          <option key={index} value={website.website}>{website.website}</option>
        ))}
      </select>

      <button
        onClick={handleGenerateCode}
        className="bg-gray-800 text-white px-5 py-3 rounded-full mb-6 w-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Generate Embed Code
      </button>

      {generatedCode && (
        <div className="bg-white p-4 rounded-xl mb-6 shadow-md">
          <p className="text-sm text-gray-800 mb-2 font-medium">Embed Code:</p>
          <div className="bg-gray-100 p-3 rounded-lg text-gray-800 break-all font-mono text-xs">
            <code>{generatedCode}</code>
          </div>
          <button
            onClick={handleCopyCode}
            className="bg-green-600 text-white px-4 py-2 rounded-full mt-4 w-full hover:bg-green-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Copy to Clipboard
          </button>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-md">
        {Array.isArray(filteredPopups) && filteredPopups.length > 0 ? (
          filteredPopups.map((popup) => (
            <div
              key={popup._id}
              className="relative bg-white p-4 rounded-xl shadow-sm mb-6"
              style={{
                backgroundColor: styleSettings[popup.style]?.backgroundColor || '#fff',
                color: styleSettings[popup.style]?.color || '#000',
              }}
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition-colors duration-200 focus:outline-none"
                onClick={() => handleDelete(popup._id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
                aria-label="Delete popup"
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
                    className="object-contain rounded-md mr-4"
                  />
                )}
                <div style={{ flexGrow: 1 }}>
                  <p className="font-semibold text-lg mb-2" style={{ color: styleSettings[popup.style]?.color || '#000' }}>
                    {popup.title}
                  </p>
                  <p className="text-sm flex items-center mb-1" style={{ color: styleSettings[popup.style]?.color || '#000' }}>
                    <FaClock className="inline-block mr-2" />
                    {popup.timing} seconds
                  </p>
                  <p className="text-sm flex items-center mb-2" style={{ color: styleSettings[popup.style]?.color || '#000' }}>
                    <FaGlobe className="inline-block mr-2" />
                    {popup.website}
                  </p>
                  {popup.enableStars && (
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-5 h-5"
                          fill={popup.rating >= star ? 'gold' : 'gray'}
                          viewBox="0 0 24 24"
                          stroke="none"
                          style={{
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
          <p className="text-gray-800 text-center">No popups created yet.</p>
        )}
      </div>
    </div>
  );
};

export default PopupHistory;