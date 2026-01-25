import React, { useEffect } from 'react';

const CookiePolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-medium text-pathmaker-dark mb-2">Cookie Policy</h1>
        <p className="text-gray-500 mb-8 font-light">Effective date: July 1, 2025</p>

        <div className="prose prose-slate max-w-none text-gray-700 font-light">
          <p className="mb-6">
            Pathmaker (“we”, “our”, “us”) uses cookies and similar technologies on our website to ensure proper functionality, enhance user experience, and gather analytics data in compliance with the General Data Protection Regulation (GDPR) and applicable data privacy laws.
          </p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">1. What Are Cookies?</h2>
          <p className="mb-6">
            Cookies are small text files stored on your device when you visit a website. They help the website recognize your device and remember information about your visit.
          </p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">2. Types of Cookies We Use</h2>
          
          <h3 className="text-xl font-medium text-pathmaker-primary mt-4 mb-2">Strictly Necessary Cookies</h3>
          <p className="mb-4">
            Used to enable core website functions such as page navigation, secure areas, and session handling.
          </p>

          <h3 className="text-xl font-medium text-pathmaker-primary mt-4 mb-2">Performance & Analytics Cookies</h3>
          <p className="mb-4">
            Help us understand how users interact with the website (e.g. Google Analytics), so we can improve functionality and content.
          </p>

          <h3 className="text-xl font-medium text-pathmaker-primary mt-4 mb-2">Functional Cookies</h3>
          <p className="mb-6">
            Remember user preferences such as language, layout, and region to enhance your experience.
          </p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">3. Legal Basis for Use</h2>
          <p className="mb-6">
            We use cookies based on your consent, except for strictly necessary cookies, which are used under our legitimate interest in operating a secure and functional site.
          </p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">4. Managing Your Cookie Preferences</h2>
          <p className="mb-2">You can manage or withdraw your consent at any time via:</p>
          <ul className="list-disc pl-6 space-y-1 mb-6">
            <li>Our cookie banner when visiting the site</li>
            <li>Your browser settings (block or delete cookies manually)</li>
            <li>Opt-out tools (e.g. Google Analytics opt-out browser add-on)</li>
          </ul>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">5. Third-Party Cookies</h2>
          <p className="mb-6">
            We may use third-party tools (e.g., Google Analytics, LinkedIn Insights) which place cookies on your device. These third parties may process your data outside the EU under appropriate safeguards.
          </p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">6. Cookie Retention</h2>
          <p className="mb-2">Cookies are either:</p>
          <ul className="list-disc pl-6 space-y-1 mb-6">
            <li><strong>Session cookies</strong> - deleted when you close your browser</li>
            <li><strong>Persistent cookies</strong> - remain until they expire or are deleted</li>
          </ul>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">7. Updates to This Policy</h2>
          <p className="mb-6">
            We may update this Cookie Policy to reflect changes in the law or our use of cookies. Last updated: July 1, 2025
          </p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">8. Contact Us</h2>
          <p className="mb-6">
            For any questions about this policy, contact: <br/>
            <a href="mailto:jonas@roials.co" className="text-pathmaker-accent hover:underline">jonas@roials.co</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;