import React, { useState } from 'react';
import Image from 'next/image';

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
  handleGenerateCode,
  handleTimingChange,
  handleStyleChange,
  setPopupSettings,
  websites,
}) => {
  const [timing, setTiming] = useState(popupSettings.timing || 3);

  const handleTimingChangeInternal = (e) => {
    const newTiming = e.target.value;
    setTiming(newTiming);
    handleTimingChange(newTiming);
  };

  const handleWebsiteChange = (e) => {
    setPopupSettings({ ...popupSettings, website: e.target.value });
  };

  const currentStyle = styleSettings[popupSettings.style] || styleSettings["classic-white"];

  return (
    <div
      id="editPopupNotification"
      className={popupSettings.style}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: currentStyle.backgroundColor,
        color: currentStyle.color,
        borderRadius: '20px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'opacity 0.5s, transform 0.5s',
        opacity: 1,
        transform: 'translateX(0)',
        width: '300px',
        maxWidth: '100%',
        cursor: 'default',
        zIndex: 1000, // Ensure popup is above other elements
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
          {popupSettings.logo && (
            <Image
              src={popupSettings.logo}
              alt="Logo"
              width={40}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          )}
          {!popupSettings.logo && (
            <input
              type="file"
              id="popupLogo"
              onChange={handleLogoChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
            />
          )}
        </div>
        <div
          className="notification-title-container"
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxWidth: 'calc(100% - 40px)',
            paddingRight: '30px',
          }}
        >
          <input
            type="text"
            id="popupTitle"
            value={popupSettings.title}
            onChange={handleTitleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
            placeholder="Enter title"
            style={{
              backgroundColor: currentStyle.backgroundColor,
              color: currentStyle.color,
            }}
          />
          {popupSettings.enableStars && (
            <div
              className="rating"
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
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
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
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
        <button
          className="close-button"
          onClick={handleSavePopupSettings}
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
          alignItems: 'flex-start',
        }}
      >
        <div className="mb-4 w-full">
          <label className="block text-black mb-2" htmlFor="popupWebsite">Website</label>
          <select
            id="popupWebsite"
            value={popupSettings.website || ''}
            onChange={handleWebsiteChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
            style={{
              backgroundColor: currentStyle.backgroundColor,
              color: currentStyle.color,
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
        <div className="mb-4 w-full">
          <label className="block text-black mb-2">Enable Star Rating</label>
          <select
            value={popupSettings.rating ? 'yes' : 'no'}
            onChange={(e) => handleRatingChange(e.target.value === 'yes')}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
            style={{
              backgroundColor: currentStyle.backgroundColor,
              color: currentStyle.color,
            }}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="mb-4 w-full">
          <label className="block text-black mb-2" htmlFor="popupTiming">Timing (seconds)</label>
          <input
            type="number"
            id="popupTiming"
            value={timing}
            onChange={handleTimingChangeInternal}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
            min="0"
            style={{
              backgroundColor: currentStyle.backgroundColor,
              color: currentStyle.color,
            }}
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-black mb-2" htmlFor="popupStyle">Popup Style</label>
          <select
            id="popupStyle"
            value={popupSettings.style || 'classic-white'}
            onChange={handleStyleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
            style={{
              backgroundColor: currentStyle.backgroundColor,
              color: currentStyle.color,
            }}
          >
            <option value="classic-white">Classic White</option>
            <option value="dark-mode">Dark Mode</option>
            <option value="apple-notification">Apple Notification</option>
            <option value="style4">Style 4</option>
            <option value="style5">Style 5</option>
          </select>
        </div>
        <textarea
          placeholder="Add your comments here..."
          className="text-black"
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            resize: 'none',
            width: '100%',
            height: '50px',
            fontSize: '12px',
            boxSizing: 'border-box',
            backgroundColor: currentStyle.backgroundColor,
            color: currentStyle.color,
          }}
        ></textarea>
        <div className="flex space-x-4 w-full">
          <button
            className="bg-black text-[#bafd00] px-4 py-2 rounded-full w-full"
            onClick={handleSavePopupSettings}
            style={{
              backgroundColor: currentStyle.backgroundColor,
              color: currentStyle.color,
              border: `1px solid ${currentStyle.color}`
            }}
          >
            Save Settings
          </button>
          <button
            className="bg-black text-[#bafd00] px-4 py-2 rounded-full w-full"
            onClick={handlePreviewPopup}
            style={{
              backgroundColor: currentStyle.backgroundColor,
              color: currentStyle.color,
              border: `1px solid ${currentStyle.color}`
            }}
          >
            Preview Popup
          </button>
          <button
            className="bg-black text-[#bafd00] px-4 py-2 rounded-full w-full"
            onClick={handleGenerateCode}
            style={{
              backgroundColor: currentStyle.backgroundColor,
              color: currentStyle.color,
              border: `1px solid ${currentStyle.color}`
            }}
          >
            Generate Code
          </button>
        </div>
      </div>
    );
  };
  
  export default EditPopupReview;