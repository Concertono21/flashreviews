const Pricing = () => {
  return (
    <section id="pricing" className="pricing bg-black py-20 text-center text-white">
      <h1 className="text-3xl font-bold">Make your product a no-brainer purchase</h1>
      <div className="pricing-container flex justify-center mt-8">
        <div className="pricing-card bg-black border-2 border-green-400 p-6 rounded-lg shadow-lg mx-4" style={{ borderColor: '#bafd00' }}>
          <h2 className="text-2xl font-bold">Appetizer</h2>
          <p>Start with a taste of FlashReviews</p>
          <div className="price my-4">
            <span className="old-price text-gray-500 line-through">$18</span>
            <span className="new-price text-2xl font-bold">$9</span> USD
          </div>
          <ul className="list-disc text-left mx-auto max-w-xs">
            <li>Unlimited FlashReviews</li>
            <li>1 website</li>
            <li>Simple analytics</li>
          </ul>
          <a href="signin.html" className="get-started bg-green-500 text-black px-6 py-3 rounded mt-6 inline-block" style={{ backgroundColor: '#bafd00' }}>Get Started</a>
          <p className="note mt-4">Pay once. Access forever.</p>
        </div>
        <div className="pricing-card popular bg-black border-2 border-green-400 p-6 rounded-lg shadow-lg mx-4 relative" style={{ borderColor: '#bafd00' }}>
          <div className="tag bg-green-400 text-black absolute top-0 right-0 px-2 py-1" style={{ backgroundColor: '#bafd00' }}>POPULAR</div>
          <h2 className="text-2xl font-bold">Main Course</h2>
          <p>Add FlashReviews to all your websites, let&apos;s go!</p>
          <div className="price my-4">
            <span className="old-price text-gray-500 line-through">$38</span>
            <span className="new-price text-2xl font-bold">$19</span> USD
          </div>
          <ul className="list-disc text-left mx-auto max-w-xs">
            <li>Unlimited FlashReviews</li>
            <li>Unlimited websites</li>
            <li>Simple analytics</li>
          </ul>
          <a href="signin.html" className="get-started bg-orange-500 text-black px-6 py-3 rounded mt-6 inline-block" style={{ backgroundColor: '#bafd00' }}>Get Started</a>
          <p className="note mt-4">Pay once. Access forever.</p>
        </div>
      </div>
      <p className="disclaimer mt-6">*With great power comes great responsibility. Use FlashReviews responsibly.</p>
    </section>
  );
};

export default Pricing;