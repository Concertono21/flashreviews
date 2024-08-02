import React from 'react';

const DashboardNavbar = ({
  accountMenuOpen,
  handleAccountButtonClick,
  handleBillingClick,
  handleLogout,
  router,
  session
}) => (
  <div className="w-full bg-black text-white fixed top-0 z-50">
    <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
      <div className="relative flex-grow">
        <button
          className="flex items-center space-x-2 bg-transparent text-white border-2 border-[#bafd00] px-4 py-2 rounded-full"
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
          <div className="absolute mt-2 w-48 bg-transparent border border-[#bafd00] rounded shadow-lg">
            <button
              className="flex items-center w-full px-4 py-2 text-left text-[#bafd00] hover:bg-white"
              onClick={handleBillingClick}
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V5a3 3 0 00-3-3H6a3 3 0 00-3 3v4m0 0v10a3 3 0 003 3h8a3 3 0 003-3V9m-6 3l-4-4m0 0l4-4m-4 4h12.75" />
              </svg>
              Billing
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-left text-[#bafd00] hover:bg-white"
              onClick={handleLogout}
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10v1m-6 5l4-4m0 0l-4-4m4 4H3" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="flex-grow"></div>
      <button
        className="bg-transparent text-white border-2 border-[#bafd00] px-4 py-2 rounded-full"
        onClick={() => router.push('/add-website')}
      >
        Get Started
      </button>
    </nav>
  </div>
);

export default DashboardNavbar;