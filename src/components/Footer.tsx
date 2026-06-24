import React from 'react';
import { PageType } from '../types';
import logo2 from '../assets/images/logo-2.png';

interface FooterProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

export default function Footer({ currentPage, setCurrentPage }: FooterProps) {
  const navToPage = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLeadershipClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById('team');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById('team');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#050D1D] text-white py-16 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 w-full relative overflow-hidden text-left border-t border-white/5">
      <div className="max-w-[1700px] mx-auto w-full relative z-10">
        
        {/* Upper footer links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8 pb-12 border-b border-white/10">
          
          {/* Logo column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-5 flex flex-col items-start justify-start">
            <button 
              onClick={() => navToPage('home')} 
              className="flex items-center cursor-pointer mb-6 border-0 bg-transparent p-0 focus:outline-none"
              aria-label="Home"
            >
              <img 
                src={logo2} 
                alt="New Sapience" 
                className="h-[44px] w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </button>
            <p className="text-white/60 text-sm max-w-xs font-sans leading-relaxed tracking-tight">
              Synthetic Intelligence for the systems that cannot afford to be wrong
            </p>
          </div>

          {/* Company column */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 flex flex-col space-y-4">
            <h4 className="text-[11px] sm:text-xs font-semibold tracking-wider text-white/40 uppercase font-sans">
              Company
            </h4>
            <div className="flex flex-col space-y-2.5">
              <button 
                onClick={handleLeadershipClick}
                className="text-white/70 hover:text-white transition-colors text-sm sm:text-base font-sans font-normal text-left w-fit cursor-pointer"
              >
                Leadership
              </button>
              <a 
                href="mailto:comm@newsapience.com?subject=Demo Request"
                className="text-white/70 hover:text-white transition-colors text-sm sm:text-base font-sans font-normal text-left w-fit"
              >
                Request a Demo
              </a>
              <a 
                href="mailto:comm@newsapience.com?subject=Investment Inquiry"
                className="text-white/70 hover:text-white transition-colors text-sm sm:text-base font-sans font-normal text-left w-fit"
              >
                Invest
              </a>
            </div>
          </div>

          {/* Social column */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 flex flex-col space-y-4">
            <h4 className="text-[11px] sm:text-xs font-semibold tracking-wider text-white/40 uppercase font-sans">
              Social
            </h4>
            <div className="flex flex-col space-y-2.5">
              <a 
                href="https://www.linkedin.com/company/new-sapience/" 
                target="_blank" 
                rel="noreferrer noopener"
                className="text-white/70 hover:text-white transition-colors text-sm sm:text-base font-sans font-normal text-left w-fit"
              >
                LinkedIn
              </a>
              <a 
                href="https://www.youtube.com/@newsapience" 
                target="_blank" 
                rel="noreferrer noopener"
                className="text-white/70 hover:text-white transition-colors text-sm sm:text-base font-sans font-normal text-left w-fit"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Contact column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col space-y-4">
            <h4 className="text-[11px] sm:text-xs font-semibold tracking-wider text-white/40 uppercase font-sans">
              Contact
            </h4>
            <div className="flex flex-col space-y-2.5">
              <a 
                href="mailto:comm@newsapience.com"
                className="text-white/70 hover:text-white transition-colors text-sm sm:text-base font-sans font-normal tracking-tight break-all sm:break-normal whitespace-normal sm:whitespace-nowrap"
              >
                comm@newsapience.com
              </a>
            </div>
          </div>

        </div>

        {/* Lower footer copyright & legal row */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-y-6 items-start">
          
          {/* Left Block: Copyright and Legal list */}
          <div className="flex flex-col space-y-3.5">
            <p className="text-xs sm:text-sm text-white/40 font-sans">
              © 2026 New Sapience, Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-white/50">
              <button 
                onClick={() => navToPage('privacy')} 
                className="hover:text-white transition-colors cursor-pointer text-left font-sans"
              >
                Privacy Policy
              </button>
              <span className="text-white/20">|</span>
              <button 
                onClick={() => navToPage('disclaimer')} 
                className="hover:text-white transition-colors cursor-pointer text-left font-sans"
              >
                Disclaimer
              </button>
            </div>
          </div>

          {/* Right Block: Double check email visible on right */}
          <div className="md:text-right flex flex-col md:items-end justify-start">
            <span className="text-xs text-white/30 font-sans tracking-wide uppercase mb-1">
              General Inquiries
            </span>
            <a 
              href="mailto:comm@newsapience.com" 
              className="text-white/80 hover:text-white text-sm sm:text-base transition-colors font-sans break-all sm:break-normal whitespace-normal sm:whitespace-nowrap"
            >
              comm@newsapience.com
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
