import Link from 'next/link';
import { useState } from 'react';

const Hero = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section id="home" className="hero bg-black py-20 text-center">
      <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h1 
          className="text-7xl font-bold mb-12"
          style={{ 
            fontWeight: 600,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            cursor: 'pointer',
            position: 'relative',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span
            style={{
              display: 'inline-block',
              background: hovered ? 'linear-gradient(to top, #969696, #ffffff)' : 'linear-gradient(to top, #ffffff, #969696)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              transition: 'background 0.3s ease',
            }}
          >
            Turn Visitors into Customers
          </span>
          <br />
          <span
            style={{
              display: 'inline-block',
              background: hovered ? 'linear-gradient(to top, #969696, #ffffff)' : 'linear-gradient(to top, #ffffff, #969696)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              transition: 'background 0.3s ease',
            }}
          >
            Deliver What Matters Most
          </span>
        </h1>
        <p
          className="text-xl mt-6 mb-10"
          style={{
            color: '#969696',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          Capture valuable feedback instantly with engaging pop-up reviews 
          enhancing your customer experience and driving growth.
        </p>
        <ul
          className="benefits mt-8 mb-12"
          style={{
            listStyleType: 'none',  // Remove default bullets
            padding: 0,              // Remove default padding
            color: '#969696',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            textAlign: 'left',       // Align text to the left
            margin: '0 auto',        // Center the list
            maxWidth: '300px'        // Control the width of the list
          }}
        >
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: '#bafd00', marginRight: '8px' }}>+</span> Pay once, use forever
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: '#bafd00', marginRight: '8px' }}>+</span> 1-minute no-code setup
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
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