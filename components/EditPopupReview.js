import React, { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaClock, FaCloudUploadAlt, FaGlobe, FaPaintBrush } from 'react-icons/fa';

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
    <div
      className="bg-gray-100 border border-gray-300 p-6 rounded-2xl shadow-xl mx-auto mt-8 w-full max-w-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Edit Popup
      </h2>
      <div className="bg-white p-6 rounded-xl shadow-md">
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
              width: '100%',
            }}
          >
            {/* Header */}
            <div
              className="notification-header"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                position: 'relative',
              }}
            >
              <div style={{ width: '50px', height: '50px', marginRight: '10px' }}>
                <label htmlFor="popupLogo" style={{ cursor: 'pointer', display: 'block' }}>
                  {!popupSettings.logo && (
                    <FaCloudUploadAlt style={{ color: currentStyle.color, fontSize: '24px', width: '100%', height: '100%' }} />
                  )}
                  {popupSettings.logo && (
                    <div onClick={() => document.getElementById('popupLogo').click()}>
                      <Image
                        src={popupSettings.logo}
                        alt="Logo"
                        width={50}
                        height={50}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="popupLogo"
                  onChange={handleLogoChange}
                  style={{ display: 'none' }}
                />
              </div>
              <div style={{ flex: 1 }}>
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
                    width: '100%',
                    marginBottom: '10px',
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '-5px' }}>
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
              </div>
            </div>

            {/* Content */}
            {/* Popup content remains unchanged */}
          </div>
        )}
        <div className="mt-6">
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center w-1/2">
              <FaClock className="text-gray-500 mr-2" />
              <input
                type="number"
                id="popupTiming"
                value={timing}
                onChange={handleTimingChangeInternal}
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-400"
                min="0"
              />
            </div>
            <div className="flex items-center w-1/2">
              <FaPaintBrush className="text-gray-500 mr-2" />
              <select
                id="popupStyle"
                value={popupSettings.style || 'classic-white'}
                onChange={handleStyleChange}
                className="w-full p-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-gray-400"
              >
                <option value="classic-white">Classic White</option>
                <option value="dark-mode">Dark Mode</option>
                <option value="apple-notification">Apple Notification</option>
                <option value="style4">Style 4</option>
                <option value="style5">Style 5</option>
              </select>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <FaGlobe className="text-gray-500 mr-2" />
            <select
              id="popupWebsite"
              value={popupSettings.website || ''}
              onChange={handleWebsiteChange}
              className="w-full p-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-gray-400"
            >
              <option value="" disabled>Select a website</option>
              {websites.map((websiteObj, index) => (
                <option key={index} value={websiteObj.website}>
                  {websiteObj.website}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              className="bg-gray-800 text-white px-5 py-3 rounded-full w-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={handleSavePopupSettings}
            >
              Save Settings
            </button>
            <button
              className="bg-gray-800 text-white px-5 py-3 rounded-full w-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={handlePreviewPopup}
            >
              Preview Popup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPopupReview;