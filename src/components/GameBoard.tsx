"use client";

import { Card as CardType, Difficulty } from "@/types/game";
import { DIFFICULTY_CONFIGS } from "@/lib/constants";
import Card from "./Card";

interface GameBoardProps {
  cards: CardType[];
  difficulty: Difficulty;
  onFlip: (id: string) => void;
  flippedCount: number;
}

export default function GameBoard({
  cards,
  difficulty,
  onFlip,
  flippedCount,
}: GameBoardProps) {
  const config = DIFFICULTY_CONFIGS[difficulty];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <style>{`
        .game-grid {
          display: grid;
          gap: 0.75rem;
          grid-template-columns: repeat(${config.gridColsMobile}, 1fr);
        }
        @media (min-width: 640px) {
          .game-grid {
            gap: 1rem;
            grid-template-columns: repeat(${config.gridCols}, 1fr);
          }
        }
      `}</style>
      <div className="game-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onFlip={onFlip}
            disabled={flippedCount >= 2}
          />
        ))}
      </div>
    </div>
  );
}
