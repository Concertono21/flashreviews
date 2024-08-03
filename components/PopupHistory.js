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
      <div className="bg-transparent border border-[#bafd00] p-4 rounded-lg w-full max-w-md">
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
                maxWidth: '100%',
                cursor: 'default',
                marginBottom: '10px',
                padding: '10px',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <div
                className="notification-header"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px',
                  position: 'relative',
                  width: '100%',
                }}
              >
                <div
                  className="notification-icon"
                  style={{
                    flex: '0 0 auto',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '5px',
                    marginLeft: '10px',
                  }}
                >
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
                <div
                  className="notification-title-container"
                  style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: 'calc(100% - 40px)',
                    paddingRight: '30px',
                  }}
                >
                  <div
                    className="notification-title"
                    style={{
                      fontWeight: 600,
                      fontSize: '14px',
                      textAlign: 'center',
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      width: '100%',
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
              <div
                className="notification-content"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0 10px 10px',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {popup.enableStars && (
                  <div
                    className="rating"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      margin: 0,
                      marginTop: '5px',
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4"
                        fill="gray"
                        viewBox="0 0 24 24"
                        stroke="none"
                        style={{
                          fontSize: '12px',
                          cursor: 'default',
                          color: 'grey',
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
                <p className="notification-timing" style={{ fontSize: '12px', color: 'black', marginTop: '5px' }}>
                  Timing: {popup.timing} seconds
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No popups created yet.</p>
        )}
      </div>
      <div className="bg-[#242424] border border-[#e8e6df] p-4 rounded-lg mt-4 text-black">
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
        <textarea
          readOnly
          value={generatedCode}
          style={{
            marginTop: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            resize: 'none',
            width: '100%',
            height: '150px',
            fontSize: '12px',
            boxSizing: 'border-box',
            color: 'black',
          }}
        />
      )}
    </div>
  );
};

export default PopupHistory;