"use client";

import { Difficulty } from "@/types/game";
import { DIFFICULTY_CONFIGS } from "@/lib/constants";

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void;
  current?: Difficulty;
}

const difficultyIcons: Record<Difficulty, string> = {
  easy: "🧩",
  medium: "🔥",
  hard: "🧠",
};

export default function DifficultySelector({
  onSelect,
  current,
}: DifficultySelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
      {(Object.entries(DIFFICULTY_CONFIGS) as [Difficulty, (typeof DIFFICULTY_CONFIGS)[Difficulty]][]).map(
        ([key, config]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`group relative p-6 rounded-2xl border-2 transition-all cursor-pointer ${
              current === key
                ? "border-yk-green bg-yk-green/10 shadow-lg"
                : "border-yk-grey/50 bg-white hover:border-yk-green/50 hover:shadow-md"
            }`}
          >
            <div className="text-3xl mb-3">{difficultyIcons[key]}</div>
            <div className="text-lg font-bold text-yk-royal-blue">
              {config.label}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {config.description}
            </div>
            <div className="text-xs text-yk-green font-medium mt-2">
              {config.pairs * 2} cards
            </div>
          </button>
        ),
      )}
    </div>
  );
}
