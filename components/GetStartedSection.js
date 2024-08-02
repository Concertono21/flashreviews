// components/GetStartedSection.js
"use client";

import { useRouter } from 'next/navigation';

const GetStartedSection = () => {
  const router = useRouter();

  return (
    <section id="get-started" className="py-20 text-center bg-black">
      <h1 className="text-3xl font-bold">Get Flash Review</h1>
      <button onClick={() => router.push('/login')} className="cta-button text-black px-6 py-3 rounded mt-6 inline-block"style={{ backgroundColor: '#bafd00' }}>Get Started</button>
    </section>
  );
};

export default GetStartedSection;