import Link from 'next/link';
import { useState } from 'react';

const Hero = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section id="home" className="hero bg-black py-20 text-center">
      <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h1 
          className="text-7xl font-bold" 
          style={{ 
            fontWeight: 600,
            background: 'linear-gradient(to top, #bafd00, #ffffff)',  // Gradient for text
            WebkitBackgroundClip: 'text',
            color: 'transparent',  // Transparent text to show gradient
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            transition: 'background 0.3s ease',
            cursor: 'pointer',  // Pointer cursor to indicate hoverability
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span
            style={{
              background: hovered ? 'linear-gradient(to top, #ffffff, #bafd00)' : 'inherit',  // Invert gradient on hover
              WebkitBackgroundClip: 'text',
              color: 'transparent',  // Keep text transparent to show gradient
              transition: 'background 0.3s ease',
            }}
          >
            Turn Visitors into Customers
          </span>
          <br />
          <span
            style={{
              background: hovered ? 'linear-gradient(to top, #ffffff, #bafd00)' : 'inherit',  // Invert gradient on hover
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              transition: 'background 0.3s ease',
            }}
          >
            Deliver What Matters Most
          </span>
        </h1>
        <p
          className="text-xl mt-8 mb-8"  // Add more margin to create space
          style={{
            color: '#969696',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          Capture valuable feedback instantly with engaging pop-up reviews 
          enhancing your customer experience and driving growth.
        </p>
        <ul
          className="benefits mt-8 mb-12"  // Add more top and bottom margin to create space
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