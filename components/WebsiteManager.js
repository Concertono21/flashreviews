import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const WebsiteManager = ({ addWebsite, websites, deleteWebsite }) => {
  const [website, setWebsite] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    console.log('Session data:', session);
  }, [session]);

  const handleAddWebsite = async () => {
    if (website && !websites.some(w => w.website === website)) {
      try {
        console.log('Attempting to add website:', website);
        console.log('Session accessToken:', session.user.accessToken);

        const response = await fetch('/api/dashboard/websites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`, // Ensure the token is passed
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
      const response = await fetch(`/api/dashboard/websites?${params.toString()}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`, // Ensure the token is passed
        },
      });

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
    <div className="bg-[#1C1C1E] border border-[#3A3A3C] p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-[#F0F0F3]">Fancy a new FlashReviews?</h2>
      <p className="mb-4 text-[#F0F0F3]">Add your domain name to get started, no need to add &quot;https://&quot; or &quot;www.&quot;</p>
      <input
        type="text"
        placeholder="unicorn.com"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="w-full p-2 mb-4 border border-[#3A3A3C] rounded bg-[#2C2C2E] text-[#F0F0F3]"
      />
      <button
        className="bg-[#1C1C1E] text-[#F0F0F3] border border-[#3A3A3C] px-4 py-2 rounded-full w-full"
        onClick={handleAddWebsite}
      >
        Add Website
      </button>
      <div className="mt-4">
        <h3 className="text-lg font-bold text-[#F0F0F3]">Websites</h3>
        <ul className="space-y-4 mt-2">
          {websites.map((site, index) => (
            <li key={index} className="text-[#F0F0F3] flex justify-between items-center">
              <span className="flex-grow">{typeof site.website === 'string' ? site.website : JSON.stringify(site.website)}</span>
              <button
                className="border border-black text-[#F0F0F3] px-4 py-2 w-24 rounded-sm ml-4 transition-all duration-200 bg-transparent hover:bg-gray-300 hover:border-gray-300"
                onClick={() => handleDeleteWebsite(site.website)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebsiteManager;