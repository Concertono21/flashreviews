import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FiX } from 'react-icons/fi'; // Import the close (X) icon

const WebsiteManager = ({ addWebsite, websites, deleteWebsite }) => {
  const [website, setWebsite] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    console.log('Session data:', session);
  }, [session]);

  const handleAddWebsite = async () => {
    if (website && !websites.some((w) => w.website === website)) {
      try {
        const response = await fetch('/api/dashboard/websites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          body: JSON.stringify({ website }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add website.');
        }

        addWebsite({ website });
        setWebsite('');
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    } else {
      alert('Website already exists or invalid input.');
    }
  };

  const handleDeleteWebsite = async (website) => {
    try {
      const params = new URLSearchParams({ website });
      const response = await fetch(
        `/api/dashboard/websites?${params.toString()}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete website.');
      }

      deleteWebsite(website);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  return (
    <div className="bg-gray-100 border border-gray-300 p-6 rounded-2xl shadow-xl mx-auto mt-8 w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Add a New Website
      </h2>
      <p className="mb-6 text-gray-600 text-center">
        Enter your domain name to get started. No need to add{' '}
        <span className="text-gray-500">https://</span> or{' '}
        <span className="text-gray-500">www.</span>
      </p>
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="example.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-l-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          className="bg-gray-800 text-white px-5 py-3 rounded-r-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={handleAddWebsite}
        >
          Add
        </button>
      </div>
      {websites.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Your Websites
          </h3>
          <ul className="space-y-2">
            {websites.map((site, index) => (
              <li
                key={index}
                className="flex items-center text-gray-800"
              >
                <span className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                  {typeof site.website === 'string'
                    ? site.website
                    : JSON.stringify(site.website)}
                </span>
                <button
                  className="text-gray-500 hover:text-red-600 transition-colors duration-200 focus:outline-none p-0 m-0 leading-none flex-shrink-0 ml-2"
                  onClick={() => handleDeleteWebsite(site.website)}
                  aria-label="Delete website"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WebsiteManager;