"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleGetStartedClick = (e) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <div className="w-full bg-black text-white">
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={160} height={80} className="h-20 w-40 object-contain" />
        </div>
        <ul className="hidden sm:flex space-x-6"> {/* Hidden on mobile, visible on sm and up */}
          <li>
            <Link href="#pricing">
              <a className="hover:underline">Pricing</a>
            </Link>
          </li>
          <li>
            <Link href="#faq">
              <a className="hover:underline">FAQ</a>
            </Link>
          </li>
        </ul>
        <div>
          <Link href="/login">
            <a onClick={handleGetStartedClick} className="px-4 py-2 rounded" style={{ backgroundColor: '#bafd00', color: 'black' }}>Get Started</a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;