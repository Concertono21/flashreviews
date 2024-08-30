import React, { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaClock, FaUpload, FaGlobe, FaPaintBrush } from 'react-icons/fa';

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

const EditPopupReview = ({
  popupSettings,
  handleTitleChange,
  handleLogoChange,
  handleRatingChange,
  handleSavePopupSettings,
  handlePreviewPopup,
  handleTimingChange,
  handleStyleChange,
  setPopupSettings,
  websites,
}) => {
  const [timing, setTiming] = useState(popupSettings?.timing || 3);

  // Check if stripePlan is null, and if so, don't render the component
  if (!popupSettings || popupSettings.stripePlan === null) {
    return null;
  }

  const handleTimingChangeInternal = (e) => {
    const newTiming = e.target.value;
    setTiming(newTiming);
    handleTimingChange(newTiming);
  };

  const handleWebsiteChange = (e) => {
    setPopupSettings({ ...popupSettings, website: e.target.value });
  };

  const handleStarToggle = () => {
    const newRatingEnabled = !popupSettings?.enableStars;
    handleRatingChange(newRatingEnabled);
    setPopupSettings({
      ...popupSettings,
      enableStars: newRatingEnabled,
      rating: newRatingEnabled ? popupSettings.rating : 0,
    });
  };

  const currentStyle = styleSettings[popupSettings?.style] || styleSettings["classic-white"];

  return (
    <div className={`bg-[#1C1C1E] border border-[#3A3A3C] p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6`}>
      <h2 className="text-2xl font-semibold mb-4 text-[#F0F0F3]">Edit Popup</h2>
      <div className="bg-[#2C2C2E] p-4 rounded-lg shadow-lg">
        {popupSettings && (
          <div
            id="editPopup"
            className={popupSettings.style}
            style={{
              backgroundColor: currentStyle.backgroundColor,
              color: currentStyle.color,
              borderRadius: '20px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              padding: '10px',
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
              }}
            >
              <label htmlFor="popupLogo" style={{ cursor: 'pointer', marginRight: '5px' }}>
                {!popupSettings.logo && <FaUpload style={{ color: currentStyle.color }} />}
              </label>
              <input
                type="file"
                id="popupLogo"
                onChange={handleLogoChange}
                style={{ display: 'none' }}
              />
              {popupSettings.logo && (
                <div onClick={() => document.getElementById('popupLogo').click()}>
                  <Image
                    src={popupSettings.logo}
                    alt="Logo"
                    width={50}
                    height={50}
                    style={{ objectFit: 'contain', borderRadius: '5px', marginRight: '10px' }}
                  />
                </div>
              )}
              <input
                type="text"
                value={popupSettings.title}
                onChange={handleTitleChange}
                style={{
                  backgroundColor: currentStyle.backgroundColor,
                  color: currentStyle.color,
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  textAlign: 'left',
                  flex: 1,
                  marginLeft: '10px'
                }}
              />
            </div>
            {/* Move stars and checkbox here */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px',marginleft: '-100px' }}>
              <input
                type="checkbox"
                checked={popupSettings.enableStars}
                onChange={handleStarToggle}
                style={{ marginRight: '15px' }}
              />
              <div style={{ display: 'flex' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    style={{
                      fontSize: '15px',
                      cursor: 'pointer',
                      color: popupSettings.enableStars ? (star <= popupSettings.rating ? 'gold' : 'grey') : 'grey',
                      marginRight: '1px',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="notification-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                  <FaClock style={{ color: currentStyle.color, marginRight: '5px' }} />
                  <input
                    type="number"
                    id="popupTiming"
                    value={timing}
                    onChange={handleTimingChangeInternal}
                    style={{
                      width: '50px',
                      padding: '2px 5px',
                      textAlign: 'center',
                      backgroundColor: currentStyle.backgroundColor,
                      color: currentStyle.color,
                      border: 'none',
                      borderBottom: '1px solid grey'
                    }}
                    min="0"
                  />
                </div>
                <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                  <FaPaintBrush style={{ color: currentStyle.color, marginRight: '5px' }} />
                  <select
                    id="popupStyle"
                    value={popupSettings.style || 'classic-white'}
                    onChange={handleStyleChange}
                    style={{
                      padding: '2px',
                      fontSize: '12px',
                      backgroundColor: currentStyle.backgroundColor,
                      color: currentStyle.color,
                      border: 'none',
                      borderBottom: '1px solid grey'
                    }}
                  >
                    <option value="classic-white">Classic White</option>
                    <option value="dark-mode">Dark Mode</option>
                    <option value="apple-notification">Apple Notification</option>
                    <option value="style4">Style 4</option>
                    <option value="style5">Style 5</option>
                  </select>
                </div>
              </div>
              <div className="mb-2" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <FaGlobe style={{ color: currentStyle.color, marginRight: '5px' }} />
                <select
                  id="popupWebsite"
                  value={popupSettings.website || ''}
                  onChange={handleWebsiteChange}
                  style={{
                    width: '100%',
                    padding: '2px',
                    fontSize: '12px',
                    backgroundColor: currentStyle.backgroundColor,
                    color: currentStyle.color,
                    border: 'none',
                    borderBottom: '1px solid grey'
                  }}
                >
                  <option value="" disabled>Select a website</option>
                  {websites.map((websiteObj, index) => (
                    <option key={index} value={websiteObj.website}>
                      {websiteObj.website}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-2 w-full">
                <button
                  className="bg-[#1C1C1E] text-[#F0F0F3] border border-[#3A3A3C] px-4 py-2 rounded-full w-full"
                  onClick={handleSavePopupSettings}
                  style={{ fontSize: '12px' }}
                >
                  Save Settings
                </button>
                <button
                  className="bg-[#1C1C1E] text-[#F0F0F3] border border-[#3A3A3C] px-4 py-2 rounded-full w-full"
                  onClick={handlePreviewPopup}
                  style={{ fontSize: '12px' }}
                >
                  Preview Popup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPopupReview;