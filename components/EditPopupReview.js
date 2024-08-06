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
      id="editPopup"
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
        padding: '20px'
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
          <div
            className="notification-title"
            style={{
              fontWeight: 600,
              fontSize: '14px',
              textAlign: 'justify',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              width: '100%',
              color: currentStyle.color,
            }}
          >
            {popupSettings.title}
          </div>
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
      <div className="notification-content" style={{ display: 'flex', flexDirection: 'column', padding: '0 10px 10px', alignItems: 'flex-start' }}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="popupTitle" style={{ color: currentStyle.color }}>Title</label>
          <input
            type="text"
            id="popupTitle"
            value={popupSettings.title}
            onChange={handleTitleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="popupLogo" style={{ color: currentStyle.color }}>Upload Logo</label>
          <input
            type="file"
            id="popupLogo"
            onChange={handleLogoChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          />
          {popupSettings.logo && (
            <div className="flex justify-center mt-2">
              <Image
                src={popupSettings.logo}
                alt="Logo"
                width={40}
                height={40}
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="popupWebsite" style={{ color: currentStyle.color }}>Website</label>
          <select
            id="popupWebsite"
            value={popupSettings.website || ''}
            onChange={handleWebsiteChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          >
            <option value="" disabled>Select a website</option>
            {websites.map((websiteObj, index) => (
              <option key={index} value={websiteObj.website}>
                {websiteObj.website}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2" style={{ color: currentStyle.color }}>Enable Star Rating</label>
          <select
            value={popupSettings.rating ? 'yes' : 'no'}
            onChange={(e) => handleRatingChange(e.target.value === 'yes')}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="popupTiming" style={{ color: currentStyle.color }}>Timing (seconds)</label>
          <input
            type="number"
            id="popupTiming"
            value={timing}
            onChange={handleTimingChangeInternal}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
            min="0"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="popupStyle" style={{ color: currentStyle.color }}>Popup Style</label>
          <select
            id="popupStyle"
            value={popupSettings.style || 'classic-white'}
            onChange={handleStyleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          >
            <option value="classic-white">Classic White</option>
            <option value="dark-mode">Dark Mode</option>
            <option value="apple-notification">Apple Notification</option>
            <option value="style4">Style 4</option>
            <option value="style5">Style 5</option>
          </select>
        </div>
        <div className="flex space-x-4 w-full">
          <button
            className="bg-black text-[#bafd00] px-4 py-2 rounded-full w-full"
            onClick={handleSavePopupSettings}
          >
            Save Settings
          </button>
          <button
            className="bg-black text-[#bafd00] px-4 py-2 rounded-full w-full"
            onClick={handlePreviewPopup}
          >
            Preview Popup
          </button>
          <button
            className="bg-black text-[#bafd00] px-4 py-2 rounded-full w-full"
            onClick={handleGenerateCode}
          >
            Generate Code
          </button>
        </div>
      </div>
    </div>
  );
};
