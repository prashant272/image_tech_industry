import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const faqs = [
        {
            question: "What does ImageTech Industries manufacture?",
            answer: "ImageTech Industries manufactures and supplies precision industrial products for printing, packaging, coating, testing, and quality-control applications. Our product range includes Doctor Blades, Dyne Test Pens, Ink Mixing Rollers, Stroboscopes, GSM Templates, and other testing and industrial instruments."
        },
        {
            question: "What are Doctor Blades used for?",
            answer: "Doctor Blades are precision components used in printing and coating processes to control and remove excess ink or coating from the roller surface. They help maintain consistent ink transfer, print quality, and smooth production performance."
        },
        {
            question: "What types of Doctor Blades does ImageTech Industries offer?",
            answer: "ImageTech Industries offers Doctor Blades in different materials, specifications, thicknesses, widths, and configurations to suit various printing and coating applications. The suitable blade depends on the printing process, machine, ink system, substrate, and operating conditions."
        },
        {
            question: "How do I choose the right Doctor Blade for my machine?",
            answer: "The right Doctor Blade depends on factors such as printing process, machine type, blade material, thickness, width, bevel or edge configuration, ink system, and application requirements. Our technical team can help you identify a suitable specification based on your application."
        },
        {
            question: "What are Dyne Test Pens used for?",
            answer: "Dyne Test Pens are used to check surface energy and wettability of materials such as films, plastics, and packaging substrates. They help determine whether a surface has suitable surface treatment for processes such as printing, coating, and adhesive application."
        },
        {
            question: "Why is surface tension testing important in printing and packaging?",
            answer: "Surface tension testing helps determine whether a material has adequate surface energy for proper ink, coating, or adhesive adhesion. Consistent surface treatment can help improve print quality and reduce adhesion-related production issues."
        },
        {
            question: "What is an Ink Mixing Roller used for?",
            answer: "Ink Mixing Rollers are designed to support efficient ink circulation and mixing in printing-related processes. Proper ink mixing helps maintain consistency and contributes to stable printing performance."
        },
        {
            question: "What are Stroboscopes used for?",
            answer: "Stroboscopes are used for visual inspection and motion analysis of rotating or moving components. They can make high-speed movement appear stationary, helping operators inspect machine movement, speed, alignment, and production processes."
        },
        {
            question: "What is a GSM Template used for?",
            answer: "A GSM Template is used for checking and comparing the grammage or GSM of paper, board, and other sheet materials. It provides a practical method for sample preparation and material-weight measurement in quality-control applications."
        },
        {
            question: "Which industries does ImageTech Industries serve?",
            answer: "Our products are applicable across industries such as printing, flexible packaging, gravure printing, flexographic printing, paper, plastic film, packaging conversion, labels, coating, lamination, and other manufacturing and quality-control applications."
        },
        {
            question: "Does ImageTech Industries provide products for flexible packaging?",
            answer: "Yes. Our products are suitable for various flexible packaging applications, including printing, surface treatment, inspection, and quality-control processes. Product selection depends on the specific machine and production application."
        },
        {
            question: "Can ImageTech Industries provide products according to specific requirements?",
            answer: "Yes. Product specifications can vary according to the machine, process, material, and application. Customers can contact our team with their technical requirements so that we can recommend a suitable product or specification."
        },
        {
            question: "How can I find the right product for my application?",
            answer: "You can explore the product categories on our website or contact ImageTech Industries with your application details. Sharing information such as machine type, process, substrate, dimensions, and operating requirements helps our team recommend the appropriate solution."
        },
        {
            question: "Does ImageTech Industries provide technical support?",
            answer: "Yes. Our team can provide product-related guidance and help customers understand product specifications, applications, and selection requirements. For technical assistance, you can contact us directly with your application details."
        },
        {
            question: "Can I request a quotation for ImageTech Industries products?",
            answer: "Yes. You can contact our team through the website and share your product requirement, specifications, quantity, and application details. Our team can then assist you with the relevant quotation and product information."
        },
        {
            question: "Does ImageTech Industries supply products for industrial applications?",
            answer: "Yes. ImageTech Industries focuses on precision industrial products designed for printing, packaging, testing, inspection, and manufacturing applications. Product suitability depends on the specific application and operating conditions."
        },
        {
            question: "What information should I provide when enquiring about a product?",
            answer: "For a faster and more accurate response, you can provide the product name, machine or process details, required dimensions or specifications, quantity, application, and any existing product or blade specifications."
        },
        {
            question: "Does ImageTech Industries manufacture or only supply products?",
            answer: "ImageTech Industries operates with a manufacturing-focused approach and provides industrial products for printing, packaging, testing, and related applications. Specific manufacturing and supply capabilities may vary by product category."
        },
        {
            question: "Why choose ImageTech Industries for industrial products?",
            answer: "ImageTech Industries focuses on precision, product reliability, application-based solutions, and customer support. Our product range is developed to address practical requirements across printing, packaging, testing, and industrial applications."
        },
        {
            question: "How can I contact ImageTech Industries for product enquiries?",
            answer: "You can contact ImageTech Industries through the Contact Us section of our website. Share your product requirement and application details, and our team will assist you with the relevant product information and enquiry process."
        }
    ];

    const visibleFaqs = showAll ? faqs : faqs.slice(0, 10);

    return (
        <section className="py-6 lg:py-8 bg-white px-0 md:px-6 font-sans relative z-10 border-b border-slate-100">
            <div className="container mx-auto px-2 sm:px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <span className="!text-[#0066FF] text-xs font-black tracking-[0.2em] uppercase block mb-3">
                        FREQUENTLY ASKED QUESTIONS
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black !text-slate-950 tracking-tight uppercase mb-4">
                        Everything You Need to Know About ImageTech Industries
                    </h2>
                    <p className="text-slate-600 text-[13px] sm:text-[15px] lg:text-[17px] font-medium leading-relaxed">
                        Find answers to common questions about our industrial products, applications, manufacturing capabilities, and technical support.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 items-start">
                    {visibleFaqs.map((faq) => {
                        const originalIndex = faqs.indexOf(faq);
                        const isOpen = activeIndex === originalIndex;
                        return (
                            <div 
                                key={originalIndex} 
                                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_5px_15px_rgba(0,0,0,0.01)] ${
                                    isOpen ? 'border-[#0066FF] shadow-sm' : 'border-slate-200/80 hover:border-[#0066FF]/30'
                                }`}
                            >
                                <button
                                    onClick={() => setActiveIndex(isOpen ? null : originalIndex)}
                                    className="w-full p-3 sm:p-5 flex justify-between items-center text-left transition-all hover:bg-slate-50/50 cursor-pointer"
                                >
                                    <div className="flex items-center gap-2 md:gap-4">
                                        <HelpCircle className="text-[#0066FF] shrink-0" size={16} />
                                        <span className="!text-slate-900 font-black text-[13px] sm:text-sm transition-colors">
                                            {faq.question}
                                        </span>
                                    </div>
                                    <div className="shrink-0 ml-4">
                                        {isOpen ? (
                                            <Minus className="text-[#0066FF]" size={18} />
                                        ) : (
                                            <Plus className="text-[#0066FF]" size={18} />
                                        )}
                                    </div>
                                </button>
                                
                                <div 
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                        isOpen ? 'max-h-[500px] opacity-100 p-3.5 sm:p-5 pt-0' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <p className="!text-slate-600 text-[11px] sm:text-xs font-bold leading-relaxed border-t border-slate-100 pt-3 sm:pt-4 whitespace-pre-line">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {faqs.length > 10 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
                        >
                            {showAll ? 'View Less' : 'View More'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FAQ;
