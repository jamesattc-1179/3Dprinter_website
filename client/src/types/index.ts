export interface Material {
  id: string;
  name: string;
  category: string;
  features: string[];
  description: string;
  pros: string[];
  cons: string[];
  applications: string[];
  tips?: string[];
  image?: string;
}

export interface AnalysisResult {
  strengthPriority: AnalysisScheme;
  costEffective: AnalysisScheme;
  temporary: AnalysisScheme;
}

export interface AnalysisScheme {
  title: string;
  material: string;
  description: string;
  settings: {
    infill: string;
    walls: string;
    layerHeight: string;
  };
  pros: string[];
}
