import React, { useState, useEffect, useRef } from 'react';
import { PageType } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import Disclaimer from './components/Disclaimer';
import Privacy from './components/Privacy';
import logoImage from './assets/images/logo.png';
import bryantCruseImg from './assets/images/BryantUp.jpg';
import williamReaddyImg from './assets/images/williamreaddy.jpg.webp';
import williamBandyImg from './assets/images/billbandy.jpg';
import markHymanImg from './assets/images/markhyman.png';
import defenseC2Img from './assets/images/defense-c2.jpg';
import satelliteImg from './assets/images/satellite.jpg';
import nuclearImg from './assets/images/nuclear.jpg';
import powergridImg from './assets/images/powergrid.jpg';
import jackFrassanitoImg from './assets/images/jack frassanito.jpeg';
import paulRichardsImg from './assets/images/Paul_Richards.jpg';
import jamesFreisImg from './assets/images/james freis.jpg.webp';
import { 
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const HERO_BACKGROUND_BLOCKS = [
  { top: '12%', left: '4%', mobileTop: '12%', mobileLeft: '4%', size: '24px', color: '#1a3fa0', opacity: 0.80, rotate: '0deg', isSquare: true },
  { top: '8%', left: '38%', mobileTop: '8%', mobileLeft: '32%', size: '36px', color: '#2e5bd6', opacity: 0.75, rotate: '0deg', isSquare: false },
  { top: '88%', left: '3%', mobileTop: '88%', mobileLeft: '4%', size: '20px', color: '#0052ff', opacity: 0.85, rotate: '0deg', isSquare: true },
  /* Overlaps bottom of the blue orb on mobile (centered bottom) -> moved to the left with clear spacing instead of overlapping */
  { top: '88%', left: '38%', mobileTop: '82%', mobileLeft: '12%', size: '48px', color: '#2e5bd6', opacity: 0.70, rotate: '0deg', isSquare: false },
  /* Clips beyond viewport edge on mobile (left: 85% + size) -> adjusted further left to fit fully in viewport without overflow */
  { top: '15%', left: '85%', mobileTop: '2%', mobileLeft: '84%', size: '40px', color: '#1a3fa0', opacity: 0.90, rotate: '0deg', isSquare: true },
  /* Clips beyond viewport edge on mobile (left: 92% + size) -> adjusted further left to fit fully in viewport without overflow */
  { top: '45%', left: '92%', mobileTop: '45%', mobileLeft: '82%', size: '28px', color: '#0052ff', opacity: 0.80, rotate: '0deg', isSquare: false },
  /* Overlaps bottom-left of the blue orb on mobile -> moved further left to keep clear spacing instead of overlapping */
  { top: '82%', left: '78%', mobileTop: '82%', mobileLeft: '75%', size: '44px', color: '#1a3fa0', opacity: 0.75, rotate: '0deg', isSquare: true },
  /* Repositioned on mobile to sit fully below the end of the body paragraph, clear of any wrap text lines */
  { top: '56%', left: '72%', mobileTop: '56%', mobileLeft: '82%', size: '32px', color: '#2e5bd6', opacity: 0.85, rotate: '0deg', isSquare: true },
  { top: '9%', left: '60%', mobileTop: '9%', mobileLeft: '55%', size: '45px', color: '#0052ff', opacity: 0.70, rotate: '0deg', isSquare: false },
  /* Overlaps bottom-left of the blue orb on mobile -> moved further left to keep clear spacing instead of overlapping */
  { top: '90%', left: '22%', mobileTop: '90%', mobileLeft: '11%', size: '30px', color: '#2e5bd6', opacity: 0.80, rotate: '0deg', isSquare: true },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Dynamic mobile viewport state detector
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Scroll listener to toggle transparent/dark vs light solid navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 55);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync hash links if present on load or hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#about') {
        setCurrentPage('home');
        setTimeout(() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (hash.includes('contact')) {
        setCurrentPage('contact');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 400;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-[#1A1A1A] overflow-x-hidden bg-white">
      
      {/* Shared Header Navigation */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} isDarkHero={false} isBlueHero={currentPage === 'home' && !scrolled} />

      <AnimatePresence mode="wait">
        
        {/* Contact Page */}
        {currentPage === 'contact' && (
          <motion.div
            key="contact-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="pt-24"
          >
            <ContactForm setCurrentPage={setCurrentPage} />
          </motion.div>
        )}

        {/* Disclaimer Page */}
        {currentPage === 'disclaimer' && (
          <motion.div
            key="disclaimer-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="pt-24"
          >
            <Disclaimer setCurrentPage={setCurrentPage} />
          </motion.div>
        )}

        {/* Privacy Page */}
        {currentPage === 'privacy' && (
          <motion.div
            key="privacy-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="pt-24"
          >
            <Privacy setCurrentPage={setCurrentPage} />
          </motion.div>
        )}

        {/* Home/Landing Index Page */}
        {currentPage === 'home' && (
          <motion.div
            key="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* HERO SECTION - CLEAN, LIGHT-THEMED LAYOUT */}
            <section id="hero" className="relative w-full bg-white min-h-[550px] sm:min-h-[650px] flex flex-col justify-center pt-32 pb-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 overflow-hidden">
              
              {/* Scattered background blocks layer */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
                {HERO_BACKGROUND_BLOCKS.map((block, idx) => (
                  <div
                    key={`hero-bg-block-${idx}`}
                    className="absolute"
                    style={{
                      top: isMobile ? block.mobileTop : block.top,
                      left: isMobile ? block.mobileLeft : block.left,
                      width: block.size,
                      height: block.isSquare ? block.size : `calc(${block.size} * 0.75)`,
                      backgroundColor: block.color,
                      opacity: block.opacity,
                      transform: `rotate(${block.rotate})`,
                      borderRadius: '0px',
                    }}
                  />
                ))}
              </div>

              <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* Left side, roughly 60% width, vertically centered */}
                <div id="hero-left-zone" className="lg:col-span-8 flex flex-col justify-center items-start text-left">
                  {/* Bold sans-serif headline, single line, dark navy or near-black */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[48px] font-sans font-medium text-[#0D2149] leading-tight tracking-tight mb-4 animate-fadeIn">
                    The First Deterministic AI Platform for Mission-Critical Industries
                  </h1>
                  
                  {/* Short paragraph in gray text, smaller size removed */}
                  
                  {/* Invest Button formatted as plain text with a brand-blue underline that thickens on hover */}
                  <div className="flex items-center animate-fadeIn delay-150 pt-2">
                    <a
                      id="hero-invest-btn"
                      href="mailto:comm@newsapience.com?subject=Investment Inquiry"
                      className="invest-link-underline text-sm sm:text-base font-sans tracking-wide py-1 transition-all duration-300 hover:translate-y-[-0.5px]"
                    >
                      Invest
                    </a>
                  </div>
                </div>

                {/* Right side, roughly 33-35% width */}
                <div id="hero-right-zone" className="lg:col-span-4 flex items-center justify-center lg:justify-end">
                  {/* Circular globe/sunrise logo mark with a soft glow and drop shadow behind it */}
                  <div className="relative flex items-center justify-center select-none animate-fadeIn delay-100">
                    <div className="absolute inset-[-15px] bg-gradient-to-tr from-[#2e7fd6]/15 via-[#5aaff0]/10 to-transparent rounded-full blur-2xl opacity-80" />
                    <img 
                      src={logoImage} 
                      alt="New Sapience Logo Mark" 
                      className="h-[150px] w-[150px] sm:h-[180px] sm:w-[180px] object-contain relative z-10 drop-shadow-[0_12px_24px_rgba(46,127,214,0.2)]" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

              </div>
            </section>

            <div className="w-full border-t border-[#1A1A1A]/10" />

            {/* LARGE STATEMENT SECTION */}
            <section className="bg-white py-16 sm:py-20 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 w-full text-center relative">
              <div className="max-w-[1400px] mx-auto">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-sans font-medium text-[#1A1A1A] tracking-tight leading-tight sm:leading-tight md:leading-tight lg:leading-snug xl:leading-snug max-w-4xl mx-auto">
                  sapiens make decisions that can be <span className="font-semibold">trusted, explained, and proven</span>, where a wrong answer costs a mission, an asset, or a life.
                </p>
              </div>
            </section>

            <div className="w-full border-t border-[#1A1A1A]/10" />

            {/* STATS BAR */}
            <section className="bg-white py-16 sm:py-20 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 w-full">
              <div className="max-w-[1200px] mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12 md:gap-x-16 lg:gap-x-24 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-[11px] sm:text-xs font-sans font-medium tracking-widest text-[#1A1A1A]/50 uppercase">
                      Years building mission-critical AI
                    </p>
                    <div className="text-5xl sm:text-6xl lg:text-7xl font-sans font-medium text-[#0D2149] tracking-tight leading-none">
                      40+
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-[11px] sm:text-xs font-sans font-medium tracking-widest text-[#1A1A1A]/50 uppercase">
                      Founder and Team Exits
                    </p>
                    <div className="text-5xl sm:text-6xl lg:text-7xl font-sans font-medium text-[#0D2149] tracking-tight leading-none">
                      $350M+
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-[11px] sm:text-xs font-sans font-medium tracking-widest text-[#1A1A1A]/50 uppercase">
                      Performance, at lower cost
                    </p>
                    <div className="text-5xl sm:text-6xl lg:text-7xl font-sans font-medium text-[#0D2149] tracking-tight leading-none">
                      10x
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="w-full border-t border-[#1A1A1A]/10" />

            {/* SECTION 3 - OUR APPROACH */}
            <section id="technology" className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 bg-white relative overflow-hidden w-full">
              <div className="w-full max-w-[1700px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] xl:grid-cols-[1fr_2fr] gap-12 lg:gap-0 mb-6 lg:mb-8 text-left items-start pb-6">
                  <div className="lg:pr-12">
                    <h2 className="text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] font-sans font-medium tracking-tight text-[#1A1A1A] leading-[1.15]">
                      Our Approach
                    </h2>
                  </div>
                  <div className="lg:pl-12 lg:border-l border-transparent">
                    <p className="text-[#1A1A1A]/85 text-base md:text-lg xl:text-[19px] leading-relaxed font-sans font-normal max-w-3xl pt-2 tracking-tight">
                      Generative AI is right most of the time. You are not in a most-of-the-time business. That is why our knowledge is built directly from human expertise, has zero hallucinations, does not require data centers or training data, lives on-device, and is far cheaper than anything on the market.
                    </p>
                  </div>
                </div>

                <div className="w-full flex flex-col">
                  {/* Row 1 */}
                  <div className="border-t border-[#1A1A1A]/10 py-12 md:py-16 relative">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col text-left pr-6">
                        <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-[#0D2149] tracking-tight mb-4 select-none">
                          Deterministic
                        </h3>
                        <p className="text-[#1A1A1A]/75 text-base md:text-lg font-sans font-normal leading-relaxed">
                          Same input, same output. Every time, without exception. A sapiens reasons from a complete world model of how things actually work. There is no randomness, no variance, no surprises.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="border-t border-[#1A1A1A]/10 py-12 md:py-16 relative">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col text-left pr-6">
                        <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-[#0D2149] tracking-tight mb-4 select-none">
                          Zero-Hallucination
                        </h3>
                        <p className="text-[#1A1A1A]/75 text-base md:text-lg font-sans font-normal leading-relaxed">
                          A sapiens answers from what it knows. When it encounters the boundary of its knowledge, it says so. Fabrication is impossible by design.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="border-t border-[#1A1A1A]/10 py-12 md:py-16 relative">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col text-left pr-6">
                        <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-[#0D2149] tracking-tight mb-4 select-none">
                          Edge-Native
                        </h3>
                        <p className="text-[#1A1A1A]/75 text-base md:text-lg font-sans font-normal leading-relaxed">
                          Runs on a single device. No internet connection, no cloud, no data center required. A sapiens works wherever it is deployed, including environments that are completely air-gapped from the outside world.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="border-t border-[#1A1A1A]/10 py-12 md:py-16 relative">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col text-left pr-6">
                        <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-[#0D2149] tracking-tight mb-4 select-none">
                          Interpretable
                        </h3>
                        <p className="text-[#1A1A1A]/75 text-base md:text-lg font-sans font-normal leading-relaxed">
                          Every step of a sapiens&apos; reasoning is visible and open to inspection. Not a summary. The full chain of thought, reviewable at any point by anyone who needs to verify it.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div className="border-t border-[#1A1A1A]/10 py-12 md:py-16 relative">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col text-left pr-6">
                        <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-[#0D2149] tracking-tight mb-4 select-none">
                          Sovereign
                        </h3>
                        <p className="text-[#1A1A1A]/75 text-base md:text-lg font-sans font-normal leading-relaxed">
                          You own the complete model. Every concept the sapiens knows can be read top to bottom, extended by your own experts, and operated on your own infrastructure permanently. Nothing is hidden. Nothing phones home.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Row 6 */}
                  <div className="border-t border-[#1A1A1A]/10 py-12 md:py-16 relative">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col text-left pr-6">
                        <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-[#0D2149] tracking-tight mb-4 select-none">
                          Near-Zero Energy
                        </h3>
                        <p className="text-[#1A1A1A]/75 text-base md:text-lg font-sans font-normal leading-relaxed">
                          No GPU clusters. No training compute. No data centers. A sapiens runs on a single edge device, making it the most energy-efficient AI architecture available for mission-critical deployment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>



            <div className="w-full border-t border-[#1A1A1A]/10" />

            {/* COMPONENT: BUILT FOR THE WORK WHERE FAILURE ISN'T AN OPTION. */}
            <section id="failure-section" className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 bg-white w-full relative overflow-hidden">
              <div className="w-full max-w-[1700px] mx-auto animate-fadeIn">
                
                {/* Unified structural header grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] xl:grid-cols-[1fr_2fr] gap-12 lg:gap-0 mb-16 lg:mb-20 text-left items-start border-b border-[#1A1A1A]/20 pb-16">
                  <div className="lg:pr-12">
                    <h2 className="text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] font-sans font-medium tracking-tight text-[#1A1A1A] leading-[1.15]">
                      Own the Model Not Just the Output
                    </h2>
                  </div>
                  <div className="lg:pl-12 lg:border-l border-transparent">
                    <p className="text-[#1A1A1A]/85 text-base md:text-lg xl:text-[19px] leading-relaxed font-sans font-normal max-w-3xl pt-2 tracking-tight">
                      Nations and enterprises operating sensitive infrastructure cannot route their data through someone else&apos;s system. With a sapiens, you inspect every concept it knows, extend it with your own experts, and run it on your own infrastructure permanently. The model is yours. Not leased. Not dependent on a vendor staying in business. Yours.
                    </p>
                  </div>
                </div>

                {/* Grid of rows */}
                <div className="flex flex-col gap-16 md:gap-20">
                  
                  {/* First Row: Space Operations & Cybersecurity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0 md:gap-x-12 lg:gap-x-16 relative">
                    {/* Column 1 */}
                    <div className="flex flex-col justify-between h-full">
                      <div className="mb-8">
                        <h3 className="text-lg sm:text-xl font-sans font-semibold text-[#1A1A1A] tracking-tight mb-3">
                          Space Operations
                        </h3>
                        <p className="text-[#1A1A1A]/80 text-base md:text-lg leading-relaxed font-sans font-light">
                          A sapiens monitors thousands of telemetry values simultaneously, identifies anomalies in real time, and sequences commands with zero margin for error. Bryant Cruse pioneered this kind of telemetry-analysis system on the Hubble Space Telescope. That same capability, continuous, reliable oversight of complex spacecraft state, is what New Sapience delivers today. No tired operator. No missed signal. No ambiguous reading.
                        </p>
                      </div>
                      <div className="w-full aspect-[16/10] overflow-hidden rounded-xl border border-[#1A1A1A]/10 relative group/img bg-[#0D2149]/90">
                        <img 
                          src={satelliteImg} 
                          alt="Space Operations" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.02] brightness-[0.98] transition-all duration-700 ease-out group-hover/img:scale-105 group-hover/img:saturate-100 group-hover/img:brightness-100" 
                        />
                        <div className="absolute inset-0 bg-[#0D2149]/10 mix-blend-multiply opacity-65 pointer-events-none transition-opacity duration-500 group-hover/img:opacity-0" />
                      </div>
                    </div>

                    {/* Thin vertical divider (desktop only) */}
                    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#1A1A1A]/10 -translate-x-1/2" />

                    {/* Column 2 */}
                    <div className="flex flex-col justify-between h-full">
                      <div className="mb-8">
                        <h3 className="text-lg sm:text-xl font-sans font-semibold text-[#1A1A1A] tracking-tight mb-3">
                          Cybersecurity
                        </h3>
                        <p className="text-[#1A1A1A]/80 text-base md:text-lg leading-relaxed font-sans font-light">
                          A sapiens monitors system state continuously against a complete world model of what normal looks like. Every deviation is identified exactly. Not scored, not estimated, not left for a human to interpret. Either the system is behaving correctly or it is not. That precision is what makes a sapiens effective where best-guess threat detection creates as many problems as it solves. No guessing. No false confidence. A clear answer, every time.
                        </p>
                      </div>
                      <div className="w-full aspect-[16/10] overflow-hidden rounded-xl border border-[#1A1A1A]/10 relative group/img bg-[#0D2149]/90">
                        <img 
                          src={defenseC2Img} 
                          alt="Cybersecurity" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.02] brightness-[0.98] transition-all duration-700 ease-out group-hover/img:scale-105 group-hover/img:saturate-100 group-hover/img:brightness-100" 
                        />
                        <div className="absolute inset-0 bg-[#0D2149]/10 mix-blend-multiply opacity-65 pointer-events-none transition-opacity duration-500 group-hover/img:opacity-0" />
                      </div>
                    </div>
                  </div>

                  {/* Thin horizontal divider between row 1 and row 2 */}
                  <div className="border-t border-[#1A1A1A]/10 w-full" />

                  {/* Second Row: Nuclear Power & Grid Management */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0 md:gap-x-12 lg:gap-x-16 relative">
                    {/* Column 3 */}
                    <div className="flex flex-col justify-between h-full">
                      <div className="mb-8">
                        <h3 className="text-lg sm:text-xl font-sans font-semibold text-[#1A1A1A] tracking-tight mb-3">
                          Nuclear Power
                        </h3>
                        <p className="text-[#1A1A1A]/80 text-base md:text-lg leading-relaxed font-sans font-light">
                          A sapiens reads every instrument continuously, separates real anomalies from sensor noise, and tells operators exactly what is wrong and why. A clear signal at the moment it matters most, not a flood of data to interpret under pressure. The Three Mile Island accident was driven by misread instruments at exactly that moment. A sapiens removes that variable entirely.
                        </p>
                      </div>
                      <div className="w-full aspect-[16/10] overflow-hidden rounded-xl border border-[#1A1A1A]/10 relative group/img bg-[#0D2149]/90">
                        <img 
                          src={nuclearImg} 
                          alt="Nuclear Power" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.02] brightness-[0.98] transition-all duration-700 ease-out group-hover/img:scale-105 group-hover/img:saturate-100 group-hover/img:brightness-100" 
                        />
                        <div className="absolute inset-0 bg-[#0D2149]/10 mix-blend-multiply opacity-65 pointer-events-none transition-opacity duration-500 group-hover/img:opacity-0" />
                      </div>
                    </div>

                    {/* Thin vertical divider (desktop only) */}
                    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#1A1A1A]/10 -translate-x-1/2" />

                    {/* Column 4 */}
                    <div className="flex flex-col justify-between h-full">
                      <div className="mb-8">
                        <h3 className="text-lg sm:text-xl font-sans font-semibold text-[#1A1A1A] tracking-tight mb-3">
                          Grid Management
                        </h3>
                        <p className="text-[#1A1A1A]/80 text-base md:text-lg leading-relaxed font-sans font-light">
                          A sapiens watches the full grid simultaneously, every node, every load, every developing fault. It catches cascade risk before it propagates and coordinates response across distributed assets in real time. The 2003 Northeast blackout began as a small local fault that went undetected until it was too late. A sapiens catches it early. That is what it means to have eyes on the whole system at once.
                        </p>
                      </div>
                      <div className="w-full aspect-[16/10] overflow-hidden rounded-xl border border-[#1A1A1A]/10 relative group/img bg-[#0D2149]/90">
                        <img 
                          src={powergridImg} 
                          alt="Grid Management" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.02] brightness-[0.98] transition-all duration-700 ease-out group-hover/img:scale-105 group-hover/img:saturate-100 group-hover/img:brightness-100" 
                        />
                        <div className="absolute inset-0 bg-[#0D2149]/10 mix-blend-multiply opacity-65 pointer-events-none transition-opacity duration-500 group-hover/img:opacity-0" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            <div className="w-full border-t border-[#1A1A1A]/10" />

            {/* THE TEAM SECTION */}
            <section id="team" className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 bg-white w-full relative overflow-hidden">
              <div className="w-full max-w-[1700px] mx-auto">
                
                {/* Unified structural header grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] xl:grid-cols-[1fr_2fr] gap-12 lg:gap-0 mb-12 text-left items-start pb-12 border-b border-[#1A1A1A]/10">
                  <div className="lg:pr-12">
                    <h2 className="text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] font-sans font-medium tracking-tight text-[#1A1A1A] leading-[1.15]">
                      Leadership & Advisors
                    </h2>
                  </div>
                  <div className="lg:pl-12 lg:border-l border-transparent flex flex-col space-y-4">
                    <p className="text-[#1A1A1A]/85 text-base md:text-lg xl:text-[19px] leading-relaxed font-sans font-normal max-w-3xl pt-2 tracking-tight">
                      New Sapience comes out of spacecraft engineering. Its founder, Bryant Cruse, developed the first AI application for spacecraft telemetry analysis, pioneering it on the Hubble Space Telescope, and at Altair Aerospace developed a way to compile an engineer&apos;s knowledge of a spacecraft directly into software. He founded New Sapience in 2015 to extend the method from a single spacecraft to operations in the world at large.
                    </p>
                    <p className="text-[#1A1A1A]/85 text-base md:text-lg xl:text-[19px] leading-relaxed font-sans font-normal max-w-3xl tracking-tight">
                      The team around him have led NASA design and flight teams, served on half a dozen U.S. security, research, and intelligence programs, and advised global financial institutions. Several have founded and sold companies of their own.
                    </p>
                  </div>
                </div>

                {/* Team Grid inside one unified container */}
                <div className="border border-[#1A1A1A]/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white overflow-hidden">
                  {[
                    {
                      name: "Bryant Cruse",
                      title: "Founder, CEO & Chairman",
                      bio: "Created the first AI application for spacecraft telemetry analysis, pioneering it on the Hubble Space Telescope. Led Talarian (acquired by TIBCO) and Altair Aerospace, which delivered ground-control and launch systems for customers including Boeing’s Delta IV and the Conestoga launch vehicle (acquired by Aeroflex).",
                      image: bryantCruseImg,
                      isPlaceholder: false
                    },
                    {
                      name: "William Readdy",
                      title: "Chief Partnerships Officer",
                      bio: "NASA astronaut, 672 hours in space. Former NASA Associate Administrator for Space Flight, leading a $7B enterprise of 40,000 personnel.",
                      image: williamReaddyImg,
                      isPlaceholder: false
                    },
                    {
                      name: "William Bandy",
                      title: "Chief Intellectual Property Officer",
                      bio: "PhD physicist. 30-year career at NSA and DARPA. Co-founded Matrics, acquired by Symbol Technologies for $230M. 100+ patents.",
                      image: williamBandyImg,
                      isPlaceholder: false
                    },
                    {
                      name: "Mark Hyman",
                      title: "Chief Strategy Officer",
                      bio: "30-year Navy career. Intelligence assignments at CIA, DIA, NSA, and the National Reconnaissance Office. NSA Advisory Board.",
                      image: markHymanImg,
                      isPlaceholder: false
                    },
                    {
                      name: "Jack Frassanito",
                      title: "Advisor",
                      bio: "Co-inventor of the first desktop personal computer and of video conferencing. For over three decades, one of NASA's principal concept designers, from Skylab to the ISS to lunar and Mars mission architectures.",
                      image: jackFrassanitoImg,
                      isPlaceholder: false
                    },
                    {
                      name: "Paul Richards",
                      title: "Advisor",
                      bio: "NASA astronaut with 307+ hours in space. Invented the NASA Pistol Grip Tool, standard spacewalk equipment since 1996. Now Chief Strategy Officer and Chief Engineer at Revolution Space.",
                      image: paulRichardsImg,
                      isPlaceholder: false
                    },
                    {
                      name: "James Freis",
                      title: "Advisor",
                      bio: "Former Director of FinCEN at the U.S. Treasury. Appointed CEO of Wirecard to stabilize the €24B fintech after its collapse. Former Senior Counsel at the Bank for International Settlements. JD, Harvard Law; CFA.",
                      image: jamesFreisImg,
                      isPlaceholder: false
                    }
                  ].map((member, index) => {
                    const isLast = index === 6;
                    const isEven = index % 2 === 0;
                    const col4 = index % 4;
                    const isLastRow4 = index >= 4;

                    const mobileBorder = !isLast ? 'border-b' : '';
                    const mdBorderR = isEven ? 'md:border-r' : 'md:border-r-0';
                    const mdBorderB = index < 6 ? 'md:border-b' : 'md:border-b-0';
                    const lgBorderR = col4 !== 3 ? 'lg:border-r' : 'lg:border-r-0';
                    const lgBorderB = !isLastRow4 ? 'lg:border-b' : 'lg:border-b-0';

                    return (
                      <div 
                        key={index} 
                        className={`flex flex-col text-left bg-white group transition-colors duration-300 hover:bg-[#0D2149]/[0.005]
                          ${mobileBorder}
                          ${mdBorderR}
                          ${mdBorderB}
                          ${lgBorderR}
                          ${lgBorderB}
                          border-[#1A1A1A]/10`}
                      >
                        {/* Square photo with cohesive elegant zoom transition */}
                        <div className="w-full aspect-square bg-[#0D2149]/5 relative overflow-hidden flex items-center justify-center">
                          {member.isPlaceholder ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 border-b border-r border-[#1A1A1A]/5">
                              <div className="w-16 h-16 rounded-full bg-[#0D2149]/5 flex items-center justify-center text-[#0D2149]/70 font-sans text-base sm:text-lg font-light tracking-wide select-none">
                                {member.name.split(' ').filter(Boolean).map(n => n[0]).join('')}
                              </div>
                            </div>
                          ) : (
                            <img
                              src={member.image}
                              alt={member.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04]"
                            />
                          )}
                        </div>
                        
                        {/* Card text content with hover color shifting title */}
                        <div className="p-6 sm:p-8 flex-grow flex flex-col space-y-2">
                          <h3 className="text-lg sm:text-xl font-sans font-semibold text-[#1A1A1A] leading-snug transition-colors duration-300 group-hover:text-[#0D2149]">
                            {member.name}
                          </h3>
                          <span className="text-sm sm:text-base font-sans text-gray-600 font-normal">
                            {member.title}
                          </span>
                          <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed font-sans font-light mt-2">
                            {member.bio}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

            <div className="w-full border-t border-[#1A1A1A]/10" />

            {/* FAQ SECTION */}
            <section id="faq" className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 bg-slate-50 w-full relative overflow-hidden">
              <div className="max-w-[1700px] mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                  {/* Left Column - Heading */}
                  <div className="lg:col-span-4 text-left">
                    <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-[#1A1A1A] leading-[1.12]">
                      Frequently Asked Questions
                    </h2>
                  </div>
                  
                  {/* Right Column - Accordion */}
                  <div className="lg:col-span-8 space-y-2">
                    {[
                      {
                        q: "How is this different from an LLM?",
                        a: "An LLM predicts the next word based on patterns in training data. A sapiens reasons over a structured graph of real knowledge. It doesn't guess; if it doesn't know something, it says so. Same input, same output, every time."
                      },
                      {
                        q: "Does it run in the cloud?",
                        a: "No. A sapiens runs entirely on a single edge device with no cloud, no connectivity, and no data leaving your control. That's what makes it deployable in sovereign, classified, and air-gapped environments."
                      },
                      {
                        q: "Has this actually been deployed, or is it research?",
                        a: "The architecture is proven. It traces directly to production command-and-control systems the founder’s prior companies delivered to NASA, Boeing, and the U.S. Navy, including real-time launch decisions where the system twice demonstrated capabilities beyond human operators. New Sapience is now extending that proven approach into a new generation of products, advancing through demonstration toward first deployments."
                      },
                      {
                        q: "Who is this for?",
                        a: "Operators in spacecraft, defense, nuclear, and grid environments where a wrong answer costs a mission, an asset, or a life, and where AI decisions must be explainable and auditable."
                      },
                      {
                        q: "Isn't this just what OpenAI, Anthropic, and Google are doing?",
                        a: "No. Every major lab builds probabilistic systems that predict likely outputs. We don't. A sapiens reasons over engineered knowledge and produces deterministic, auditable results. The labs are investing deeper into consumer and creative AI, not the mission-critical space we hold. We aren't a smaller version of what they build. It's a different architecture."
                      },
                      {
                        q: "Won't they just build this once they scale?",
                        a: "Scale won't get them there. Hallucination isn't a bug that more data or compute fixes, it's inherent to how probabilistic models work. Reaching determinism requires a fundamentally different architecture, a different skill set, and a different way of representing knowledge. We've spent four decades on it, and it's protected by issued patents."
                      }
                    ].map((faq, index) => {
                      const isOpen = openFaq === index;
                      return (
                        <div 
                          key={index} 
                          className="border-b border-[#1A1A1A]/10 pb-6 pt-2 transition-all duration-300"
                        >
                          <button
                            onClick={() => setOpenFaq(isOpen ? null : index)}
                            className="w-full flex items-center justify-between text-left py-4 focus:outline-none group cursor-pointer"
                          >
                            <h3 className="text-lg sm:text-xl font-sans font-semibold text-[#1A1A1A] group-hover:text-[#0a2a6e] transition-colors duration-200 pr-6">
                              {faq.q}
                            </h3>
                            <ChevronDown 
                              className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 group-hover:text-[#0a2a6e] ${
                                isOpen ? 'transform rotate-180 text-[#0a2a6e]' : ''
                              }`}
                            />
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-sans font-light pt-2 pb-2">
                                  {faq.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <div className="w-full border-t border-[#1A1A1A]/10" />

            {/* SECTION 6 - CTA BANNER */}
            <section className="py-12 sm:py-16 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 bg-white w-full relative overflow-hidden">
              <div className="w-full max-w-[1700px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2 w-full">
                  {/* Left Button */}
                  <a
                    href="mailto:comm@newsapience.com?subject=Demo Request"
                    className="group flex items-start justify-between px-6 sm:px-10 pt-6 sm:pt-8 pb-16 sm:pb-32 bg-[#e0e0e0] text-[#1c1c1f] md:hover:bg-[#d4d4d4] transition-all duration-200 ease-in-out cursor-pointer font-sans font-normal text-base sm:text-lg md:text-xl lg:text-2xl rounded-[2px]"
                  >
                    <div className="flex items-start justify-between w-full transition-transform duration-200 ease-in-out md:group-hover:scale-[0.96]">
                      <span className="text-left">Request a Demo</span>
                      <span className="ml-4 flex-shrink-0 text-xl sm:text-2xl md:text-3xl font-normal">→</span>
                    </div>
                  </a>
                  
                  {/* Right Button */}
                  <a
                    href="mailto:comm@newsapience.com?subject=Investment Inquiry"
                    className="group flex items-start justify-between px-6 sm:px-10 pt-6 sm:pt-8 pb-16 sm:pb-32 bg-[#1c1c1f] text-white md:hover:bg-[#2c2c30] transition-all duration-200 ease-in-out cursor-pointer font-sans font-normal text-base sm:text-lg md:text-xl lg:text-2xl rounded-[2px]"
                  >
                    <div className="flex items-start justify-between w-full transition-transform duration-200 ease-in-out md:group-hover:scale-[0.96]">
                      <span className="text-left">Invest</span>
                      <span className="ml-4 flex-shrink-0 text-xl sm:text-2xl md:text-3xl font-normal">→</span>
                    </div>
                  </a>
                </div>
              </div>
            </section>

          </motion.div>
        )}

      </AnimatePresence>

      {/* Shared Footer links and social */}
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />

    </div>
  );
}
