export type PageType = 'home' | 'contact' | 'disclaimer' | 'privacy';

export type PillarType = 'models' | 'deterministic' | 'explainability' | 'edge';

export type IndustryType = 'aerospace' | 'nuclear' | 'healthcare' | 'finance' | 'grid';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'sapiens';
  text: string;
  timestamp: string;
  systemTrace?: {
    pathCode: string;
    certainty: number;
    logicalInferencePath: string[];
    hallucinationSafetyIndex: number;
  };
}

export interface SimulationMetric {
  name: string;
  value: number;
  status: 'normal' | 'warning' | 'critical';
  unit: string;
}

export interface IndustryConfig {
  id: IndustryType;
  name: string;
  description: string;
  anomalyTitle: string;
  anomalyDescription: string;
  resolutionPath: string[];
  metrics: SimulationMetric[];
}
