import Image from 'next/image';
import { useState } from 'react';

const UseCases = () => {
  const [activeCase, setActiveCase] = useState('frame1');

  const handleClick = (frame) => {
    setActiveCase(frame);
  };

  return (
    <section id="use-cases" className="use-cases bg-black py-20 text-center">
      <h1 className="text-3xl font-bold text-white">Use Cases</h1>
      <div className="use-cases-content grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="use-case-titles flex flex-col items-start mx-4">
          <div className={`use-case cursor-pointer py-2 ${activeCase === 'frame1' ? 'active' : ''}`} onClick={() => handleClick('frame1')}>
            <div className="use-case-title text-xl font-bold text-white">✍️ Create a FlashReviews</div>
            {activeCase === 'frame1' && (
              <div className="use-case-description">
                <p className="text-white">Create FlashReviews messages in 2 minutes, no code required. Write about the #1 problem your visitors have. Trigger an emotional response. Use icons people recognize.</p>
              </div>
            )}
          </div>
          <div className={`use-case cursor-pointer py-2 ${activeCase === 'frame2' ? 'active' : ''}`} onClick={() => handleClick('frame2')}>
            <div className="use-case-title text-xl font-bold text-white">🔗 Add to your site</div>
            {activeCase === 'frame2' && (
              <div className="use-case-description">
                <p className="text-white">Copy and paste a small code snippet into your website. It works with any website, including WordPress, Shopify, Wix, Squarespace, and more.</p>
              </div>
            )}
          </div>
          <div className={`use-case cursor-pointer py-2 ${activeCase === 'frame3' ? 'active' : ''}`} onClick={() => handleClick('frame3')}>
            <div className="use-case-title text-xl font-bold text-white">🤑 Get more customers</div>
            {activeCase === 'frame3' && (
              <div className="use-case-description">
                <p className="text-white">PoopUp delivers effective pop-up messages to remind your visitors of their pain points and drive them to take action. Watch your conversion rate skyrocket 🚀</p>
              </div>
            )}
          </div>
        </div>
        <div className="use-case-frame flex-1 mx-4">
          {activeCase === 'frame1' && (
            <div id="frame1" className="use-case-frame-content">
              <video controls className="w-full h-full object-cover">
                <source src="feature_1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {activeCase === 'frame2' && (
            <div id="frame2" className="use-case-frame-content">
              <Image src="/feature_2.webp" alt="Feature 2" width={800} height={600} className="w-full h-full object-cover" />
            </div>
          )}
          {activeCase === 'frame3' && (
            <div id="frame3" className="use-case-frame-content">
              <video controls className="w-full h-full object-cover">
                <source src="feature_3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UseCases;