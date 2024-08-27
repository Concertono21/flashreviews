import Link from 'next/link';

const Hero = () => {
  return (
    <section id="home" className="hero bg-black py-20 text-center">
      <div className="hero-content">
        <h1 className="text-4xl font-bold" style={{ fontWeight: 600 }}>
          <span
            style={{
              background: 'linear-gradient(to top, #000000, #ffffff)', // Gradient from black to white
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            Turn Visitors into Engaged Customers
          </span>
          <br />
          <span
            style={{
              background: 'linear-gradient(to top, #00ff00, #39ff14)', // Gradient from green to neon green
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            with Quick Review Popups
          </span>
        </h1>
        <p className="text-xl mt-4" style={{ color: '#FFFFFF' }}> {/* White text color */}
          Capture valuable feedback instantly with engaging pop-up reviews, enhancing your customer experience and driving growth.
        </p>
        <ul className="benefits list-disc mt-4" style={{ color: '#FFFFFF' }}> {/* White text color */}
          <li>Pay once, use forever</li>
          <li>1-minute no-code setup</li>
          <li>Boost customer satisfaction</li>
        </ul>
        <Link href="/login">
          <a
            className="cta-button text-black px-6 py-3 rounded mt-6 inline-block"
            style={{ backgroundColor: '#bafd00' }} // Bright green background for the button
          >
            Get Flash Reviews
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Hero;