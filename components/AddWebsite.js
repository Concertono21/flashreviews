import React, { useState } from 'react';

const AddWebsite = ({ addWebsite, websites, deleteWebsite }) => {
  const [website, setWebsite] = useState('');

  const handleAdd = () => {
    if (website && !websites.some(w => w.website === website)) {
      addWebsite({ website });
      setWebsite('');
    } else {
      alert('Website already exists or invalid input.');
    }
  };

  return (
    <div className="bg-[#1C1C1E] border border-gray-700 p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-100">Add Website</h2>
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-[#2C2C2E] text-gray-200 focus:outline-none focus:border-[#bafd00]"
        placeholder="Enter website URL"
      />
      <button
        className="bg-[#bafd00] text-black px-4 py-2 rounded-lg w-full font-semibold hover:bg-[#a8e600] transition-colors duration-200"
        onClick={handleAdd}
      >
        Add
      </button>
      <ul className="mt-6 space-y-2">
        {websites.map((site, index) => (
          <li key={index} className="text-gray-300 flex justify-between items-center bg-[#2C2C2E] p-3 rounded-lg">
            {site.website}
            <button
              className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-500 transition-colors duration-200"
              onClick={() => deleteWebsite(site.website)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddWebsite;