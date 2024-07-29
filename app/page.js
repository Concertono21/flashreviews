"use client";

import { useEffect } from 'react';
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
    script.src = 'https://flashreviews.vercel.app/embed.js';
    script.setAttribute('data-website', 'https://flashreviews.vercel.app');
    script.async = true;
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
          <li>
            <Link href="#home">Home</Link>
          </li>
          <li>
            <Link href="#pricing">Pricing</Link>
          </li>
          <li>
            <Link href="#faq">FAQ</Link>
          </li>
          <li>
            <Link href="/signin">Get Started</Link>
          </li>
        </ul>
        <p className="mt-4">
          <Link href="/terms">Terms of Service</Link> | <Link href="/privacy">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
}