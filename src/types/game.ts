export type Difficulty = "easy" | "medium" | "hard";

export type PartnerCategory =
  | "Analytics & BI"
  | "CRM"
  | "Customer Engagement"
  | "Social"
  | "Research & Insights"
  | "Search Intelligence"
  | "Mobile Attribution"
  | "Exclusive African Partner";

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  logoPath: string;
  accentColor: string;
}

export interface Card {
  id: string;
  partnerId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: string[];
  matchedPairs: number;
  totalPairs: number;
  moves: number;
  isComplete: boolean;
  difficulty: Difficulty;
  consecutiveMatches: number;
  score: number;
}

export interface DifficultyConfig {
  label: string;
  pairs: number;
  gridCols: number;
  gridColsMobile: number;
  description: string;
  basePoints: number;
}

export interface ScoreRecord {
  difficulty: Difficulty;
  moves: number;
  time: number;
  date: string;
  score: number;
}
