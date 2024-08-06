import React, { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaClock, FaUpload } from 'react-icons/fa';

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
  const [timing, setTiming] = useState(popupSettings.timing || 3);

  const handleTimingChangeInternal = (e) => {
    const newTiming = e.target.value;
    setTiming(newTiming);
    handleTimingChange(newTiming);
  };

  const handleWebsiteChange = (e) => {
    setPopupSettings({ ...popupSettings, website: e.target.value });
  };

  const handleStarToggle = () => {
    const newRatingEnabled = !popupSettings.enableStars;
    handleRatingChange(newRatingEnabled);
    if (!newRatingEnabled) {
      setPopupSettings({ ...popupSettings, rating: 0 });
    }
  };

  const currentStyle = styleSettings[popupSettings.style] || styleSettings["classic-white"];

  return (
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
        width: '250px',
        padding: '10px',
        marginBottom: '20px'
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
              width={30}
              height={30}
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
            textAlign: 'center',
            flex: 1,
            margin: '0 10px'
          }}
        />
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
            padding: 0,
            margin: 0,
            transition: 'color 0.3s',
            lineHeight: 1,
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
      {popupSettings.enableStars && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '5px 0' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => handleRatingChange(star)}
              style={{
                fontSize: '14px',
                cursor: 'pointer',
                color: star <= popupSettings.rating ? 'gold' : 'grey',
                marginRight: '2px',
              }}
            />
          ))}
        </div>
      )}
      <div className="notification-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={popupSettings.enableStars}
            onChange={handleStarToggle}
            style={{ marginRight: '5px' }}
          />
          <span style={{ fontSize: '12px', color: currentStyle.color }}>Star</span>
        </div>
        <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
          <FaClock style={{ color: currentStyle.color, marginRight: '5px' }} />
          <input
            type="number"
            id="popupTiming"
            value={timing}
            onChange={handleTimingChangeInternal}
            style={{ width: '50px', padding: '2px 5px', textAlign: 'center', backgroundColor: currentStyle.backgroundColor, color: currentStyle.color, border: '1px solid grey' }}
            min="0"
          />
        </div>
        <div className="mb-2">
          <select
            id="popupStyle"
            value={popupSettings.style || 'classic-white'}
            onChange={handleStyleChange}
            style={{ width: '100%', padding: '2px', fontSize: '12px', backgroundColor: currentStyle.backgroundColor, color: currentStyle.color, border: '1px solid grey' }}
          >
            <option value="classic-white">Classic White</option>
            <option value="dark-mode">Dark Mode</option>
            <option value="apple-notification">Apple Notification</option>
            <option value="style4">Style 4</option>
            <option value="style5">Style 5</option>
          </select>
        </div>
        <div className="flex space-x-2 w-full">
          <button
            className="bg-black text-[#bafd00] px-4 py-2 rounded-full w-full"
            onClick={handleSavePopupSettings}
            style={{ fontSize: '12px' }}
          >
            Save Settings
          </button>
          <button
            className="bg-black text-[#bafd00] px-4 py-2 rounded-full w-full"
            onClick={handlePreviewPopup}
            style={{ fontSize: '12px' }}
          >
            Preview Popup
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopupReview;