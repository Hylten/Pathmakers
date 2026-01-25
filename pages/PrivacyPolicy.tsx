import React, { useEffect } from 'react';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-medium text-pathmaker-dark mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8 font-light">Effective date: July 1, 2025</p>

        <div className="prose prose-slate max-w-none text-gray-700 font-light">
          <p className="mb-6">
            Pathmaker (“we”, “us”, “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose and safeguard your personal data in accordance with the General Data Protection Regulation (GDPR) and other applicable laws.
          </p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">1. Data Controller</h2>
          <p className="mb-4">
            <strong>Pathmaker</strong><br />
            Email: jonas@roials.co<br />
            Registered office: Pollaregatan 21, Jönköping
          </p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">2. What We Collect</h2>
          <p className="mb-2">We may collect the following categories of personal data:</p>
          <ul className="list-disc pl-6 space-y-1 mb-6">
            <li><strong>Identity Data</strong> - name, company name, job title</li>
            <li><strong>Contact Data</strong> - email, phone number, LinkedIn profile (if shared)</li>
            <li><strong>Technical Data</strong> - IP address, browser type, time zone, device info</li>
            <li><strong>Usage Data</strong> - how you interact with our site and emails</li>
            <li><strong>Marketing and Communication Data</strong> - preferences in receiving marketing</li>
          </ul>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">3. Legal Basis for Processing</h2>
          <p className="mb-4">We process your personal data under one or more of the following legal grounds:</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b text-left font-medium">Purpose</th>
                  <th className="px-4 py-2 border-b text-left font-medium">Legal Basis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">Contacting you in response to a message or inquiry</td>
                  <td className="px-4 py-2 border-b">Legitimate interest (B2B context)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">Sending newsletters or marketing</td>
                  <td className="px-4 py-2 border-b">Consent</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">Conducting pre-contractual discussions</td>
                  <td className="px-4 py-2 border-b">Legitimate interest or Contract</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">Improving website functionality and analytics</td>
                  <td className="px-4 py-2 border-b">Consent (via cookie banner)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">Compliance with legal obligations</td>
                  <td className="px-4 py-2 border-b">Legal obligation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-6">You have the right to withdraw your consent at any time.</p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">4. How We Use Your Data</h2>
          <p className="mb-2">We use personal data to:</p>
          <ul className="list-disc pl-6 space-y-1 mb-6">
            <li>Communicate with you about our services</li>
            <li>Evaluate investment or partnership opportunities</li>
            <li>Operate and improve our website and communications</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">5. How We Share Data</h2>
          <p className="mb-2">We only share data with:</p>
          <ul className="list-disc pl-6 space-y-1 mb-6">
            <li><strong>Service providers</strong> - secure platforms for email, analytics, CRM</li>
            <li><strong>Legal or regulatory authorities</strong> - when legally required</li>
          </ul>
          <p className="mb-6">
            No data is ever sold to third parties. All vendors are bound by GDPR-compliant contracts and data protection terms.
          </p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">6. International Transfers</h2>
          <p className="mb-6">
            Your data may be processed outside the EU, including in the United States, under standard contractual clauses (SCCs) or equivalent safeguards to ensure adequate protection.
          </p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">7. Your Rights Under GDPR</h2>
          <p className="mb-2">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1 mb-6">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request erasure (“right to be forgotten”)</li>
            <li>Object to processing</li>
            <li>Restrict processing</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="mb-6">To exercise any rights, email: <a href="mailto:jonas@roials.co" className="text-pathmaker-accent hover:underline">jonas@roials.co</a></p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">8. Data Retention</h2>
          <p className="mb-6">
            We retain your data only as long as necessary for the purposes set out above or as required by law.
          </p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">9. Cookies and Tracking</h2>
          <p className="mb-6">
            We use cookies for functionality and analytics. You can accept or reject cookies via our cookie banner. For more details, please see our Cookie Policy.
          </p>

          <h2 className="text-2xl font-serif font-medium text-pathmaker-dark mt-8 mb-4">10. Changes to This Policy</h2>
          <p className="mb-6">
            We may update this policy periodically. Last updated: July 1, 2025.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;