import { useState } from 'react';

const Faq = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  return (
    <section id="faq" className="faq bg-black py-20 text-center text-white">
      <h1 className="text-3xl font-bold">FAQ</h1>
      <p className="text-xl mt-4">Frequently Asked Questions</p>
      <div className="faq-container mx-auto mt-8 max-w-4xl">
        <div className="faq-item border-b border-gray-700 py-4">
          <div className="faq-question cursor-pointer" onClick={() => toggleFaq(1)}>
            <span className="faq-toggle">{activeFaq === 1 ? '-' : '+'}</span> Is it a subscription?
          </div>
          {activeFaq === 1 && (
            <div id="faq1" className="faq-answer">
              <p>Nope. You pay once and it&apos;s yours forever.</p>
            </div>
          )}
        </div>
        <div className="faq-item border-b border-gray-700 py-4">
          <div className="faq-question cursor-pointer" onClick={() => toggleFaq(2)}>
            <span className="faq-toggle">{activeFaq === 2 ? '-' : '+'}</span> Is it compatible with?
          </div>
          {activeFaq === 2 && (
            <div id="faq2" className="faq-answer">
              <p>Wordpress, Shopify, Carrd, Webflow, Bubble, Wix, etc. are all supported. If you can add a code snippet (script) to your website, you can use FlashReviews.</p>
            </div>
          )}
        </div>
        <div className="faq-item border-b border-gray-700 py-4">
          <div className="faq-question cursor-pointer" onClick={() => toggleFaq(3)}>
            <span className="faq-toggle">{activeFaq === 3 ? '-' : '+'}</span> Do I need to code?
          </div>
          {activeFaq === 3 && (
            <div id="faq3" className="faq-answer">
              <p>You don&apos;t. All you need to do is copy and paste a small code snippet in your website&apos;s &lt;head&gt; tag. Wordpress, Shopify, Webflow, Bubble, Wix, etc. are all supported.</p>
            </div>
          )}
        </div>
        <div className="faq-item border-b border-gray-700 py-4">
          <div className="faq-question cursor-pointer" onClick={() => toggleFaq(4)}>
            <span className="faq-toggle">{activeFaq === 4 ? '-' : '+'}</span> Does FlashReviews work on mobile?
          </div>
          {activeFaq === 4 && (
            <div id="faq4" className="faq-answer">
              <p>Yes, FlashReviews is designed to be responsive and works on mobile devices.</p>
            </div>
          )}
        </div>
        <div className="faq-item border-b border-gray-700 py-4">
          <div className="faq-question cursor-pointer" onClick={() => toggleFaq(5)}>
            <span className="faq-toggle">{activeFaq === 5 ? '-' : '+'}</span> What can I customize?
          </div>
          {activeFaq === 5 && (
            <div id="faq5" className="faq-answer">
              <p>You can customize the text, colors, and timing of the FlashReviews notifications.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Faq;