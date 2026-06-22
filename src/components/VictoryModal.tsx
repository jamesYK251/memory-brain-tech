"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Difficulty } from "@/types/game";
import { formatTime } from "@/hooks/useTimer";
import { getStarRating } from "@/lib/scoring";
import { useEffect, useState } from "react";

interface VictoryModalProps {
  isOpen: boolean;
  score: number;
  moves: number;
  elapsedSeconds: number;
  difficulty: Difficulty;
  totalPairs: number;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
}

const CONFETTI_COLORS = [
  "#33DCA4",
  "#33C7FF",
  "#F5F700",
  "#FF7833",
  "#F666A7",
  "#C24DFE",
];

function Confetti() {
  const [pieces, setPieces] = useState<
    { id: number; x: number; color: string; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 2,
        size: 6 + Math.random() * 8,
      })),
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece absolute rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: "-20px",
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function VictoryModal({
  isOpen,
  score,
  moves,
  elapsedSeconds,
  difficulty,
  totalPairs,
  onPlayAgain,
  onChangeDifficulty,
}: VictoryModalProps) {
  const stars = getStarRating(difficulty, score);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Confetti />
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="text-4xl mb-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <span
                    key={i}
                    className={i < stars ? "" : "opacity-20 grayscale"}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-yk-royal-blue mb-1">
                Well Done!
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                You matched all {totalPairs} YOUKNOW technology partners!
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-yk-off-white rounded-xl p-3">
                  <div className="text-2xl font-bold text-yk-green">
                    {score}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Score</div>
                </div>
                <div className="bg-yk-off-white rounded-xl p-3">
                  <div className="text-2xl font-bold text-yk-royal-blue">
                    {moves}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Moves</div>
                </div>
                <div className="bg-yk-off-white rounded-xl p-3">
                  <div className="text-2xl font-bold text-yk-royal-blue">
                    {formatTime(elapsedSeconds)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Time</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onPlayAgain}
                  className="flex-1 bg-yk-green hover:bg-yk-green/90 text-yk-royal-blue font-semibold py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Play Again
                </button>
                <button
                  onClick={onChangeDifficulty}
                  className="flex-1 bg-yk-royal-blue hover:bg-yk-royal-blue/90 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Change Difficulty
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
