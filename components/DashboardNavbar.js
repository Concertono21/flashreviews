import React from 'react';

const DashboardNavbar = ({
  accountMenuOpen,
  handleAccountButtonClick,
  handleBillingClick,
  handleLogout,
  router,
  session
}) => (
  <div className="w-full bg-[#1C1C1E] text-gray-300 fixed top-0 z-10">
    <nav className="flex items-center justify-between p-2 max-w-6xl mx-auto">
      <div className="relative flex items-center space-x-2">
        <button
          className="flex items-center space-x-2 bg-[#2C2C2E] text-gray-300 border-none px-4 py-2 rounded-full hover:bg-[#3A3A3C] transition-colors"
          onClick={handleAccountButtonClick}
        >
          <span className="bg-gray-300 text-black text-xl font-bold w-6 h-6 flex items-center justify-center rounded-full">
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
          <div className="absolute mt-2 w-48 bg-[#2C2C2E] rounded shadow-lg">
            <button
              className="flex items-center w-full px-4 py-2 text-left text-gray-300 hover:bg-[#3A3A3C] transition-colors"
              onClick={handleBillingClick}
            >
              <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V5a3 3 0 00-3-3H6a3 3 0 00-3 3v4m0 0v10a3 3 0 003 3h8a3 3 0 003-3V9m-6 3l-4-4m0 0l4-4m-4 4h12.75" />
              </svg>
              Billing
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-left text-gray-300 hover:bg-[#3A3A3C] transition-colors"
              onClick={handleLogout}
            >
              <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10v1m-6 5l4-4m0 0l-4-4m4 4H3" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
      <button
        className="bg-[#2C2C2E] text-gray-300 border-none px-4 py-2 rounded-full hover:bg-[#3A3A3C] transition-colors"
        onClick={() => router.push('/add-website')}
      >
        Get Started
      </button>
    </nav>
  </div>
);

export default DashboardNavbar;