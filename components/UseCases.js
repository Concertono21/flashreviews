import Image from 'next/image';
import { useState } from 'react';

const UseCases = () => {
  const [activeCase, setActiveCase] = useState('frame1');

  const handleClick = (frame) => {
    setActiveCase(frame);
  };

  return (
    <section id="use-cases" className="use-cases bg-black py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center">Use Cases</h1>
        <p className="text-2xl mt-4 text-white text-center">Customer stories and examples...</p>
        <div className="flex justify-between mt-8">
          <div className="use-case-titles flex flex-col items-start space-y-6 w-1/2">
            <div className={`use-case cursor-pointer py-4 ${activeCase === 'frame1' ? 'active' : ''}`} onClick={() => handleClick('frame1')}>
              <div className="use-case-title text-2xl font-bold text-white">✍️ Create a FlashReviews</div>
              {activeCase === 'frame1' && (
                <div className="use-case-description">
                  <p className="text-xl text-white">Create FlashReviews messages in 2 minutes, no code required. Write about the #1 problem your visitors have. Trigger an emotional response. Use icons people recognize.</p>
                </div>
              )}
            </div>
            <div className={`use-case cursor-pointer py-4 ${activeCase === 'frame2' ? 'active' : ''}`} onClick={() => handleClick('frame2')}>
              <div className="use-case-title text-2xl font-bold text-white">🔗 Add to your site</div>
              {activeCase === 'frame2' && (
                <div className="use-case-description">
                  <p className="text-xl text-white">Copy and paste a small code snippet into your website. It works with any website, including WordPress, Shopify, Wix, Squarespace, and more.</p>
                </div>
              )}
            </div>
            <div className={`use-case cursor-pointer py-4 ${activeCase === 'frame3' ? 'active' : ''}`} onClick={() => handleClick('frame3')}>
              <div className="use-case-title text-2xl font-bold text-white">🤑 Get more customers</div>
              {activeCase === 'frame3' && (
                <div className="use-case-description">
                  <p className="text-xl text-white">PoopUp delivers effective pop-up messages to remind your visitors of their pain points and drive them to take action. Watch your conversion rate skyrocket 🚀</p>
                </div>
              )}
            </div>
          </div>
          <div className="use-case-frame flex-1 mx-4 w-1/2">
            {activeCase === 'frame1' && (
              <div id="frame1" className="use-case-frame-content">
                <video controls className="w-full h-80" autoPlay loop>
                  <source src="feature_1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {activeCase === 'frame2' && (
              <div id="frame2" className="use-case-frame-content">
                <Image src="/feature_2.webp" alt="Feature 2" width={1000} height={800} className="w-full h-80 object-contain" />
              </div>
            )}
            {activeCase === 'frame3' && (
              <div id="frame3" className="use-case-frame-content">
                <video controls className="w-full h-80" autoPlay loop>
                  <source src="feature_3.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;