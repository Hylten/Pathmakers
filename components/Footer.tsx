import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isInsightArticle = location.pathname.includes('/insights/') && location.pathname.split('/insights/')[1];

  return (
    <footer className="bg-pathmaker-dark text-white pt-20 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="https://i.postimg.cc/1XnVpHkM/Screenshot-2026-01-18-at-18-20-12-Photoroom.png"
                alt="Pathmaker Logo"
                className="h-10 w-10 object-contain brightness-0 invert sepia saturate-[400%] hue-rotate-[15deg] brightness-[90%] contrast-[90%]"
              />
              <span className="font-serif font-medium text-xl tracking-wide text-pathmaker-accent">Pathmaker</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-light">
              The Modern Standard in M&A Execution.
            </p>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-pathmaker-accent">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-400 font-light text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Pollaregatan 21<br />
                  553 24 Jönköping<br />
                  Sweden
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 font-light text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+46701619978" className="hover:text-pathmaker-accent transition-colors">
                  +46 70 161 99 78
                </a>
              </div>
            </div>
          </div>

          {/* Links Column */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-pathmaker-accent">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light">About & Approach</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light">Inquire</Link>
              </li>
              <li className="pt-2">
                {!isInsightArticle && (
                  <a
                    href="https://www.linkedin.com/company/pathmakerab/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light"
                  >
                    <Linkedin className="w-4 h-4" />
                    Follow us on LinkedIn
                  </a>
                )}
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-pathmaker-accent">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-light uppercase tracking-wider">
          <a
            href="https://www.hylninvest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pathmaker-accent transition-colors duration-300"
          >
            A Hyltén Invest company
          </a>
          <p>&copy; {currentYear} Pathmaker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;