import React, { useState, useEffect } from 'react';
import { IndustryType, IndustryConfig, SimulationMetric } from '../types';
import { AlertTriangle, Play, CheckCircle2, RefreshCw, Cpu, Gauge, Zap, Database, Hourglass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ControlSimulator() {
  const [activeIndustry, setActiveIndustry] = useState<IndustryType>('aerospace');
  const [isSimulatingEvent, setIsSimulatingEvent] = useState(false);
  const [resolutionStep, setResolutionStep] = useState(-1);
  const [metrics, setMetrics] = useState<SimulationMetric[]>([]);

  const industryConfigs: Record<IndustryType, IndustryConfig> = {
    aerospace: {
      id: 'aerospace',
      name: 'Aerospace & Spacecraft',
      description: 'Autonomous attitude tracking, command scheduling, and microthruster alignment for low-orbit satellites and deep space vehicles.',
      anomalyTitle: 'Thruster Logic Conflict (Hubble Target Drift)',
      anomalyDescription: 'Attitude control unit commands pivot yaw angle. Telemetry system registers conflicting thruster firing states, resulting in a physical state model contradiction.',
      resolutionPath: [
        'Read physical state vector: [Sat_Orbit_Pitch: 12.4°, Yaw: 44.1°]',
        'Detect contradiction: Sensor registers pressure surge but magnetic valve registers CLOSED.',
        'Apply causal rule: "Valve cannot pass throughput while closed." - Isolate faulty valve sensor.',
        'Bypass sensor state to backup mechanical telemetry loop.',
        'Re-verify attitude alignment: Goal state reached of 100% certainty. Telemetry locks.'
      ],
      metrics: [
        { name: 'Orbit Altitude', value: 720, status: 'normal', unit: 'km' },
        { name: 'Battery Temperature', value: 34, status: 'normal', unit: '°C' },
        { name: 'Attitude Yaw Offset', value: 12.4, status: 'normal', unit: '°' },
        { name: 'Reactor Control Flow', value: 100, status: 'normal', unit: '%' }
      ]
    },
    nuclear: {
      id: 'nuclear',
      name: 'Nuclear Reactor Cooling',
      description: 'Continuous thermal status validation, safety control rod deployments, and heat exchange logic controls.',
      anomalyTitle: 'Cooling Sensor Disagreement Cascade',
      anomalyDescription: 'Primary inlet temperature sensor reports 610°C, while secondary flow sensor reports 210 L/s (impossible physical pairing under operational load).',
      resolutionPath: [
        'Scan core physical network variables: [P_Core: 15.2 MPa, T_Coolant: 580°C]',
        'Detect conflict: "Temperature cannot climb with maximum flow under reactor bypass state."',
        'Identify root failure: Sensor #4 is stuck due to thermal sensor fatigue.',
        'Disregard Sensor #4; run fallback calculation using heat-to-steam conversion logic constraints.',
        'Restore normal core cooling state automatically. Reactor threat neutralized.'
      ],
      metrics: [
        { name: 'Core Temperature', value: 580, status: 'normal', unit: '°C' },
        { name: 'Coolant Flow Rate', value: 950, status: 'normal', unit: 'L/s' },
        { name: 'Vessel Pressure', value: 15.2, status: 'normal', unit: 'MPa' },
        { name: 'Control Rod Insertion', value: 24, status: 'normal', unit: '%' }
      ]
    },
    grid: {
      id: 'grid',
      name: 'Smart Electrical Power Grid',
      description: 'Optimizing substation load allocations, protecting transformers from transient phase imbalances, and preventing cascading blackouts.',
      anomalyTitle: 'Cascading Substation Phase Misalignment',
      anomalyDescription: 'Generator feedback signals a sudden 3.1° phase shift across substations, causing a risk of load generator trip-outs.',
      resolutionPath: [
        'Register system state matrix: [Frequency: 60.01Hz, Base_Load: 8.4GW]',
        'Identify phase contradiction within 1.2 milliseconds at primary transformer hub.',
        'Compute circuit safety bounds based on Kirchhoff\'s mesh laws.',
        'Isolate substation grid sector #5 and redistribute load evenly to auxiliary storage nodes.',
        'Synch loop restored: Phase margin normalized under safety load limits.'
      ],
      metrics: [
        { name: 'System Frequency', value: 60.01, status: 'normal', unit: 'Hz' },
        { name: 'Continuous Base Load', value: 8.4, status: 'normal', unit: 'GW' },
        { name: 'Transformer Impedance', value: 99.8, status: 'normal', unit: '%' },
        { name: 'Grid Phase Alignment', value: 3.1, status: 'normal', unit: '°' }
      ]
    },
    healthcare: {
      id: 'healthcare',
      name: 'Automated Hospital Life Support',
      description: 'Continuous validation of infusion delivery metrics, oxygenators, and safety alarms in emergency intensive care.',
      anomalyTitle: 'Infusion Pump Rate Incongruence',
      anomalyDescription: 'Patient vital signs drop while infusion telemetry reports regular medicine dosage delivery. Causal mismatch detected.',
      resolutionPath: [
        'Query patient vitals: [O2_Sat: 98%, HR: 72 bpm]',
        'Detect physical pump output divergence. Telemetry line reports dose delivery but fluid chamber weights hold steady.',
        'Locate discrepancy: Mechanical lock valve is physically jammed on pump #2.',
        'Sound immediate hardware alert bypass and activate vital auxiliary oxygenators.',
        'Safe-state achieved: Backups stabilized. Telemetry confirmed.'
      ],
      metrics: [
        { name: 'Oxygen Saturation', value: 98, status: 'normal', unit: '%' },
        { name: 'Heart Rate Balance', value: 72, status: 'normal', unit: 'bpm' },
        { name: 'Syringe Infusion Vol', value: 22, status: 'normal', unit: 'ml/hr' },
        { name: 'System Alarm State', value: 0, status: 'normal', unit: 'act' }
      ]
    },
    finance: {
      id: 'finance',
      name: 'Financial Settlement Ledger',
      description: 'Continuous audit verification against fraud, validating cross-border atomic settlement pools, and guaranteeing transaction invariance.',
      anomalyTitle: 'Settlement Double-Balance Discrepancy',
      anomalyDescription: 'Cross-border payment logs ledger flow with double transaction values, raising potential ledger breach.',
      resolutionPath: [
        'Audit transaction queue of 4200 tx/s. Pool balance: $14.2M.',
        'Locate account ledger imbalance: Account #819 logs ledger credits with no corresponding debit nodes.',
        'Apply double-entry constraint rules. Identify missing physical debit ledger branch.',
        'Immediately freeze pool #819 and reverse invalid accounting credits.',
        'Final check complete: Ledger invariance 100% verified. Clear audits.'
      ],
      metrics: [
        { name: 'Transaction Speed', value: 4200, status: 'normal', unit: 'tx/s' },
        { name: 'Settlement Pool Capital', value: 14.2, status: 'normal', unit: 'M$' },
        { name: 'Base Rate Divergence', value: 0.01, status: 'normal', unit: '%' },
        { name: 'Audit Security Invariance', value: 100, status: 'normal', unit: '%' }
      ]
    }
  };

  useEffect(() => {
    // Reset simulation states when changing industries
    setIsSimulatingEvent(false);
    setResolutionStep(-1);
    setMetrics([...industryConfigs[activeIndustry].metrics]);
  }, [activeIndustry]);

  const handleTriggerAnomaly = () => {
    setIsSimulatingEvent(true);
    setResolutionStep(-1);

    // Modify active metrics to reflect an anomaly/failure state
    setMetrics((prev) =>
      prev.map((metric, idx) => {
        if (idx === 1) return { ...metric, value: metric.value * 1.5, status: 'warning' };
        if (idx === 2) return { ...metric, value: metric.value * 2.1, status: 'critical' };
        return metric;
      })
    );
  };

  const handleDeploySapiens = () => {
    // Stage through steps of Sapiens finding the causal problem
    let step = 0;
    const interval = setInterval(() => {
      setResolutionStep(step);
      if (step === industryConfigs[activeIndustry].resolutionPath.length - 1) {
        clearInterval(interval);
        // Normalize metrics back to normal
        setMetrics([...industryConfigs[activeIndustry].metrics]);
      }
      step++;
    }, 1200);
  };

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-3xl p-6 lg:p-10 shadow-3xl text-gray-300 relative overflow-hidden">
      
      {/* Decorative top grid effect */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      
      {/* Selector Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-8 border-b border-gray-900 justify-start">
        {(Object.keys(industryConfigs) as IndustryType[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveIndustry(key)}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium tracking-wide transition-all border cursor-pointer ${
              activeIndustry === key
                ? 'bg-indigo-600/10 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/5'
                : 'bg-gray-900/60 border-gray-800/80 text-gray-400 hover:text-white hover:border-gray-700'
            }`}
          >
            {industryConfigs[key].name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pt-8">
        
        {/* Industry Description and Action Controllers */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-400 font-semibold bg-indigo-950/40 px-2.5 py-1 rounded">
              Sapiens Mission Command
            </span>
            <h3 className="text-2xl font-display font-bold text-white mt-3 text-left">
              {industryConfigs[activeIndustry].name}
            </h3>
            <p className="text-sm text-gray-400 mt-2.5 leading-relaxed text-left">
              {industryConfigs[activeIndustry].description}
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-800/60 text-left">
            <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-2">Simulate Operations</h4>
            <p className="text-xs text-gray-500 leading-normal mb-4">
              Trigger a physical hardware sensor contradiction to see how Sapiens overrides false readings by reasoning causally, not guessing.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                disabled={isSimulatingEvent}
                onClick={handleTriggerAnomaly}
                className={`py-2 px-4 rounded-lg font-mono text-xs flex items-center gap-2 border transition-colors cursor-pointer ${
                  isSimulatingEvent
                    ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-600/10 hover:bg-amber-600/20 border-amber-500/30 hover:border-amber-500 text-amber-400'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" /> Inject Telemetry Mismatch
              </button>

              {isSimulatingEvent && resolutionStep === -1 && (
                <button
                  onClick={handleDeploySapiens}
                  className="py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5 animate-pulse" /> Deploy Sapiens Safety Loop
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Live Status Monitor & Telemetry Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-gray-950 border border-gray-900 rounded-2xl p-5 flex flex-col justify-between font-mono relative overflow-hidden">
            
            {/* Dynamic Status Badges */}
            <div className="flex items-center justify-between border-b border-gray-900 pb-4 mb-4">
              <span className="text-[10px] uppercase text-gray-400 font-bold flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5" /> Active Live Grid Telemetry
              </span>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                isSimulatingEvent && resolutionStep < industryConfigs[activeIndustry].resolutionPath.length - 1
                  ? 'bg-rose-950/50 border border-rose-500/30 text-rose-400 animate-pulse'
                  : 'bg-emerald-950/50 border border-emerald-500/30 text-emerald-400'
              }`}>
                {isSimulatingEvent && resolutionStep < industryConfigs[activeIndustry].resolutionPath.length - 1 ? 'Contradiction Flagged' : 'Operational Norm'}
              </span>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <div key={metric.name} className="bg-gray-900 border border-gray-800/80 rounded-xl p-3.5 text-left relative overflow-hidden">
                  <span className="text-[10px] text-gray-500 block uppercase tracking-wider">{metric.name}</span>
                  <div className="flex items-baseline gap-1 mt-1.5">
                    <span className={`text-xl font-bold font-mono tracking-tight transition-colors ${
                      metric.status === 'critical' ? 'text-rose-400' : metric.status === 'warning' ? 'text-amber-400' : 'text-white'
                    }`}>
                      {metric.value}
                    </span>
                    <span className="text-xs text-gray-400">{metric.unit}</span>
                  </div>
                  {metric.status !== 'normal' && (
                    <div className="absolute top-2 right-2 flex scale-90">
                      <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute" />
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Anomaly description section */}
            <AnimatePresence>
              {isSimulatingEvent && resolutionStep === -1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5 mt-4 text-left space-y-1.5"
                >
                  <p className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> {industryConfigs[activeIndustry].anomalyTitle}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-normal">
                    {industryConfigs[activeIndustry].anomalyDescription}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sapiens Resolution Progress trace timeline */}
            <AnimatePresence>
              {resolutionStep >= 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-900 border border-indigo-500/20 rounded-xl p-4 mt-4 text-left"
                >
                  <p className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 mb-3">
                    <Cpu className="w-4 h-4 animate-spin" /> Resolving Contradiction via Sapiens Causal Inference Loop
                  </p>
                  
                  <div className="space-y-2 border-l-2 border-indigo-500/20 pl-4 py-1">
                    {industryConfigs[activeIndustry].resolutionPath.map((step, idx) => {
                      const isCompleted = resolutionStep >= idx;
                      const isCurrent = resolutionStep === idx;
                      
                      return (
                        <div
                          key={step}
                          className={`text-[11px] transition-colors duration-300 relative ${
                            isCompleted ? 'text-gray-200' : 'text-gray-600'
                          } ${isCurrent ? 'text-indigo-300 font-bold' : ''}`}
                        >
                          <span className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                            isCompleted ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400' : 'border-gray-800 bg-gray-900'
                          }`}>
                            {isCompleted && <span className="w-1 h-1 bg-emerald-400 rounded-full" />}
                          </span>
                          <span>{step}</span>
                        </div>
                      );
                    })}
                  </div>

                  {resolutionStep === industryConfigs[activeIndustry].resolutionPath.length - 1 && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-4 pt-3.5 border-t border-emerald-500/20 flex gap-2 items-center text-xs text-emerald-400"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Physical system state model restored. Anomaly safely contained. Control loop returning to standard frequency monitoring.</span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>

    </div>
  );
}
