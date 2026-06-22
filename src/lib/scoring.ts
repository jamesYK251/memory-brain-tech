import { Difficulty } from "@/types/game";
import {
  DIFFICULTY_CONFIGS,
  MATCH_STREAK_BONUS,
  MOVE_PENALTY,
  TIME_PENALTY,
} from "./constants";

export function calculateScore(
  difficulty: Difficulty,
  moves: number,
  elapsedSeconds: number,
  consecutiveMatches: number,
): number {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const excessMoves = Math.max(0, moves - config.pairs);
  const streakBonus = consecutiveMatches * MATCH_STREAK_BONUS;

  const score =
    config.basePoints -
    excessMoves * MOVE_PENALTY -
    elapsedSeconds * TIME_PENALTY +
    streakBonus;

  return Math.max(0, Math.round(score));
}

export function getStarRating(
  difficulty: Difficulty,
  score: number,
): 1 | 2 | 3 {
  const base = DIFFICULTY_CONFIGS[difficulty].basePoints;
  if (score >= base * 0.8) return 3;
  if (score >= base * 0.5) return 2;
  return 1;
}
