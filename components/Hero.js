import Link from 'next/link';

const Hero = () => {
  return (
    <section id="home" className="hero bg-black py-20 text-center">
      <div className="hero-content max-w-4xl mx-auto px-4 border-2 border-green-400 p-6 rounded-lg shadow-lg" style={{ borderColor: '#bafd00' }}>
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">Turn Visitors into Engaged Customers with Quick Review Popups</h1>
        <p className="text-xl mt-4 text-white sm:text-2xl md:text-3xl">Capture valuable feedback instantly with engaging pop-up reviews, enhancing your customer experience and driving growth.</p>
        <ul className="benefits list-disc mt-4 text-white text-left mx-auto max-w-md sm:text-xl md:text-2xl">
          <li>Pay once, use forever</li>
          <li>1-minute no-code setup</li>
          <li>Boost customer satisfaction</li>
        </ul>
        <Link href="/signin" passHref>
          <a className="cta-button bg-green-500 text-black px-6 py-3 rounded mt-6 inline-block" style={{ backgroundColor: '#bafd00' }}>
            Get Flash Reviews
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Hero;