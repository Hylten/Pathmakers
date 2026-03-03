import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import TermsPage from './pages/TermsPage';
import { InsightsIndex } from './components/insights/InsightsIndex';
import { InsightsArticle } from './components/insights/InsightsArticle';

const BASE = '/Pathmakers';

const App: React.FC = () => {
  // SEO Route Hijack — bypass HashRouter for /insights routes
  const path = window.location.pathname;
  console.log('Pathmaker routing check:', path);

  if (path.includes('/insights')) {
    // Robust slug extraction: get everything after '/insights' and clean slashes
    const parts = path.split('/insights');
    const slug = parts.length > 1 ? parts[1].replace(/^\/|\/$/g, '') : '';
    console.log('Detected Insights Slug:', slug || '[Index]');

    return (
      <div className="flex flex-col min-h-screen bg-[#050505] font-sans text-pathmaker-text selection:bg-pathmaker-accent selection:text-black">
        {/* Simple header for insights pages */}
        <nav className="sticky top-0 z-50 bg-pathmaker-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-24">
              <a href={`${BASE}/`} className="flex-shrink-0 flex items-center gap-3 group">
                <span className="font-serif font-medium text-2xl tracking-tight text-pathmaker-accent">
                  Pathmaker
                </span>
              </a>
              <div className="flex items-center space-x-10">
                <a href={`${BASE}/`} className="text-xs uppercase tracking-widest font-medium text-pathmaker-body hover:text-pathmaker-accent transition-colors">Home</a>
                <a href={`${BASE}/insights`} className="text-xs uppercase tracking-widest font-medium text-pathmaker-accent">Insights</a>
                <a href={`${BASE}/#/contact`} className="inline-flex items-center px-6 py-2.5 border border-pathmaker-accent text-xs uppercase tracking-widest font-medium rounded-sm text-pathmaker-accent hover:bg-pathmaker-accent hover:text-black transition-all duration-300">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          {slug ? (
            <InsightsArticle slug={slug} />
          ) : (
            <InsightsIndex />
          )}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-pathmaker-dark font-sans text-pathmaker-text selection:bg-pathmaker-accent selection:text-black">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;