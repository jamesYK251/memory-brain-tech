import { DifficultyConfig, Difficulty } from "@/types/game";

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    label: "Easy",
    pairs: 6,
    gridCols: 4,
    gridColsMobile: 3,
    description: "6 pairs - Perfect for beginners",
    basePoints: 1000,
  },
  medium: {
    label: "Medium",
    pairs: 10,
    gridCols: 5,
    gridColsMobile: 4,
    description: "10 pairs - A solid challenge",
    basePoints: 2000,
  },
  hard: {
    label: "Hard",
    pairs: 15,
    gridCols: 6,
    gridColsMobile: 4,
    description: "15 pairs - All partners, full test",
    basePoints: 3000,
  },
};

export const FLIP_DELAY_MS = 1000;
export const MATCH_STREAK_BONUS = 50;
export const MOVE_PENALTY = 10;
export const TIME_PENALTY = 2;
