import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Send, Sparkles, CheckCircle2, Shield, Terminal, AlertTriangle, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function InteractiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'sapiens',
      text: 'Greetings. I am sapiens NLP, powered by a deterministic cognitive world model. Unlike statistical LLMs, I execute absolute logical inference with zero hallucinations. Ask me anything about our architecture or technology.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      systemTrace: {
        pathCode: 'NS-KGM-INIT-041',
        certainty: 100,
        logicalInferencePath: ['Init sapiens Node', 'Load Core Concepts graph', 'Initialize English Lexicon Matcher'],
        hallucinationSafetyIndex: 1.0
      }
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTrace, setActiveTrace] = useState<ChatMessage['systemTrace'] | null>(
    messages[0].systemTrace || null
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sampleQuestions = [
    "What is sapiens?",
    "How does sapiens prevent hallucinations?",
    "Tell me about sapiens’ Space Telescope background",
    "Where is sapiens deployed?",
    "Will sapiens write poetry about spacecraft?" // A fun boundary test to prove No Hallucinations
  ];

  const knowledgeBase: Array<{
    keywords: string[];
    response: string;
    path: string[];
    code: string;
  }> = [
    {
      keywords: ['what is sapiens', 'sapiens architecture', 'cognitive world', 'approach', 'cognitive model'],
      response: "Sapiens represent a fundamental paradigm shift from statistical neural networks to deterministic causal reasoning models. They encode human concept structures and physical laws as interconnected graphs. By doing logical inference along these strict relationships, sapiens truly understands general contexts and physical boundaries, rather than just matching token frequencies.",
      path: ['Query Parsed', 'Search Graph: [sapiens architecture]', 'Load Concept: [Determinisitic Reasoning]', 'Verify Constraints: [Truth Invariant]', 'Inference: sapiens is a Deterministic Cognitive Model'],
      code: 'NS-PATH-INF-991'
    },
    {
      keywords: ['hallucination', 'prevent hallucinations', 'probabilistic', 'zero hallucination', 'why zero'],
      response: "Stochastic LLMs guess the next word based on probability distribution. Consequently, they often synthesize plausible-sounding fiction (hallucinations). Sapiens operates as a formal world model. Either a logical pathway of constraints matches the system's factual concepts, or it does not. When sapiens does not possess a fact, it immediately states so rather than making up statistical fillers.",
      path: ['Match Search: "Hallucination"', 'Load Logical Principle: Causal Object Continuity', 'Check Certainty Constraints', 'Inference: Absolute Safety Verified'],
      code: 'NS-PATH-HAL-002'
    },
    {
      keywords: ['space telescope', 'precursors', 'battle-tested', 'hubble', 'lockheed', 'boeing', 'nasa', 'navy'],
      response: "Our technology's core logical precursors have managed critical systems for over 20 years. This includes automating spacecraft commands and high-complexity schedules for the Hubble Space Telescope, naval spacecraft command centers, Boeing space operations, and US Navy fleets. Now, sapiens upgrades this architecture with dynamic natural language processing capabilities.",
      path: ['Analyze Match: "Hubble"', 'Retrieve Fact: [Hubble Space Telescope Command Node]', 'Recall Boeing/Lockheed Space System Precursors', 'Verify History Stamp', 'Inference: High-Reliability Confirmed'],
      code: 'NS-PATH-HST-404'
    },
    {
      keywords: ['deploy', 'deployed', 'edge', 'offline', 'air-gapped', 'where does sapiens run'],
      response: "Sapiens is compiled to run completely self-contained at the edge or in air-gapped systems. It requires zero cloud databases, internet routers, or high-bandwidth server clusters. Sapiens fits onto small embedded units, ensuring aerospace crafts, classified defence networks, and remote control grids can operate 100% independently from outside networks.",
      path: ['Query Match: "Edge"', 'Load Node: [Air-Gapped Systems]', 'Check Network Dependency: [None]', 'Resolve Binary Compilation Size', 'Inference: True Edge Deployment Certified'],
      code: 'NS-PATH-EDG-228'
    },
    {
      keywords: ['poetry', 'write poetry', 'creative', 'song', 'joke'],
      response: "As a pure deterministic structure of fact models, I do not possess statistical generative weights for synthesizing creative fictional texts like poetry, songs, or hypothetical content. My knowledge base is prioritized strictly for zero-hallucination, mission-critical operations. Command operations resolved: Invariant.",
      path: ['Analyze Core Action: "Generate Poetry"', 'Check Domain Boundaries: [Operational Integrity Zone]', 'Safety Rule Triggered: Creative Text Generation Out of Bounds', 'Inference: Block generative fiction'],
      code: 'NS-PATH-Creative-Blocked'
    }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate sapiens processing delay (deterministic models parse fast!)
    setTimeout(() => {
      const queryLower = text.toLowerCase();
      let matchedKB = knowledgeBase.find((item) =>
        item.keywords.some((keyword) => queryLower.includes(keyword))
      );

      let responseText = '';
      let systemTrace: ChatMessage['systemTrace'];

      if (matchedKB) {
        responseText = matchedKB.response;
        systemTrace = {
          pathCode: matchedKB.code,
          certainty: 100,
          logicalInferencePath: matchedKB.path,
          hallucinationSafetyIndex: 1.0
        };
      } else {
        // Deterministic answer for unknown queries to demonstrate philosophy
        responseText = `Query of "${text}" matches no verified concept nodes within sapiens structural domain. As a deterministic model, I reject probability-based synthesis. Safety resolution: Denied rather than hallucinating.`;
        systemTrace = {
          pathCode: 'NS-ERR-OUT-OF-BOUNDS',
          certainty: 100,
          logicalInferencePath: [
            'Parse Input Query',
            'Cross check Knowledge Dictionary Nodes',
            'Boundary Check failed - Query is Out of Domain',
            'Rejection of Statistical Guesses',
            'Halt Synthesis to Protect Truth Integrity'
          ],
          hallucinationSafetyIndex: 1.0
        };
      }

      const sapiensMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'sapiens',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        systemTrace
      };

      setMessages((prev) => [...prev, sapiensMsg]);
      setActiveTrace(systemTrace);
      setIsTyping(false);
    }, 850);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
      
      {/* Interactive Chat Board */}
      <div className="lg:col-span-2 bg-gray-950 border border-gray-800 rounded-2xl flex flex-col h-[520px] overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Terminal Chat Header */}
        <div className="px-6 py-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="font-mono text-xs tracking-wider uppercase text-emerald-400 font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> sapiens NLP v3.2_Edge_Beta
            </h4>
          </div>
          <span className="text-[10px] font-mono text-gray-400 bg-gray-800 px-2 py-1 rounded">
            Zero Hallucinations Guarantee
          </span>
        </div>

        {/* Chat Message Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  onClick={() => msg.systemTrace && setActiveTrace(msg.systemTrace)}
                  className={`inline-block max-w-[85%] px-4 py-3 rounded-xl text-sm leading-relaxed cursor-pointer transition-all ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none hover:bg-indigo-700'
                      : 'bg-gray-900 text-gray-200 border border-gray-800 rounded-bl-none hover:border-indigo-500/30'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {msg.systemTrace && (
                    <div className="mt-2.5 pt-2 border-t border-gray-800/60 flex items-center justify-between text-[10px] font-mono text-indigo-400/80 hover:text-indigo-300">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Explainable Graph Trace
                      </span>
                      <span>{msg.systemTrace.pathCode}</span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-500 font-mono mt-1 px-1">{msg.timestamp}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="flex items-center space-x-2 bg-gray-900/40 p-3 rounded-lg border border-gray-800/40 w-fit">
              <span className="text-xs text-indigo-400 font-mono italic animate-pulse">
                sapiens parsing cognitive dictionary...
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions shortcuts */}
        <div className="px-6 py-2 bg-gray-950 border-t border-gray-900 overflow-x-auto whitespace-nowrap flex space-x-2 select-none scrollbar-none scrollbar-thin scrollbar-track-transparent">
          {sampleQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="text-[11px] font-mono bg-gray-900/80 hover:bg-indigo-950/40 border border-gray-800 hover:border-indigo-500/40 text-gray-400 hover:text-indigo-300 transition-colors py-1.5 px-3 rounded-lg flex-shrink-0 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Text Form */}
        <div className="p-4 bg-gray-900 border-t border-gray-800 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            placeholder="Interrogate client sapiens here..."
            className="flex-1 bg-gray-950 border border-gray-800 focus:border-indigo-500/60 px-4 py-2.5 rounded-lg text-sm text-white focus:outline-none font-mono"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* sapiens Complete Explainability Audit Trace Panel */}
      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Shield className="w-24 h-24 text-indigo-500" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-800 pb-3">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h4 className="font-display font-bold text-sm tracking-wide text-white">
              Deterministic Reasoning Trace
            </h4>
          </div>

          {activeTrace ? (
            <div className="space-y-4 font-mono">
              <div className="flex items-center justify-between text-xs bg-gray-900 border border-gray-800 p-2 rounded">
                <span className="text-gray-400">Trace Key:</span>
                <span className="text-indigo-400 font-bold">{activeTrace.pathCode}</span>
              </div>

              <div className="flex items-center justify-between text-xs bg-gray-900 border border-gray-800 p-2 rounded">
                <span className="text-gray-400">Logical Certainty:</span>
                <span className="text-emerald-400 font-bold">{activeTrace.certainty}%</span>
              </div>

              <div className="space-y-2 mt-2">
                <span className="text-xs text-gray-400 block pb-1 border-b border-gray-900">
                  Concept Inference Chain:
                </span>
                <div className="relative pl-4 border-l-2 border-indigo-600/30 space-y-3 py-1">
                  {activeTrace.logicalInferencePath.map((step, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={step}
                      className="text-xs relative"
                    >
                      {/* Circle bullet on timeline */}
                      <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full border border-indigo-500 bg-gray-950 z-10" />
                      <span className="text-gray-300 font-medium">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-44 flex flex-col items-center justify-center border border-dashed border-gray-800 rounded-xl p-4 text-center">
              <AlertTriangle className="w-5 h-5 text-gray-500 mb-2" />
              <p className="text-xs text-gray-500">
                Click a sapiens message explaining box to populate the logic graph trace instantly.
              </p>
            </div>
          )}
        </div>

        {/* Explainability notice */}
        <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-4 mt-6">
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400 leading-normal">
              <strong>Transparent Inference:</strong> Unlike transformer models with billions of hidden numerical matrices, our sapiens trace is 100% human-readable, auditable, and compliance-safe.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
