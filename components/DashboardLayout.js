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

  if (!session?.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black font-sans">
      {/* Navbar */}
      <div className="w-full fixed top-0 bg-black z-50">
        <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
          <div className="relative">
            <button
              className="flex items-center space-x-2 bg-transparent text-white border-2 border-[#3A3A3C] px-4 py-2 rounded-full"
              onClick={handleAccountButtonClick}
            >
              <span className="bg-white text-black text-xl font-bold w-6 h-6 flex items-center justify-center rounded-full border border-black">
                {session?.user?.email?.[0]}
              </span>
              <span className="font-bold text-ellipsis overflow-hidden max-w-[100px] sm:max-w-xs">
                Account ({session?.user?.email})
              </span>
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

          <div className="flex justify-end">
            <button
              className="bg-transparent text-white border-2 border-[#3A3A3C] px-4 py-2 rounded-full"
              onClick={() => {
                const stripeLink = 'https://buy.stripe.com/test_6oEbJX2vY6mz12M4gh';
                const userEmail = session?.user?.email || '';
                window.location.href = `${stripeLink}?prefilled_email=${encodeURIComponent(userEmail)}`;
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 max-w-6xl mx-auto flex flex-col md:space-y-4 space-y-3 px-4 sm:px-6 md:px-8">
        {session?.user?.stripePlan === null ? (
          <div className="flex justify-center w-full">
            {children[0]} {/* Website Manager */}
          </div>
        ) : (
          <>
            <div className="flex justify-center w-full">
              {children[0]} {/* View Reviews */}
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 w-full">
              <div className="flex-grow md:w-1/2 space-y-3">
                {children[1]} {/* Fancy a New Popup */}
              </div>
              <div className="flex-grow md:w-1/2 space-y-3">
                {children[2]} {/* Edit Popup */}
                {children[3]} {/* Active Popups */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;