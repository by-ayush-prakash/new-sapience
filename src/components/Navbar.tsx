import React, { useState } from 'react';
import { PageType } from '../types';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import logo2 from '../assets/images/logo-2.png';

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  isDarkHero?: boolean;
  isBlueHero?: boolean;
}

export default function Navbar({ currentPage, setCurrentPage, isDarkHero = false, isBlueHero = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { 
      name: 'Invest', 
      action: () => { 
        setCurrentPage('contact'); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      } 
    },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
      isBlueHero
        ? 'bg-white border-b border-transparent shadow-none'
        : isDarkHero 
          ? 'bg-transparent border-b border-transparent' 
          : 'bg-white/90 backdrop-blur-md border-b border-[#1A1A1A]/10 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo Brand Image */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <img 
              src={logo2} 
              alt="New Sapience" 
              className="h-[36px] w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Navigation Links aligned to the right (Invest only) */}
          <div className="hidden md:flex items-center">
            <a
              href="mailto:comm@newsapience.com?subject=Investment Inquiry"
              className="invest-link-underline text-sm font-sans tracking-wide transition-all duration-300 hover:translate-y-[-0.5px]"
            >
              Invest
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none cursor-pointer transition-colors duration-200 ${
                isDarkHero 
                  ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-gray-350'
              }`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`md:hidden border-b transition-colors duration-200 ${
            isDarkHero
              ? 'bg-black/95 border-white/10 backdrop-blur-lg text-white'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            <a
              href="mailto:comm@newsapience.com?subject=Investment Inquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3.5 px-4 text-base font-sans font-medium text-[#0D2149] hover:bg-neutral-50 rounded-md transition-all duration-200"
            >
              Invest
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
