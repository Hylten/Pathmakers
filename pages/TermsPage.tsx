import React, { useEffect } from 'react';

const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-medium text-pathmaker-dark mb-2">Terms & Conditions</h1>
        <p className="text-gray-500 mb-8 font-light">Effective date: July 1, 2025</p>

        <div className="prose prose-slate max-w-none text-gray-700 font-light">
          <p className="mb-6">
            Welcome to Pathmaker. By accessing or using our website, you agree to the terms below. If you do not agree, please refrain from using the site.
          </p>

          <h3 className="text-xl font-medium text-pathmaker-dark mt-8 mb-2">Scope of Services</h3>
          <p className="mb-4">
            Pathmaker provides M&A Services, capital execution, investor communications, and strategic advisory services to qualified businesses and institutions. We do not offer investment advice to individuals or solicit funds from the general public.
          </p>

          <h3 className="text-xl font-medium text-pathmaker-dark mt-8 mb-2">No Investment Advice</h3>
          <p className="mb-4">
            All site content is informational. Nothing constitutes investment advice, solicitation, or recommendation. Users must perform independent due diligence.
          </p>

          <h3 className="text-xl font-medium text-pathmaker-dark mt-8 mb-2">Eligibility</h3>
          <p className="mb-4">
            Our services are intended for institutional clients and authorized business representatives. You must be at least 18 years old.
          </p>

          <h3 className="text-xl font-medium text-pathmaker-dark mt-8 mb-2">Intellectual Property</h3>
          <p className="mb-4">
            All content on this site is owned by Pathmaker. No reproduction is permitted without written consent.
          </p>

          <h3 className="text-xl font-medium text-pathmaker-dark mt-8 mb-2">Third-Party Services</h3>
          <p className="mb-4">
            We may integrate third-party tools (e.g., analytics, OAuth). Use is governed by their respective terms and privacy policies.
          </p>

          <h3 className="text-xl font-medium text-pathmaker-dark mt-8 mb-2">Data & Privacy</h3>
          <p className="mb-4">
            Use of this site implies consent to our Privacy Policy and Cookie Policy, including handling of personal data under GDPR.
          </p>

          <h3 className="text-xl font-medium text-pathmaker-dark mt-8 mb-2">Limitation of Liability</h3>
          <p className="mb-4">
            We are not liable for any direct or indirect damages resulting from site use.
          </p>

          <h3 className="text-xl font-medium text-pathmaker-dark mt-8 mb-2">Jurisdiction</h3>
          <p className="mb-4">
            These terms are governed by the laws of Sweden, with exclusive jurisdiction in its courts.
          </p>

          <h3 className="text-xl font-medium text-pathmaker-dark mt-8 mb-2">Modifications</h3>
          <p className="mb-4">
            We may update these terms without notice. Continued use implies acceptance of the latest version.
          </p>

          <h3 className="text-xl font-medium text-pathmaker-dark mt-8 mb-2">Contact</h3>
          <p className="mb-4">
            For questions, email <a href="mailto:jonas@roials.co" className="text-pathmaker-accent hover:underline">jonas@roials.co</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;