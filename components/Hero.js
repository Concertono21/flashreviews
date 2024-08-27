import Link from 'next/link';

const Hero = () => {
  return (
    <section id="home" className="hero bg-black py-20 text-center">
      <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h1 className="text-7xl font-bold" style={{ fontWeight: 600 }}>
          <span
            style={{
              background: 'linear-gradient(to top, #969696, #ffffff)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            Turn Visitors into Customers
          </span>
          <br />
          <span
            style={{
              background: 'linear-gradient(to top, #969696, #ffffff)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            Deliver What Matters Most
          </span>
        </h1>
        <p
          className="text-xl mt-4"
          style={{
            color: '#969696',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          Capture valuable feedback instantly with engaging pop-up reviews 
          enhancing your customer experience and driving growth.
        </p>
        <ul
          className="benefits mt-4"
          style={{
            listStyleType: 'none',  // Remove default bullets
            padding: 0,              // Remove default padding
            color: '#969696',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            textAlign: 'left', // Align text to the left
          }}
        >
          <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ color: '#bafd00', marginRight: '8px' }}>+</span> Pay once, use forever
          </li>
          <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ color: '#bafd00', marginRight: '8px' }}>+</span> 1-minute no-code setup
          </li>
          <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ color: '#bafd00', marginRight: '8px' }}>+</span> Boost customer satisfaction
          </li>
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