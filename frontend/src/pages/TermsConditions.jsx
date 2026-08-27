import React, { useEffect } from 'react';

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white py-12 md:py-20 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-black text-[#0f172a] mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-blue max-w-none text-gray-600">
          <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">
            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and ImageTech Industries, concerning your access to and use of our website as well as any other media form, related products, or services.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Intellectual Property Rights</h2>
          <p className="mb-4">
            Unless otherwise indicated, the website and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Products and Pricing</h2>
          <p className="mb-4">
            All products are subject to availability. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change without notice. We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Orders and Payment</h2>
          <p className="mb-4">
            We reserve the right to refuse any order placed through the Site. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. Payment terms are subject to mutual agreement upon quotation and order confirmation.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed by and defined following the laws of India. ImageTech Industries and yourself irrevocably consent that the courts of New Delhi, India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Contact Us</h2>
          <p className="mb-4">
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
          </p>
          <address className="not-italic bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700">
            <strong>ImageTech Industries</strong><br />
            RZ-I-13, 2nd Floor, Nanda Block<br />
            Mahavir Enclave, Delhi-110045, India<br />
            Email: imagetechindustries@gmail.com
          </address>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
