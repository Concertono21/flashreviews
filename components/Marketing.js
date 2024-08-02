const Marketing = () => {
  return (
    <section id="marketing" className="marketing bg-black py-20 text-center">
      <div className="marketing-content max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">97% of visitors aren&apos;t ready to buy</h1>
        <p className="text-xl mt-4 text-white sm:text-2xl md:text-3xl">All the time and money spent on ads, SEO, and content marketing goes to waste. Potential customers leave and never come back.</p>
        <div className="marketing-steps flex flex-col sm:flex-row justify-center items-center mt-8 space-y-8 sm:space-y-0 sm:space-x-8">
          <div className="step text-center mx-4">
            <span className="emoji text-5xl">😱</span>
            <p className="text-white sm:text-xl md:text-2xl">Potential customer is interested</p>
          </div>
          <div className="arrow text-3xl text-white hidden sm:block">➔</div>
          <div className="step text-center mx-4">
            <span className="emoji text-5xl">😕</span>
            <p className="text-white sm:text-xl md:text-2xl">Doesn&apos;t find a reason to buy <span className="highlight">right now</span></p>
          </div>
          <div className="arrow text-3xl text-white hidden sm:block">➔</div>
          <div className="step text-center mx-4">
            <span className="emoji text-5xl">😬</span>
            <p className="text-white sm:text-xl md:text-2xl">Leaves and never comes back</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketing;