"use client";

import { Difficulty } from "@/types/game";
import { formatTime } from "@/hooks/useTimer";
import { DIFFICULTY_CONFIGS } from "@/lib/constants";

interface GameHeaderProps {
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  elapsedSeconds: number;
  difficulty: Difficulty;
  onNewGame: () => void;
  onChangeDifficulty: () => void;
}

export default function GameHeader({
  moves,
  matchedPairs,
  totalPairs,
  elapsedSeconds,
  difficulty,
  onNewGame,
  onChangeDifficulty,
}: GameHeaderProps) {
  return (
    <header className="bg-yk-royal-blue text-white py-3 px-4 sm:px-6 shadow-lg">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-3">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">
            <span className="text-yk-green">Do</span> YOUKNOW?
          </h1>
          <span className="hidden sm:inline text-xs bg-yk-green/20 text-yk-green px-2 py-0.5 rounded-full font-medium">
            {DIFFICULTY_CONFIGS[difficulty].label}
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-sm">
          <div className="text-center">
            <div className="text-yk-green font-mono text-lg font-bold">
              {formatTime(elapsedSeconds)}
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              Time
            </div>
          </div>
          <div className="text-center">
            <div className="text-white font-mono text-lg font-bold">
              {moves}
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              Moves
            </div>
          </div>
          <div className="text-center">
            <div className="text-white font-mono text-lg font-bold">
              {matchedPairs}/{totalPairs}
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              Pairs
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onNewGame}
            className="text-xs bg-yk-green/20 hover:bg-yk-green/30 text-yk-green px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
          >
            New Game
          </button>
          <button
            onClick={onChangeDifficulty}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Difficulty
          </button>
        </div>
      </div>
    </header>
  );
}
