import React from 'react';
import { MapPin, Phone, Linkedin, Crown } from 'lucide-react';

const BlogFooter: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#050505] text-white pt-20 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex items-center justify-center border border-pathmaker-accent rounded-sm text-pathmaker-accent">
                                <Crown className="h-6 w-6" />
                            </div>
                            <span className="font-serif font-medium text-xl tracking-wide text-pathmaker-accent">Pathmaker</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-light">
                            The Modern Standard in M&A Execution.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-pathmaker-accent">Contact</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 text-gray-400 font-light text-sm">
                                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <span>Pollaregatan 21<br />553 24 Jönköping<br />Sweden</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 font-light text-sm">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <a href="tel:+46701619978" className="hover:text-pathmaker-accent transition-colors">+46 70 161 99 78</a>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-pathmaker-accent">Company</h3>
                        <ul className="space-y-3">
                            <li><a href="/Pathmakers/" className="text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light">Home</a></li>
                            <li><a href="/Pathmakers/#/about" className="text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light">About & Approach</a></li>
                            <li><a href="/Pathmakers/#/contact" className="text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light">Inquire</a></li>
                            <li className="pt-2">
                                <a href="https://www.linkedin.com/company/roials/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light">
                                    <Linkedin className="w-4 h-4" />
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-pathmaker-accent">Legal</h3>
                        <ul className="space-y-3">
                            <li><a href="/Pathmakers/#/privacy" className="text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light">Privacy Policy</a></li>
                            <li><a href="/Pathmakers/#/cookies" className="text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light">Cookie Policy</a></li>
                            <li><a href="/Pathmakers/#/terms" className="text-gray-400 hover:text-pathmaker-accent transition-colors text-sm font-light">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-10 text-center text-xs text-gray-600 font-light uppercase tracking-wider">
                    <p>&copy; {currentYear} Pathmaker. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default BlogFooter;
