import React, { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaRegStar, FaTimes, FaRegClock, FaPalette, FaCheckSquare, FaSquare } from 'react-icons/fa';

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
  const currentStyle = styleSettings[popupSettings.style] || styleSettings["classic-white"];

  const handleTimingChangeInternal = (e) => {
    const newTiming = e.target.value;
    setTiming(newTiming);
    handleTimingChange(newTiming);
  };

  const handleWebsiteChange = (e) => {
    setPopupSettings({ ...popupSettings, website: e.target.value });
  };

  return (
    <div
      className="popup-container"
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
        padding: '10px',
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
          <input
            type="file"
            id="popupLogo"
            onChange={handleLogoChange}
            style={{ display: 'none' }}
          />
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
              fontWeight: 600,
              fontSize: '14px',
              textAlign: 'left',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              width: '100%',
              color: currentStyle.color,
            }}
          />
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
          alignItems: 'flex-start',
          padding: '0 10px 10px',
        }}
      >
        <div className="flex items-center mb-2">
          <label className="mr-2">Enable Star Rating</label>
          <button
            onClick={() => handleRatingChange(!popupSettings.rating)}
            className="text-xl"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: popupSettings.rating ? 'gold' : 'gray',
            }}
          >
            {popupSettings.rating ? <FaCheckSquare /> : <FaSquare />}
          </button>
        </div>
        <div className="flex items-center mb-2">
          <label className="mr-2">Timing (seconds)</label>
          <input
            type="number"
            value={timing}
            onChange={handleTimingChangeInternal}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
            min="0"
          />
          <FaRegClock className="ml-2" />
        </div>
        <div className="flex items-center mb-2">
          <label className="mr-2">Popup Style</label>
          <select
            value={popupSettings.style || 'classic-white'}
            onChange={handleStyleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          >
            <option value="classic-white">Classic White</option>
            <option value="dark-mode">Dark Mode</option>
            <option value="style4">Style 4</option>
            <option value="style5">Style 5</option>
          </select>
          <FaPalette className="ml-2" />
        </div>
        {popupSettings.enableStars && (
          <div
            className="rating"
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
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
                  cursor: 'pointer',
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
          }}
        ></textarea>
      </div>
      <div className="flex space-x-4 mt-4">
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
  );
};

export default EditPopupReview;