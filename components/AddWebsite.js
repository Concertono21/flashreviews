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
    <div className="bg-transparent border border-[#bafd00] p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-white">Add Website</h2>
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
      />
      <button
        className="bg-black text-[#bafd00] px-4 py-2 rounded-full w-full"
        onClick={handleAdd}
      >
        Add
      </button>
      <ul className="mt-4">
        {websites.map((site, index) => (
          <li key={index} className="text-white flex justify-between items-center">
            {site.website}
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-full ml-4"
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