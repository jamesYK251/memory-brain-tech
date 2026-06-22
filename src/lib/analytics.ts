import * as amplitude from "@amplitude/analytics-browser";
import { Difficulty } from "@/types/game";

let initialized = false;

export function initAnalytics() {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  if (!apiKey) {
    console.warn("Amplitude API key not set — analytics disabled");
    return;
  }

  amplitude.init(apiKey, {
    defaultTracking: {
      pageViews: true,
      sessions: true,
    },
  });
  initialized = true;
}

function track(event: string, properties?: Record<string, unknown>) {
  if (!initialized) return;
  amplitude.track(event, properties);
}

export function trackDifficultySelected(difficulty: Difficulty) {
  track("Difficulty Selected", { difficulty });
}

export function trackGameStarted(difficulty: Difficulty, totalPairs: number) {
  track("Game Started", { difficulty, total_pairs: totalPairs });
}

export function trackMatchFound(
  difficulty: Difficulty,
  matchedPairs: number,
  totalPairs: number,
  moves: number,
  consecutiveMatches: number,
) {
  track("Match Found", {
    difficulty,
    matched_pairs: matchedPairs,
    total_pairs: totalPairs,
    moves,
    consecutive_matches: consecutiveMatches,
  });
}

export function trackGameCompleted(
  difficulty: Difficulty,
  moves: number,
  timeSeconds: number,
  score: number,
  starRating: 1 | 2 | 3,
  maxConsecutiveMatches: number,
  totalPairs: number,
) {
  track("Game Completed", {
    difficulty,
    moves,
    time_seconds: timeSeconds,
    score,
    star_rating: starRating,
    max_consecutive_matches: maxConsecutiveMatches,
    total_pairs: totalPairs,
    moves_per_pair: Math.round((moves / totalPairs) * 100) / 100,
    seconds_per_pair: Math.round((timeSeconds / totalPairs) * 100) / 100,
  });
}

export function trackNewGame(difficulty: Difficulty) {
  track("New Game", { difficulty });
}

export function trackChangeDifficulty(fromDifficulty: Difficulty) {
  track("Change Difficulty", { from_difficulty: fromDifficulty });
}
