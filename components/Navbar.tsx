import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Crown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About & Approach', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-pathmaker-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            {!logoError ? (
              <img
                src="https://i.postimg.cc/1XnVpHkM/Screenshot-2026-01-18-at-18-20-12-Photoroom.png"
                alt="Pathmaker Logo"
                className="h-12 w-12 object-contain rounded-sm brightness-0 invert sepia saturate-[400%] hue-rotate-[15deg] brightness-[90%] contrast-[90%]"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="h-10 w-10 flex items-center justify-center border border-pathmaker-accent rounded-sm text-pathmaker-accent">
                <Crown className="h-6 w-6" />
              </div>
            )}
            <span className="font-serif font-medium text-2xl tracking-tight text-pathmaker-accent">
              Pathmaker
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.filter(l => l.name !== 'Contact').map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:text-pathmaker-accent ${isActive(link.path) ? 'text-pathmaker-accent' : 'text-pathmaker-body'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/46701619978?text=Regarding%20Pathmaker%20Strategic%20Advisory:"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-pathmaker-accent text-pathmaker-accent text-[10px] tracking-[0.2em] uppercase hover:bg-pathmaker-accent hover:text-black transition-all duration-300 font-medium"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-pathmaker-accent focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-pathmaker-primary border-t border-white/10">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-sm uppercase tracking-widest font-medium ${isActive(link.path)
                  ? 'text-pathmaker-accent bg-white/5'
                  : 'text-pathmaker-body hover:text-pathmaker-accent hover:bg-white/5'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;