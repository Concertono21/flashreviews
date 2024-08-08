import Link from 'next/link';
import { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://flashreviews.vercel.app/embed.js';
    script.setAttribute('data-website', 'https://flashreviews.vercel.app');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="home" className="hero bg-black py-20 text-center">
      <div className="hero-content text-white">
        <h1 className="text-4xl font-bold">Turn Visitors into Engaged Customers with Quick Review Popups</h1>
        <p className="text-xl mt-4">Capture valuable feedback instantly with engaging pop-up reviews, enhancing your customer experience and driving growth.</p>
        <ul className="benefits list-disc mt-4">
          <li>Pay once, use forever</li>
          <li>1-minute no-code setup</li>
          <li>Boost customer satisfaction</li>
        </ul>
        <Link href="/login">
          <a className="cta-button text-black px-6 py-3 rounded mt-6 inline-block" style={{ backgroundColor: '#bafd00' }}>
            Get Flash Reviews
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Hero;