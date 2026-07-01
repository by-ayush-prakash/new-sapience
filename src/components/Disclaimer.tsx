import React from 'react';
import { ShieldAlert, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { PageType } from '../types';

interface DisclaimerProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Disclaimer({ setCurrentPage }: DisclaimerProps) {
  return (
    <div className="pt-32 pb-24 bg-white text-[#333] relative min-h-[85vh]">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-mono text-[#666] mb-8 border-b border-[#1A1A1A]/10 pb-4">
          <button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1A1A1A] cursor-pointer select-none transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A1A1A]">Disclaimer</span>
        </div>

        {/* Article Header */}
        <header className="mb-12 text-left">
          <div className="flex items-center space-x-2 text-[#1A1A1A] font-sans text-xs uppercase tracking-widest font-bold mb-3">
            <ShieldAlert className="w-4 h-4" />
            <span>Legal Notice</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-sans font-medium text-[#1A1A1A] tracking-tight leading-none">
            Disclaimer
          </h1>
          <div className="flex items-center space-x-6 text-xs text-[#666] font-mono mt-6">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Published: May 2026</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Reading Time: 3 mins</span>
          </div>
        </header>

        {/* Content Body */}
        <article className="max-w-none text-left space-y-8 leading-relaxed font-sans font-normal text-lg text-[#333]">
          
          <div className="p-5 rounded-md bg-gray-100 border border-[#1A1A1A]/10 flex gap-4">
            <ShieldAlert className="w-8 h-8 text-[#1A1A1A] flex-shrink-0 mt-1" />
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-[#1A1A1A] font-sans uppercase tracking-wider">Crowdfunding Risky Notice</h3>
              <p className="text-base text-[#333] font-sans">
                Equity crowdfunding investments in private placements, and start-up investments in particular, are speculative and involve a high degree of risk and those investors who cannot afford to lose their entire investment should not invest in start-ups.
              </p>
            </div>
          </div>

          <p className="text-lg">
            Companies seeking startup investment through equity crowdfunding tend to be in earlier stages of development and their business model, products and services may not yet be fully developed, operational or tested in the public marketplace. There is no guarantee that the stated valuation and other terms are accurate or in agreement with the market or industry valuations. Further, investors may receive illiquid and/or restricted stock that may be subject to holding period requirements and/or liquidity concerns.
          </p>

          <h2 className="text-2xl font-sans font-medium text-[#1A1A1A] tracking-tight pt-4 pb-2 border-b border-[#1A1A1A]/10 flex items-center gap-2">
            Forward-Looking Statements
          </h2>
          <p className="text-lg">
            This website contains forward-looking statements. These statements may include the words <strong>“believe”</strong>, <strong>“expect”</strong>, <strong>“anticipate”</strong>, <strong>“intend”</strong>, <strong>“plan”</strong>, <strong>“estimate”</strong>, <strong>“project”</strong>, <strong>“will”</strong>, <strong>“may”</strong>, <strong>“targeting”</strong> and similar expressions as well as statements other than statements of historical facts including, without limitation, those regarding the financial position, business strategy, plans, targets and objectives of the management of New Sapience, Inc. (the <strong>“Company”</strong>) for future operations (including development plans and objectives).
          </p>

          <p className="text-lg">
            Such forward-looking statements involve known and unknown risks, uncertainties and other important factors which may affect the Company’s ability to implement and achieve the economic and monetary policies, budgetary plans, fiscal guidelines and other development benchmarks set out in such forward-looking statements and which may cause actual results, performance or achievements to be materially different from future results, performance or achievements expressed or implied by such forward-looking statements.
          </p>

          <p className="text-lg">
            Such forward-looking statements are based on numerous assumptions regarding the Company’s present and future policies and plans and the environment in which the Company will operate in the future. Furthermore, certain forward-looking statements are based on assumptions or future events which may not prove to be accurate, and no reliance whatsoever should be placed on any forward-looking statements in this presentation.
          </p>

          <div className="bg-white border border-[#1A1A1A]/10 rounded-md p-6 text-base text-[#333] mt-8 space-y-2 font-sans">
            <h4 className="font-bold text-[#1A1A1A] uppercase tracking-widest font-mono text-xs">Form C Obligations Compliance</h4>
            <p className="leading-relaxed">
              The forward-looking statements in this website speak only as of the date of the Company’s initial Form C, and the Company expressly disclaims to the fullest extent permitted by law any obligation or undertaking to disseminate any updates or revisions to any forward-looking statements contained herein to reflect any change in expectations with regard thereto or any change in events, conditions or circumstances on which any such statements are based.
            </p>
          </div>

        </article>

      </div>
    </div>
  );
}
