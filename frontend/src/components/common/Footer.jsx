import React from 'react';
import { Apple, Play } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-6">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">

          {/* Column 1: Brand & Description */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#0b6d4b] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                S
              </div>
              <span className="font-extrabold text-2xl text-gray-900 tracking-tight">
                Society<span className="text-[#0b6d4b]">Pro</span>
              </span>
            </div>
            <p className="text-[14px] text-gray-900 font-medium leading-[1.8] pr-4">
              SocietyPro is a platform that connects residential societies with top-tier management tools, offering smart solutions for any community. Find cost-effective operational features with trusted service providers worldwide.
            </p>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h4 className="font-bold text-[13px] text-[#0b6d4b] mb-6 uppercase tracking-wider">Useful Links</h4>
            <ul className="space-y-5">
              <li><a href="#" className="text-[14px] text-gray-900 font-bold hover:text-[#0b6d4b] transition-colors">Home</a></li>
              <li><a href="#" className="text-[14px] text-gray-900 font-bold hover:text-[#0b6d4b] transition-colors">About Us</a></li>
              <li><a href="#" className="text-[14px] text-gray-900 font-bold hover:text-[#0b6d4b] transition-colors">Features</a></li>
              <li><a href="#" className="text-[14px] text-gray-900 font-bold hover:text-[#0b6d4b] transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="font-bold text-[13px] text-[#0b6d4b] mb-6 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-5">
              <li><a href="#" className="text-[14px] text-gray-900 font-bold hover:text-[#0b6d4b] transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-[14px] text-gray-900 font-bold hover:text-[#0b6d4b] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[14px] text-gray-900 font-bold hover:text-[#0b6d4b] transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-[14px] text-gray-900 font-bold hover:text-[#0b6d4b] transition-colors">Support</a></li>
              <li><a href="#" className="text-[14px] text-gray-900 font-bold hover:text-[#0b6d4b] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter, Social, Apps */}
          <div className="flex flex-col">
            <h4 className="font-bold text-[13px] text-[#0b6d4b] mb-4 uppercase tracking-wider">Join Our Newsletter</h4>
            <div className="flex w-full mb-8">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-white border border-gray-200 rounded-l-md px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#0b6d4b]"
              />
              <button className="bg-[#0b6d4b] hover:bg-[#09573c] text-white px-5 py-2.5 rounded-r-md font-bold text-[14px] transition-colors">
                Subscribe
              </button>
            </div>

            <div className="flex gap-2.5 mb-8">
              {/* Facebook */}
              <a href="#" className="w-[38px] h-[38px] rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="w-[38px] h-[38px] rounded-full bg-black flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-[38px] h-[38px] rounded-full bg-gradient-to-tr from-[#fd5949] to-[#d6249f] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-[38px] h-[38px] rounded-full bg-[#0077B5] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-[38px] h-[38px] rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>

            <h4 className="font-bold text-[13px] text-gray-900 mb-3 uppercase tracking-wider">We Are Available On</h4>
            <div className="flex gap-3">
              <a href="#" className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                <Apple className="w-6 h-6" />
                <div className="flex flex-col items-start">
                  <span className="text-[9px] uppercase font-bold leading-none">Download on the</span>
                  <span className="text-[13px] font-bold leading-none mt-0.5">App Store</span>
                </div>
              </a>
              <a href="#" className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                <Play className="w-5 h-5" />
                <div className="flex flex-col items-start">
                  <span className="text-[9px] uppercase font-bold leading-none">Get it on</span>
                  <span className="text-[13px] font-bold leading-none mt-0.5">Google Play</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#64748b] font-medium text-[13px]">
            © {new Date().getFullYear()} SocietyPro. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#64748b] font-bold text-[11px] uppercase tracking-wider hover:text-[#0b6d4b] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#64748b] font-bold text-[11px] uppercase tracking-wider hover:text-[#0b6d4b] transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
