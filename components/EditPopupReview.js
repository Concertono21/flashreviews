import React, { useState } from 'react';

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

  return (
    <div className="bg-transparent border border-[#bafd00] p-6 rounded-lg shadow-md w-full max-w-md mt-6">
      <h2 className="text-xl font-bold mb-4 text-white">Edit Pop-Up Review</h2>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="popupTitle">Title</label>
        <input
          type="text"
          id="popupTitle"
          value={popupSettings.title}
          onChange={handleTitleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="popupLogo">Upload Logo</label>
        <input
          type="file"
          id="popupLogo"
          onChange={handleLogoChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="popupWebsite">Website</label>
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
        <label className="block text-white mb-2">Enable Star Rating</label>
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
        <label className="block text-white mb-2" htmlFor="popupTiming">Timing (seconds)</label>
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
        <label className="block text-white mb-2" htmlFor="popupStyle">Popup Style</label>
        <select
          id="popupStyle"
          value={popupSettings.style}
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
      <div className="flex space-x-4">
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
  );
};

export default EditPopupReview;