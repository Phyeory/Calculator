// TypeScript interfaces for data models

export interface Calculator {
  slug: string;
  brand: string;
  model: string;
  image: string;
  alt_text?: string;
  type: 'scientific' | 'graphing' | 'basic' | 'financial';
  features: {
    graphing: boolean;
    programmable: boolean;
    symbolic: boolean;
    examMode: boolean;
    cas?: boolean;
  };
  notes: string;
  related_models?: string[];
  amazon_link?: string;
}

export interface ConditionalRule {
  model: string;
  condition: string;
}

export interface Exam {
  slug: string;
  name: string;
  regions: string[];
  boards?: string[];
  last_updated: string;
  notes: string;
  allowed: string[];
  conditional?: ConditionalRule[];
  banned: string[];
  official_links?: {
    title: string;
    url: string;
  }[];
}

export interface SearchResult {
  type: 'exam' | 'calculator';
  slug: string;
  name: string;
  description?: string;
}
