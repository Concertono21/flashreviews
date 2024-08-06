import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaStar, FaClock, FaGlobe, FaPaintBrush, FaUpload } from 'react-icons/fa';

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
    <div className="bg-transparent p-6 rounded-lg shadow-md w-full max-w-md mt-6 mx-auto">
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
      <div className="bg-transparent p-4 rounded-lg w-full max-w-md mx-auto">
        {Array.isArray(filteredPopups) && filteredPopups.length > 0 ? (
          filteredPopups.map((popup) => (
            <div
              key={popup._id}
              className="notification"
              style={{
                position: 'relative',
                backgroundColor: '#fff',
                borderRadius: '20px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'opacity 0.5s, transform 0.5s',
                opacity: 1,
                transform: 'translateX(0)',
                width: '100%',
                height: '100%', // Adjusted height
                cursor: 'default',
                marginBottom: '10px',
                padding: '10px',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                className="notification-header"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '5px',
                  position: 'relative',
                  width: '100%',
                }}
              >
                <label htmlFor="popupLogo" style={{ cursor: 'pointer', marginRight: '5px' }}>
                  {!popup.logo && <FaUpload style={{ color: '#000' }} />}
                </label>
                {popup.logo && (
                  <Image
                    src={popup.logo}
                    alt="Logo"
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain', borderRadius: '5px', marginRight: '10px' }}
                  />
                )}
                <div
                  className="notification-title-container"
                  style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    paddingRight: '30px',
                  }}
                >
                  <div
                    className="notification-title"
                    style={{
                      fontWeight: 600,
                      fontSize: '14px',
                      textAlign: 'left',
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      color: 'black',
                    }}
                  >
                    {popup.title}
                  </div>
                </div>
                <button
                  className="close-button"
                  onClick={() => handleDelete(popup._id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#cecece',
                    flex: '0 0 auto',
                    alignSelf: 'flex-start',
                    padding: 0,
                    margin: 0,
                    transition: 'color 0.3s',
                    lineHeight: 1,
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '20px',
                    height: '20px',
                    textAlign: 'center',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  &times;
                </button>
              </div>
              {popup.enableStars && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      style={{
                        fontSize: '20px',
                        color: star <= popup.rating ? 'gold' : 'grey',
                        marginRight: '2px',
                      }}
                    />
                  ))}
                </div>
              )}
              <div
                className="notification-content"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                  <FaClock style={{ color: '#000', marginRight: '5px' }} />
                  <span style={{ fontSize: '12px', color: 'black' }}>{popup.timing} seconds</span>
                </div>
                <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                  <FaPaintBrush style={{ color: '#000', marginRight: '5px' }} />
                  <span style={{ fontSize: '12px', color: 'black' }}>{popup.style}</span>
                </div>
                <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                  <FaGlobe style={{ color: '#000', marginRight: '5px' }} />
                  <span style={{ fontSize: '12px', color: 'black' }}>{popup.website}</span>
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