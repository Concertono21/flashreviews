"use client";

import { useRouter } from 'next/navigation';

const GetStartedSection = () => {
  const router = useRouter();

  return (
    <section id="get-started" className="py-20 text-center bg-black">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Get Flash Review</h1>
        <button 
          onClick={() => router.push('/login')} 
          className="bg-[#bafd00] hover:bg-[#bbdd11] text-black hover:text-white px-6 py-3 rounded mt-6 text-xl sm:text-2xl md:text-3xl"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default GetStartedSection;