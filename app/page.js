"use client";

import { useEffect } from 'react';
import Head from 'next/head';
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
    script.src = 'https://www.flashreviews.co/embed.js';
    script.setAttribute('data-website', 'https://www.flashreviews.co');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Script 
        src="https://www.flashreviews.co/embed.js"
        strategy="afterInteractive" // Load after page becomes interactive
        data-website="https://www.flashreviews.co"
      />
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
            <Link href="/login">Get Started</Link>
          </li>
        </ul>
        <p className="mt-4">
          <Link href="/terms">Terms of Service</Link> | <Link href="/privacy">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
}