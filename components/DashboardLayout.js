import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FaCreditCard, FaSignOutAlt } from 'react-icons/fa'; // Import new icons

const DashboardLayout = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const handleLogout = () => {
    router.push('/');
  };

  const handleBillingClick = () => {
    alert('Billing page is under construction.');
  };

  const handleAccountButtonClick = () => {
    setAccountMenuOpen(!accountMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black font-sans">
      <div className="w-full fixed top-0 bg-black z-50">
        <div className="flex items-center justify-between p-6 max-w-6xl mx-auto">
          {/* Account Button on the Left */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 bg-transparent text-white border-2 border-[#3A3A3C] px-4 py-2 rounded-full"
              onClick={handleAccountButtonClick}
            >
              <span className="bg-white text-black text-xl font-bold w-6 h-6 flex items-center justify-center rounded-full border border-black">
                {session?.user?.email?.[0]}
              </span>
              <span className="font-bold">Account ({session?.user?.email})</span>
              <svg
                className={`w-4 h-4 transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {accountMenuOpen && (
              <div className="absolute mt-2 w-48 bg-black border border-[#3A3A3C] rounded-lg shadow-lg">
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-left text-[#F0F0F3] transition-all duration-200 bg-transparent border border-black hover:bg-gray-300 hover:border-gray-300"
                  onClick={handleBillingClick}
                >
                  <FaCreditCard className="w-5 h-5 mr-2" />
                  <span>Billing</span>
                </button>
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-left text-[#F0F0F3] transition-all duration-200 bg-transparent border border-black hover:bg-gray-300 hover:border-gray-300"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="w-5 h-5 mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Get Started Button on the Right */}
          <div className="flex justify-end">
            <button
              className="bg-transparent text-white border-2 border-[#3A3A3C] px-4 py-2 rounded-full"
              onClick={() => router.push('/add-website')}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 max-w-6xl mx-auto flex flex-col space-y-6">
        {/* View Reviews Section - Independent */}
        <div className="flex justify-center">
          {children[0]}
        </div>

        {/* Other Sections */}
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="flex-grow md:w-1/2 space-y-6">
            {children[1]} {/* Fancy a New Popup */}
          </div>
          <div className="flex-grow md:w-1/2 space-y-6">
            {children[2]} {/* Edit Popup */}
            {children[3]} {/* Active Popups */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;