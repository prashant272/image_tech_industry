import React, { useEffect } from 'react';

const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white py-12 md:py-20 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-black text-[#0f172a] mb-8">Shipping and Delivery Policy</h1>
        
        <div className="prose prose-blue max-w-none text-gray-600">
          <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Order Processing Time</h2>
          <p className="mb-4">
            All orders are processed within 2-3 business days after receiving your order confirmation email. You will receive another notification when your order has shipped. Processing times may vary depending on the availability of industrial products and custom specifications requested.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Domestic Shipping Rates and Estimates</h2>
          <p className="mb-4">
            For domestic orders within India, shipping charges for your order will be calculated and displayed at checkout or provided during the quotation process. Delivery times vary based on the destination, generally ranging from 3 to 7 business days for major cities.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. International Shipping</h2>
          <p className="mb-4">
            We offer international shipping to various countries. Shipping charges and delivery times for international orders will be calculated based on the weight of the shipment and the destination country. Please note that your order may be subject to import duties and taxes, which are incurred once a shipment reaches your destination country. ImageTech Industries is not responsible for these charges if they are applied and are your responsibility as the customer.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Shipping Couriers</h2>
          <p className="mb-4">
            We partner with reliable and reputed logistics providers to ensure the safe and timely delivery of our precision industrial products, such as Doctor Blades and Stroboscopes. Tracking information will be provided once the consignment is dispatched.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Damages and Returns</h2>
          <p className="mb-4">
            ImageTech Industries is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim. For any defects in manufacturing, please refer to our standard return and warranty policy.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Contact Information</h2>
          <p className="mb-4">
            If you have any further questions about your shipment or our shipping policy, please contact us at:
          </p>
          <address className="not-italic bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700">
            <strong>ImageTech Industries</strong><br />
            Email: sales.imagetechindustries@gmail.com<br />
            Phone: +91 8448441345
          </address>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
