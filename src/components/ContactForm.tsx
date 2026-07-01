import React, { useState } from 'react';
import { Mail, Landmark, Compass, ShieldCheck, Cpu, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageType } from '../types';

interface ContactFormProps {
  setCurrentPage: (page: PageType) => void;
}

export default function ContactForm({ setCurrentPage }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    sector: 'aerospace',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingStep, setSubmittingStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmittingStep(0);

    // Simulate cognitive security encryption logging steps typical of New Sapience high-trust feel!
    const interval = setInterval(() => {
      setSubmittingStep((prev) => {
        if (prev >= 2) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
          }, 800);
          return 3;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const steps = [
    'Verifying source connection variables...',
    'Performing deterministic security hash verification...',
    'Encrypting parameters via air-gapped secure pipeline...',
    'Inquiry successfully logged in sapiens database.'
  ];

  const industries = [
    { id: 'aerospace', name: 'Aerospace & Satellites', icon: Compass },
    { id: 'nuclear', name: 'Nuclear Energy Safety', icon: ShieldCheck },
    { id: 'grid', name: 'Smart Power Grid', icon: Cpu },
    { id: 'healthcare', name: 'Life Support Systems', icon: Mail },
    { id: 'finance', name: 'Financial Invariance Pool', icon: Landmark }
  ];

  return (
    <div className="pt-32 pb-24 bg-white text-[#1A1A1A] relative min-h-[85vh]">
      
      {/* Removed radial backgrounds for clean look */}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-[60px] font-sans font-medium text-[#1A1A1A] tracking-tight leading-none mt-4 text-center">
            Get in Touch
          </h1>
          <p className="text-lg text-[#333] mt-6 max-w-2xl mx-auto leading-relaxed text-center font-sans font-normal">
            Ready to secure your operations with deterministic causal reasoning? Let's discuss how sapiens can safeguard your infrastructure.
          </p>
        </div>

        <div className="bg-white border border-[#1A1A1A]/10 rounded-2xl p-6 sm:p-12 shadow-sm text-left relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isSubmitting && !isSubmitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#666] block">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Director Elizabeth Vance"
                      className="w-full bg-gray-50 border border-[#1A1A1A]/20 focus:border-[#1A1A1A] p-3 rounded-none text-base text-[#1A1A1A] focus:outline-none font-sans transition-colors placeholder-[#999]"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#666] block">
                      Corporate/Security Email
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. e.vance@agency.gov"
                      className="w-full bg-gray-50 border border-[#1A1A1A]/20 focus:border-[#1A1A1A] p-3 rounded-none text-base text-[#1A1A1A] focus:outline-none font-sans transition-colors placeholder-[#999]"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Company field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#666] block">
                      Organization / Agency
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Aerospace Operations Command"
                      className="w-full bg-gray-50 border border-[#1A1A1A]/20 focus:border-[#1A1A1A] p-3 rounded-none text-base text-[#1A1A1A] focus:outline-none font-sans transition-colors placeholder-[#999]"
                    />
                  </div>

                  {/* Critical Sector Dropdown */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#666] block">
                      Applicable Critical Sector
                    </label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full bg-gray-50 border border-[#1A1A1A]/20 focus:border-[#1A1A1A] p-3 rounded-none text-base text-[#1A1A1A] focus:outline-none font-sans font-normal transition-colors"
                    >
                      {industries.map((ind) => (
                        <option key={ind.id} value={ind.id} className="bg-white font-sans text-[#1A1A1A]">
                          {ind.name}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Message text area */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#666] block">
                    Operational Requirements / Inquiry Detail
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly state your safety thresholds, edge parameters, or system goals..."
                    className="w-full bg-gray-50 border border-[#1A1A1A]/20 focus:border-[#1A1A1A] p-3 rounded-none text-base text-[#1A1A1A] focus:outline-none font-sans transition-colors resize-y leading-relaxed placeholder-[#999]"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-[#1A1A1A] hover:bg-black text-white rounded-md text-base font-medium flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    Submit Inquiry
                  </button>
                </div>

              </motion.form>
            ) : isSubmitting ? (
              <motion.div
                key="submitting-animation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center flex flex-col items-center justify-center font-mono"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-600/20 border-t-indigo-500 animate-spin" />
                  <Cpu className="w-6 h-6 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                
                <h3 className="text-sm font-bold text-[#1A1A1A] tracking-widest uppercase mb-4">
                  sapiens trust convertor active
                </h3>

                <div className="space-y-2 w-full max-w-md">
                  {steps.map((st, idx) => {
                    const isActive = submittingStep === idx;
                    const isCompleted = submittingStep > idx;
                    return (
                      <div
                        key={st}
                        className={`text-sm flex items-center justify-between p-3 rounded-none border transition-all duration-300 ${
                          isActive
                            ? 'bg-gray-100 border-[#1A1A1A]/20 text-[#1A1A1A]'
                            : isCompleted
                            ? 'bg-transparent border-transparent text-[#666]'
                            : 'bg-transparent border-transparent text-[#999]'
                        }`}
                      >
                        <span>{st}</span>
                        {isCompleted && <span className="text-[#1A1A1A] font-bold">OK</span>}
                        {isActive && <span className="animate-pulse text-[#1A1A1A]">...</span>}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="submission-success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-12 sm:py-20 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 border border-[#1A1A1A]/10 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-[#1A1A1A]" />
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-sans font-medium text-[#1A1A1A] tracking-tight">
                  Inquiry Authenticated
                </h2>
                
                <p className="text-base text-[#333] mt-6 max-w-md leading-relaxed mx-auto font-sans font-normal">
                  Thank you, <strong>{formData.name}</strong>. Your message is safely logged. A New Sapience team member will reach out via <strong>{formData.email}</strong> shortly.
                </p>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-8 py-3 bg-transparent border border-[#1A1A1A] text-[#1A1A1A] hover:bg-gray-100 rounded-none text-sm font-sans font-medium cursor-pointer transition-colors"
                >
                  Log Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
