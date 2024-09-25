// app/layout.js

import { Inter } from "next/font/google";
import "./globals.css"; // Make sure this path is correct

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FlashReviews",
  description: "FlashReviews",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}