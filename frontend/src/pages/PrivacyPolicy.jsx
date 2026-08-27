import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white py-12 md:py-20 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-black text-[#0f172a] mb-8">Privacy Policy</h1>
        
        <div className="prose prose-blue max-w-none text-gray-600">
          <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">
            At ImageTech Industries, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or interact with our services.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
          <p className="mb-4">
            We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products, when you participate in activities on the website, or otherwise when you contact us. The personal information we collect may include:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Name and Contact Data (email address, phone number, postal address)</li>
            <li>Business Information (company name, industry, job title)</li>
            <li>Inquiry details and product requirements</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect or receive to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Fulfill and manage your orders, requests, and inquiries.</li>
            <li>Send administrative information to you regarding our products and terms.</li>
            <li>Deliver targeted advertising, newsletters, and promotional materials.</li>
            <li>Improve our website, services, and overall customer experience.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Sharing Your Information</h2>
          <p className="mb-4">
            We do not sell, rent, or trade your personal information with third parties for their promotional purposes. We may share your data with trusted service providers who assist us in operating our website, conducting our business, or servicing you, provided that those parties agree to keep this information confidential.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Data Security</h2>
          <p className="mb-4">
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Contact Us</h2>
          <p className="mb-4">
            If you have questions or comments about this policy, you may email us at imagetechindustries@gmail.com or contact us by post at:
          </p>
          <address className="not-italic bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700">
            <strong>ImageTech Industries</strong><br />
            RZ-I-13, 2nd Floor, Nanda Block<br />
            Mahavir Enclave, Delhi-110045, India<br />
            Phone: +91 8448336036
          </address>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
