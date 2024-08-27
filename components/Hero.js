import Link from 'next/link';

const Hero = () => {
  return (
    <section id="home" className="hero bg-black py-20 text-center">
      <div className="hero-content">
        <h1 className="text-7xl font-bold" style={{ fontWeight: 600 }}>
          <span
            style={{
              background: 'linear-gradient(to top, #969696, #ffffff)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            Convert Visitors into Customers by
          </span>
          <br />
          <span
            style={{
              background: 'linear-gradient(to top, #678c00, #ffffff)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            Delivering What Matters Most
          </span>
        </h1>
        <p className="text-xl mt-4 text-white">
          Capture valuable feedback instantly with engaging pop-up reviews, enhancing your customer experience and driving growth.
        </p>
        <ul className="benefits list-disc mt-4 text-white">
          <li>Pay once, use forever</li>
          <li>1-minute no-code setup</li>
          <li>Boost customer satisfaction</li>
        </ul>
        <Link href="/login">
          <a
            className="cta-button text-black px-6 py-3 rounded mt-6 inline-block"
            style={{ backgroundColor: '#bafd00' }}
          >
            Get Flash Reviews
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Hero;