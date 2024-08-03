const Marketing = () => {
  return (
    <section id="marketing" className="marketing bg-black py-20 text-center">
      <div className="marketing-content text-white">
        <h1 className="text-3xl font-bold">97% of visitors aren&apos;t ready to buy</h1>
        <p className="text-xl mt-4">All the time and money spent on ads, SEO, and content marketing goes to waste. Potential customers leave and never come back.</p>
        <div className="marketing-steps flex justify-center items-center mt-8">
          <div className="step mx-4">
            <span className="emoji text-5xl">😱</span>
            <p>Potential customer is interested</p>
          </div>
          <div className="arrow mx-4 text-3xl">➔</div>
          <div className="step mx-4">
            <span className="emoji text-5xl">😕</span>
            <p>Doesn&apos;t find a reason to buy <span className="highlight">right now</span></p>
          </div>
          <div className="arrow mx-4 text-3xl">➔</div>
          <div className="step mx-4">
            <span className="emoji text-5xl">😬</span>
            <p>Leaves and never comes back</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketing;