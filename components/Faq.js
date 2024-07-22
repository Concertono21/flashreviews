const Faq = () => {
  return (
    <section id="faq" className="faq bg-black py-20 text-center text-white">
      <h1 className="text-3xl font-bold">FAQ</h1>
      <p className="text-xl mt-4">Frequently Asked Questions</p>
      <div className="faq-container mx-auto mt-8 max-w-4xl">
        <div className="faq-item border-b border-gray-700 py-4">
          <div className="faq-question cursor-pointer" data-target="faq1">
            <span className="faq-toggle">+</span> Is it a subscription?
          </div>
          <div id="faq1" className="faq-answer hidden">
            <p>Nope. You pay once and it&apos;s yours forever.</p>
          </div>
        </div>
        <div className="faq-item border-b border-gray-700 py-4">
          <div className="faq-question cursor-pointer" data-target="faq2">
            <span className="faq-toggle">+</span> Is it compatible with?
          </div>
          <div id="faq2" className="faq-answer hidden">
            <p>Wordpress, Shopify, Carrd, Webflow, Bubble, Wix, etc. are all supported. If you can add a code snippet (script) to your website, you can use PoopUp.</p>
          </div>
        </div>
        <div className="faq-item border-b border-gray-700 py-4">
          <div className="faq-question cursor-pointer" data-target="faq3">
            <span className="faq-toggle">+</span> Do I need to code?
          </div>
          <div id="faq3" className="faq-answer hidden">
            <p>You don&apos;t. All you need to do is copy and paste a small code snippet in your website&apos;s &lt;head&gt; tag. Wordpress, Shopify, Webflow, Bubble, Wix, etc. are all supported.</p>
          </div>
        </div>
        <div className="faq-item border-b border-gray-700 py-4">
          <div className="faq-question cursor-pointer" data-target="faq4">
            <span className="faq-toggle">+</span> Does PoopUp work on mobile?
          </div>
          <div id="faq4" className="faq-answer hidden">
            <p>Yes, PoopUp is designed to be responsive and works on mobile devices.</p>
          </div>
        </div>
        <div className="faq-item border-b border-gray-700 py-4">
          <div className="faq-question cursor-pointer" data-target="faq5">
            <span className="faq-toggle">+</span> What can I customize?
          </div>
          <div id="faq5" className="faq-answer hidden">
            <p>You can customize the text, colors, and timing of the PoopUp notifications.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;