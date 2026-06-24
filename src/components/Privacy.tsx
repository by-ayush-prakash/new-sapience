import React, { useState } from 'react';
import { ShieldCheck, BookOpen, Clock, ChevronRight, Mail } from 'lucide-react';
import { PageType } from '../types';

interface PrivacyProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Privacy({ setCurrentPage }: PrivacyProps) {
  const [activeSection, setActiveSection] = useState('collect');

  const sections = [
    { id: 'collect', title: 'Information We Collect' },
    { id: 'use', title: 'How We Use Your Information' },
    { id: 'cookies', title: 'Cookies and Tracking' },
    { id: 'disclosure', title: 'Disclosure of Information' },
    { id: 'rights', title: 'Your Legal Rights' },
    { id: 'security', title: 'Data Security Measures' },
    { id: 'children', title: "Children's Privacy" }
  ];

  const handleScrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white text-[#333] relative min-h-[85vh]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Breadcrumb path */}
        <div className="flex items-center space-x-2 text-xs font-mono text-[#666] mb-8 border-b border-[#1A1A1A]/10 pb-4">
          <button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1A1A1A] cursor-pointer select-none transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A1A1A]">Privacy Policy</span>
        </div>

        {/* Header summary of Privacy Policy */}
        <header className="mb-12 text-left">
          <div className="flex items-center space-x-2 text-[#1A1A1A] font-sans text-xs uppercase tracking-widest font-bold mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Operational Integrity</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-sans font-medium text-[#1A1A1A] tracking-tight leading-none">
            Privacy Policy
          </h1>
          <p className="text-lg font-sans font-normal text-[#333] mt-6 max-w-2xl leading-relaxed">
            New Sapience is committed to protecting your privacy. This Privacy Policy outlines our practices concerning the collection, use, and protection of your personal information when you visit our website or use our services.
          </p>
          <div className="flex items-center space-x-6 text-xs text-[#666] font-mono mt-6">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Updated: May 2026</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Read Time: 4 mins</span>
          </div>
        </header>

        {/* Sidebar + Main Article layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-12 items-start">
          
          {/* Sticky Sidebar table of contents */}
          <aside className="lg:col-span-1 sticky top-32 space-y-2 hidden lg:block text-left">
            <h3 className="text-xs font-mono uppercase tracking-widest font-bold text-[#1A1A1A] mb-4 border-b border-[#1A1A1A]/10 pb-2">
              On This Page
            </h3>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleScrollToSection(sec.id)}
                className={`block text-xs font-sans font-medium py-2 transition-all cursor-pointer border-l-[3px] pl-4 text-left ${
                  activeSection === sec.id
                    ? 'border-[#1A1A1A] text-[#1A1A1A]'
                    : 'border-transparent text-[#666] hover:text-[#1A1A1A]'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </aside>

          {/* Actual Policy Content */}
          <main className="lg:col-span-3 max-w-none text-left space-y-12 leading-relaxed text-[#333] font-sans font-normal text-lg">
            
            <section id="collect" className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-[#1A1A1A] tracking-tight pb-2 border-b border-[#1A1A1A]/10 mt-0">
                1. Information We Collect
              </h2>
              <p className="text-lg text-[#333]">
                We may collect personal information that you voluntarily provide to us, including but not limited to:
              </p>
              <ul className="list-disc pl-5 text-lg space-y-1 text-[#333]">
                <li>Name</li>
                <li>Email address</li>
                <li>Contact information</li>
                <li>Billing and payment details</li>
                <li>User-generated content (e.g., comments, reviews)</li>
              </ul>
              <p className="text-lg text-[#333] pt-2">
                We may also collect non-personal information, such as:
              </p>
              <ul className="list-disc pl-5 text-lg space-y-1 text-[#333]">
                <li>Browser type</li>
                <li>IP address</li>
                <li>Device information</li>
                <li>Cookies and usage data</li>
              </ul>
            </section>

            <section id="use" className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-[#1A1A1A] tracking-tight pb-2 border-b border-[#1A1A1A]/10">
                2. How We Use Your Information
              </h2>
              <p className="text-lg text-[#333]">
                We may use your personal information for various purposes, including but not limited to:
              </p>
              <ul className="list-disc pl-5 text-lg space-y-1 text-[#333]">
                <li>Providing, maintaining, and improving our website and services.</li>
                <li>Processing transactions and payments.</li>
                <li>Sending updates, newsletters, and promotional materials.</li>
                <li>Responding to your inquiries and requests.</li>
                <li>Complying with legal obligations.</li>
              </ul>
            </section>

            <section id="cookies" className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-[#1A1A1A] tracking-tight pb-2 border-b border-[#1A1A1A]/10">
                3. Cookies and Tracking Technologies
              </h2>
              <p className="text-lg text-[#333]">
                We use cookies and similar tracking technologies to collect information about your browsing behavior on our website. You can manage your cookie preferences through your browser settings.
              </p>
            </section>

            <section id="disclosure" className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-[#1A1A1A] tracking-tight pb-2 border-b border-[#1A1A1A]/10">
                4. Disclosure of Your Information
              </h2>
              <p className="text-lg text-[#333]">
                We may share your personal information with third parties under the following circumstances:
              </p>
              <ul className="list-disc pl-5 text-lg space-y-1 text-[#333]">
                <li>With your consent.</li>
                <li>To comply with legal obligations.</li>
                <li>To protect our rights, privacy, safety, or property.</li>
                <li>In connection with the sale, merger, or acquisition of all or part of our business.</li>
              </ul>
            </section>

            <section id="rights" className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-[#1A1A1A] tracking-tight pb-2 border-b border-[#1A1A1A]/10">
                5. Your Rights
              </h2>
              <p className="text-lg text-[#333]">
                You have the capacity to manage and audit your personal details:
              </p>
              <ul className="list-disc pl-5 text-lg space-y-1 text-[#333]">
                <li>Access, update, or delete your personal information.</li>
                <li>Object to the processing of your personal information.</li>
                <li>Withdraw your consent, where applicable.</li>
                <li>Lodge a complaint with a supervisory authority.</li>
              </ul>
            </section>

            <section id="security" className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-[#1A1A1A] tracking-tight pb-2 border-b border-[#1A1A1A]/10">
                6. Data Security Measures
              </h2>
              <p className="text-lg text-[#333]">
                We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of data transmission over the internet or electronic storage is entirely secure. Therefore, we cannot guarantee its absolute security.
              </p>
            </section>

            <section id="children" className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-[#1A1A1A] tracking-tight pb-2 border-b border-[#1A1A1A]/10">
                7. Children&apos;s Privacy
              </h2>
              <p className="text-lg text-[#333]">
                Our website and services are not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe that a child has provided us with their personal information, please contact us, and we will take appropriate steps to delete the information.
              </p>
            </section>

            {/* General Contact Notice Box */}
            <div className="bg-white border border-[#1A1A1A]/10 p-6 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-12 text-left font-sans">
              <div>
                <h4 className="font-bold text-[#1A1A1A] text-base">Questions about our privacy guidelines?</h4>
                <p className="text-sm text-[#666] mt-1">Our compliance operations officer is waiting to process your request.</p>
              </div>
              <a
                href="mailto:comm@newsapience.com"
                className="inline-flex items-center gap-1.5 text-base text-[#1A1A1A] font-bold select-none"
              >
                <Mail className="w-4 h-4" /> comm@newsapience.com
              </a>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
