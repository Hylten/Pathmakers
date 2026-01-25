import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Target, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col bg-pathmaker-dark text-pathmaker-text">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        
        {/* Background Image Layer with 90% Blackout */}
        <div className="absolute inset-0 z-0">
            <img 
              src="https://i.postimg.cc/1Rq6cCpm/pexels-devshack-8236991.jpg" 
              alt="Background Texture" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/90"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left z-20">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium text-white leading-tight mb-8">
              Unite. <br />
              <span className="text-gray-400">Expand.</span> <br />
              <span className="text-pathmaker-accent">Elevate.</span>
            </h1>
            
            <div className="border-l-4 border-pathmaker-accent pl-8 py-2 max-w-2xl">
              <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                Principal-led M&A Advisory & Execution. <br/>
                <span className="text-white/80">Bridging the gap between legacy and market leadership.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid - Dark Cards */}
      <section className="py-32 bg-pathmaker-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">
              Building Stronger Futures
            </h2>
            <p className="text-xl text-gray-400 font-light">
              We don't just facilitate transactions; we engineer growth. Our model is built on proprietary dealflow and active, long-term value creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-10 bg-pathmaker-primary rounded-sm border border-white/5 hover:border-pathmaker-accent transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-pathmaker-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Users className="w-10 h-10 text-pathmaker-accent mb-8" />
              <h3 className="text-2xl font-serif font-medium text-white mb-4">Unite</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                We operate with Principal-mindset alignment with founders who value their legacy. Uniting vision, culture, and capital execution to ensure stability.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-10 bg-pathmaker-primary rounded-sm border border-white/5 hover:border-pathmaker-accent transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-pathmaker-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Target className="w-10 h-10 text-pathmaker-accent mb-8" />
              <h3 className="text-2xl font-serif font-medium text-white mb-4">Expand</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Aggressive market expansion through off-market acquisitions and organic scaling. We identify the markets others miss.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-10 bg-pathmaker-primary rounded-sm border border-white/5 hover:border-pathmaker-accent transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-pathmaker-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <TrendingUp className="w-10 h-10 text-pathmaker-accent mb-8" />
              <h3 className="text-2xl font-serif font-medium text-white mb-4">Elevate</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Our mandate is clear: Elevate the company from a local player to a market leader, securing maximum value for all stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Bio Section - Text Focused + Image */}
      <section className="py-32 bg-pathmaker-primary border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
             <div className="lg:col-span-5 relative">
                 <div className="w-20 h-1 bg-pathmaker-accent mb-8"></div>
                 <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-8 leading-tight">
                    Swedish Roots. <br/>Global Reach.
                 </h2>
                 {/* Institutional Image 1: Modern Architecture */}
                 <div className="relative overflow-hidden rounded-sm mt-8 border border-white/10">
                    <div className="absolute inset-0 bg-pathmaker-accent/10 mix-blend-overlay z-10"></div>
                    <img 
                      src="https://i.postimg.cc/jjB1m3CV/pexels-emilio-sanchez-hernandez-285921208-34672276.jpg" 
                      alt="Institutional Architecture" 
                      className="w-full h-80 object-cover grayscale brightness-75 contrast-125 hover:scale-105 transition-transform duration-700 ease-out"
                    />
                 </div>
             </div>
             <div className="lg:col-span-7">
                <p className="text-gray-400 text-xl mb-8 leading-relaxed font-light">
                    Since 2021, Pathmaker has defined the standard for M&A execution in the mid-market. Based in Sweden, executing cross-border mandates.
                </p>
                <p className="text-gray-400 text-xl mb-10 leading-relaxed font-light">
                    Founded and led by Jonas Hyltén, Pathmaker brings a rigorous operator’s perspective to investment. We honor legacy by driving future performance through technology and operational discipline.
                </p>
                <Link to="/about" className="inline-flex items-center text-pathmaker-accent text-xs uppercase tracking-widest font-medium hover:text-white transition-colors group">
                    View Leadership <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;