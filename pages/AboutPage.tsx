import React, { useState } from 'react';
import { Award, Briefcase, Globe, Users, TrendingUp, Target, ArrowRight } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="pt-0 bg-pathmaker-dark min-h-screen">
      {/* Hero Section - Lion Animation + Typography */}
      <section className="relative pt-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        {/* Small lion in top-right corner */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
          <img
            src="https://i.postimg.cc/1XnVpHkM/Screenshot-2026-01-18-at-18-20-12-Photoroom.png"
            alt="Pathmaker Lion"
            className="h-8 w-8 object-contain brightness-0 invert filter drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] opacity-70"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-8xl font-serif font-medium text-white mb-8 tracking-tight leading-tight">
              We are <span className="text-pathmaker-accent">Pathmaker</span>.
            </h1>
            <p className="text-xl md:text-3xl text-gray-500 leading-relaxed font-light">
              The Engine Room for M&A Execution & Strategic Transitions.
            </p>
          </div>
          <div className="flex flex-col items-center overflow-hidden">
            <img
              src="https://i.postimg.cc/1XnVpHkM/Screenshot-2026-01-18-at-18-20-12-Photoroom.png"
              alt="Pathmaker Lion"
              className="h-48 w-48 md:h-64 md:w-64 object-contain rounded-sm brightness-0 invert sepia saturate-[400%] hue-rotate-[15deg] brightness-[90%] contrast-[90%] filter drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]"
            />
            <p className="text-center text-pathmaker-accent text-[9px] uppercase tracking-[0.4em] mt-8 font-mono opacity-80">
              Principal-Led M&amp;A
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement - High Contrast */}
      <section className="bg-pathmaker-primary py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-pathmaker-accent font-medium tracking-widest uppercase text-xs mb-6 block">Our Purpose</span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium leading-tight mb-8 text-white">
              Strategic Advisory & Proprietary Dealflow.
            </h2>
            <div className="h-0.5 w-24 bg-pathmaker-accent mb-10"></div>
            <p className="text-xl text-gray-400 leading-relaxed font-light">
              We don't just wait for opportunities; we create them. Whether acting as buy-side advisors sourcing off-market dealflow or guiding founders through complex exits, we provide the strategic clarity and execution power needed to close.
            </p>
          </div>
          <div className="space-y-8">
            {/* Institutional Image 2: Structural/Abstract */}
            <div className="w-full h-64 overflow-hidden rounded-sm border border-white/5 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
                alt="Strategic Structure"
                className="w-full h-full object-cover grayscale brightness-75 contrast-125"
              />
            </div>

            <div className="bg-pathmaker-dark p-8 border border-white/5 border-l-4 border-l-pathmaker-accent">
              <h3 className="text-2xl font-serif font-medium text-white mb-4">Not Brokers. Partners.</h3>
              <p className="text-lg text-gray-400 leading-relaxed font-light">
                Unlike transactional advisors who leave when the ink dries, we embed ourselves to drive value. We utilize the same rigorous methodology as top-tier Private Equity firms to unlock operational clarity and institutional growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Approach */}
      <section className="py-32 bg-pathmaker-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">Our Approach</h2>
            <p className="text-xl text-gray-400 font-light">
              We bring more than deal execution. We bring institutional credibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-pathmaker-primary p-10 rounded-sm hover:translate-y-[-4px] transition-all duration-300 border border-white/5 border-t-4 border-t-pathmaker-accent group">
              <Users className="w-10 h-10 text-pathmaker-accent mb-6" />
              <h3 className="text-2xl font-serif font-medium text-white mb-4">Cultural Alignment</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Aligning culture and capital. Respecting heritage while preparing for the next chapter.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-pathmaker-primary p-10 rounded-sm hover:translate-y-[-4px] transition-all duration-300 border border-white/5 border-t-4 border-t-white group">
              <TrendingUp className="w-10 h-10 text-pathmaker-accent mb-6" />
              <h3 className="text-2xl font-serif font-medium text-white mb-4">Strategic Expansion</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Acting as a Growth Partner, leveraging global networks for strategic M&A.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-pathmaker-primary p-10 rounded-sm hover:translate-y-[-4px] transition-all duration-300 border border-white/5 border-t-4 border-t-pathmaker-accent group">
              <Target className="w-10 h-10 text-pathmaker-accent mb-6" />
              <h3 className="text-2xl font-serif font-medium text-white mb-4">Operational Excellence</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Professionalizing governance and optimizing for scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story & Stats - Split Layout */}
      <section className="py-32 bg-pathmaker-primary border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

            {/* Left: Content */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-8">From Jönköping to the World</h2>
              <div className="prose prose-lg text-gray-400 font-light">
                <p className="mb-6">
                  Founded in 2021, Pathmaker emerged from a singular insight: The middle market needed differentiated execution - advisors who understand entrepreneurship but execute with institutional precision.
                </p>
                <p className="mb-6">
                  We operate with focused dedication. We commit fully to select mandates, ensuring we are not just advisors, but true partners in execution.
                </p>
              </div>
            </div>

            {/* Right: Stats/Key Facts */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-pathmaker-dark p-8 rounded-sm border-l-2 border-pathmaker-accent">
                <span className="text-5xl font-medium text-pathmaker-accent block mb-2 font-serif">2021</span>
                <span className="text-gray-500 font-medium uppercase tracking-widest text-xs">Founded</span>
              </div>
              <div className="bg-pathmaker-dark p-8 rounded-sm border-l-2 border-white/20">
                <span className="text-3xl font-medium text-white block mb-2 font-serif">Long-term</span>
                <span className="text-gray-500 font-medium uppercase tracking-widest text-xs">Partnership Horizon</span>
              </div>
              <div className="bg-pathmaker-dark p-8 rounded-sm border-l-2 border-pathmaker-accent">
                <span className="text-3xl font-medium text-white block mb-2 font-serif">Active</span>
                <span className="text-gray-500 font-medium uppercase tracking-widest text-xs">Execution Focus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section - Refined */}
      <section className="py-32 bg-pathmaker-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4">Leadership</h2>
          </div>

          <div className="bg-pathmaker-primary rounded-sm border border-white/5 flex flex-col md:flex-row max-w-5xl mx-auto md:max-w-none">
            <div className="md:w-2/5 relative h-96 md:h-auto overflow-hidden">
              <img
                src={!imageError ? "https://i.postimg.cc/BnVt6P7Z/Jonas-board-Photoroom.jpg" : "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"}
                alt="Jonas Hyltén"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden"></div>
              <div className="absolute bottom-6 left-6 text-white md:hidden">
                <h3 className="text-2xl font-serif font-medium">Jonas Hyltén</h3>
                <p className="text-pathmaker-accent font-medium text-xs uppercase tracking-widest">Founder & Managing Partner</p>
              </div>
            </div>
            <div className="p-12 md:w-3/5 flex flex-col justify-center">
              <div className="hidden md:block mb-8">
                <h3 className="text-4xl font-serif font-medium text-white">Jonas Hyltén</h3>
                <p className="text-pathmaker-accent font-medium text-xs uppercase tracking-widest mt-3">Founder & Managing Partner</p>
              </div>
              <div className="text-gray-400 leading-relaxed mb-10 text-lg space-y-6 font-light">
                <p>
                  Jonas is a Growth Partner focused on M&A and Capital Execution. With extensive experience in business development and digital infrastructure, he brings a true operator's perspective to the deal table.
                </p>
                <p>
                  A former Reconnaissance Team Leader in the Swedish Armed Forces known for "extreme stamina," Jonas combines military-grade discipline with strategic vision. In complex M&A processes where others experience deal fatigue, Jonas accelerates.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="https://www.linkedin.com/in/hylten"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white text-xs uppercase tracking-widest font-medium hover:text-pathmaker-accent transition-colors group"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/Pathmakers/insights/"
                  className="inline-flex items-center gap-2 text-white text-xs uppercase tracking-widest font-medium hover:text-pathmaker-accent transition-colors group"
                >
                  <span>Insights</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;