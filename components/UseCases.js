import Image from 'next/image';

const UseCases = () => {
  return (
    <section id="use-cases" className="use-cases bg-black py-20 text-center">
      <h1 className="text-3xl font-bold">Use Cases</h1>
      <p className="text-xl mt-4">Customer stories and examples...</p>
      <div className="use-cases-content flex justify-center mt-8">
        <div className="use-case-titles flex flex-col items-start mx-4">
          <div className="use-case cursor-pointer py-2" data-target="frame1">
            <div className="use-case-title text-xl font-bold">✍️ Create a PoopUp</div>
            <div className="use-case-description hidden">
              <p>Create PoopUp messages in 2 minutes, no code required. Write about the #1 problem your visitors have. Trigger an emotional response. Use icons people recognize.</p>
            </div>
          </div>
          <div className="use-case cursor-pointer py-2" data-target="frame2">
            <div className="use-case-title text-xl font-bold">🔗 Add to your site</div>
            <div className="use-case-description hidden">
              <p>Copy and paste a small code snippet into your website. It works with any website, including WordPress, Shopify, Wix, Squarespace, and more.</p>
            </div>
          </div>
          <div className="use-case cursor-pointer py-2" data-target="frame3">
            <div className="use-case-title text-xl font-bold">🤑 Get more customers</div>
            <div className="use-case-description hidden">
              <p>PoopUp delivers effective pop-up messages to remind your visitors of their pain points and drive them to take action. Watch your conversion rate skyrocket 🚀</p>
            </div>
          </div>
        </div>
        <div className="use-case-frame flex-1 mx-4">
          <div id="frame1" className="use-case-frame-content hidden">
            <video controls className="w-full">
              <source src="feature_1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div id="frame2" className="use-case-frame-content hidden">
            <Image src="/feature_2.webp" alt="Feature 2" width={800} height={600} className="w-full" />
          </div>
          <div id="frame3" className="use-case-frame-content hidden">
            <video controls className="w-full">
              <source src="feature_3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;