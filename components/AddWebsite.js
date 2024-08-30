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
    <div className="bg-[#1C1C1E] border border-[#2C2C2E] p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-100">Add Website</h2>
      <p className="text-gray-500 mb-4">Add your domain name to get started, no need to add &quot;https://&quot; or &quot;www.&quot;</p>
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="w-full p-3 mb-4 border-none rounded-lg bg-[#2C2C2E] text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3A3A3C]"
        placeholder="unicorn.com"
      />
      <button
        className="bg-[#3A3A3C] text-gray-200 px-4 py-2 rounded-lg w-full font-semibold hover:bg-[#48484A] transition-colors duration-200"
        onClick={handleAdd}
      >
        Add Website
      </button>
      <h3 className="text-xl font-semibold mt-6 text-gray-100">Websites</h3>
      <ul className="mt-4 space-y-2">
        {websites.map((site, index) => (
          <li key={index} className="text-gray-300 flex justify-between items-center bg-[#2C2C2E] p-3 rounded-lg">
            {site.website}
            <button
              className="bg-[#48484A] text-white px-3 py-1 rounded-lg hover:bg-[#5A5A5C] transition-colors duration-200"
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