import React from 'react';
import { MessageCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-pathmaker-dark min-h-[80vh]">
      <section className="bg-pathmaker-primary py-24 text-center border-b border-white/5">
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6">Inquire About Representation.</h1>
        <div className="text-gray-400 max-w-xl mx-auto px-4 space-y-4">
            <p className="text-lg font-light">
                Pathmaker accepts a limited number of mandates annually to ensure full execution focus for our partners.
            </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-24 relative z-10">
        <div className="bg-pathmaker-dark p-16 rounded-sm border border-pathmaker-accent/30 shadow-2xl flex flex-col justify-center items-center text-center">
            <h2 className="text-3xl font-serif font-medium text-white mb-8">Direct Line to Principals</h2>
            
            <a 
              href="https://wa.me/46701619978"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-5 bg-pathmaker-primary text-white border border-white/10 hover:border-pathmaker-accent font-medium rounded-full text-lg hover:bg-pathmaker-accent hover:text-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-6"
            >
              <MessageCircle className="w-6 h-6" />
              Contact on WhatsApp: +46 70 161 99 78
            </a>

            <div className="flex flex-col items-center gap-2 text-gray-500 text-sm mt-4 font-light">
               <span>Confidentiality Guaranteed.</span>
            </div>
        </div>
      </section>

      {/* Map Placeholder - Darkened */}
      <section className="w-full h-80 bg-pathmaker-primary border-t border-white/5 relative">
         <div className="absolute inset-0 pointer-events-none bg-pathmaker-dark/20 z-10"></div>
         <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2115.654321234567!2d14.1618!3d57.7826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465a6d7123456789%3A0xabcdef1234567890!2sPollaregatan%2021%2C%20553%2024%20J%C3%B6nk%C3%B6ping%2C%20Sweden!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{border:0}} 
            loading="lazy" 
            title="Pathmaker Location"
            className="grayscale invert brightness-75 contrast-125 opacity-70 hover:opacity-100 transition-opacity duration-300"
          ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;