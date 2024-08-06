import React, { useState } from 'react';
import Image from 'next/image';
import { FaUpload, FaStar, FaClock } from 'react-icons/fa';

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

  const currentStyle = styleSettings[popupSettings.style] || styleSettings["classic-white"];

  return (
    <div
      id="editPopup"
      className={popupSettings.style}
      style={{
        position: 'relative',
        backgroundColor: currentStyle.backgroundColor,
        color: currentStyle.color,
        borderRadius: '20px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'opacity 0.5s, transform 0.5s',
        opacity: 1,
        transform: 'translateX(0)',
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
          padding: '10px',
          position: 'relative',
        }}
      >
        <div
          className="notification-icon"
          style={{
            flex: '0 0 auto',
            width: '30px',
            height: '30px',
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
              width={30}
              height={30}
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
            maxWidth: 'calc(100% - 30px)',
            paddingRight: '20px',
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
        <div className="mb-2">
          <input
            type="text"
            id="popupTitle"
            value={popupSettings.title}
            onChange={handleTitleChange}
            style={{
              backgroundColor: currentStyle.backgroundColor,
              color: currentStyle.color,
              border: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              width: '100%',
              margin: '5px 0'
            }}
          />
        </div>
        <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="popupLogo" style={{ cursor: 'pointer', marginRight: '5px' }}>
            <FaUpload style={{ color: currentStyle.color }} />
          </label>
          <input
            type="file"
            id="popupLogo"
            onChange={handleLogoChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
          <label className="block mb-0" style={{ color: currentStyle.color, marginRight: '5px' }}>Enable Star Rating</label>
          <input
            type="checkbox"
            checked={popupSettings.enableStars}
            onChange={(e) => handleRatingChange(e.target.checked)}
            style={{ marginLeft: '5px' }}
          />
        </div>
        <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
          <FaClock style={{ color: currentStyle.color, marginRight: '5px' }} />
          <input
            type="number"
            id="popupTiming"
            value={timing}
            onChange={handleTimingChangeInternal}
            style={{ width: '50px', padding: '2px 5px', textAlign: 'center' }}
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-0" htmlFor="popupStyle" style={{ color: currentStyle.color }}>Popup Style</label>
          <select
            id="popupStyle"
            value={popupSettings.style || 'classic-white'}
            onChange={handleStyleChange}
            style={{ width: '100%', padding: '2px', marginTop: '5px' }}
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
          >
            Save Settings
          </button>
          <button
            className="bg-black text-[#bafd00] px-4 py-2 rounded-full w-full"
            onClick={handlePreviewPopup}
          >
            Preview Popup
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopupReview;