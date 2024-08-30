"use client";

import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marketing from '../components/Marketing';
import UseCases from '../components/UseCases';
import Pricing from '../components/Pricing';
import Faq from '../components/Faq';
import GetStartedSection from '../components/GetStartedSection';

export default function Home() {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://flashreviews.co/embed.js" data-website="https://concertono21.tumblr.com"></script>
      </Head>
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