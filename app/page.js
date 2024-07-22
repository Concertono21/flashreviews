"use client";

import { useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marketing from '../components/Marketing';
import UseCases from '../components/UseCases';
import Pricing from '../components/Pricing';
import Faq from '../components/Faq';
import GetStartedSection from '../components/GetStartedSection';

export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${process.env.NEXT_PUBLIC_BASE_URL}/embed.js`; // Use environment variable for base URL
    script.setAttribute('data-website', process.env.NEXT_PUBLIC_BASE_URL); // Use environment variable for website attribute
    document.body.appendChild(script);

    return () => {
      // Clean up the script if the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <Marketing />
      <UseCases />
      <Pricing />
      <Faq />
      <GetStartedSection />
      <footer className="bg-black text-white text-center py-4">
        <ul className="flex justify-center space-x-4">
          <li><Link href="#home"><a className="hover:underline">Home</a></Link></li>
          <li><Link href="#pricing"><a className="hover:underline">Pricing</a></Link></li>
          <li><Link href="#faq"><a className="hover:underline">FAQ</a></Link></li>
          <li><Link href="/signin"><a className="hover:underline">Get Started</a></Link></li>
        </ul>
        <p className="mt-4">
          <Link href="/terms"><a className="hover:underline">Terms of Service</a></Link> | <Link href="/privacy"><a className="hover:underline">Privacy Policy</a></Link>
        </p>
      </footer>
      <Script 
        src="https://flashreviews-j8un272ai-concertono21s-projects.vercel.app/embed.js"
        data-website="https://flashreviews-git-main-concertono21s-projects.vercel.app/"
        strategy="lazyOnload"
      />
    </div>
  );
}