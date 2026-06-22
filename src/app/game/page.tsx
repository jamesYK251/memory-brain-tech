"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Difficulty } from "@/types/game";
import { useGameState } from "@/hooks/useGameState";
import { useTimer } from "@/hooks/useTimer";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { calculateScore, getStarRating } from "@/lib/scoring";
import {
  trackMatchFound,
  trackGameCompleted,
  trackNewGame,
  trackChangeDifficulty,
} from "@/lib/analytics";
import { ScoreRecord } from "@/types/game";
import GameBoard from "@/components/GameBoard";
import GameHeader from "@/components/GameHeader";
import VictoryModal from "@/components/VictoryModal";
import ContourBackground from "@/components/ContourBackground";

function GameContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const difficulty = (searchParams.get("difficulty") as Difficulty) || "medium";

  const game = useGameState(difficulty);
  const timer = useTimer();
  const [bestScores, setBestScores] = useLocalStorage<ScoreRecord[]>(
    "do-youknow-scores",
    [],
  );
  const [finalScore, setFinalScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const prevMatchedPairs = useRef(0);

  const handleFlip = useCallback(
    (cardId: string) => {
      if (!hasStarted) {
        setHasStarted(true);
        timer.start();
      }
      game.flipCard(cardId);
    },
    [game, timer, hasStarted],
  );

  useEffect(() => {
    if (game.matchedPairs > prevMatchedPairs.current) {
      trackMatchFound(
        difficulty,
        game.matchedPairs,
        game.totalPairs,
        game.moves,
        game.consecutiveMatches,
      );
    }
    prevMatchedPairs.current = game.matchedPairs;
  }, [game.matchedPairs]);

  useEffect(() => {
    if (game.isComplete && hasStarted) {
      timer.stop();
      const score = calculateScore(
        difficulty,
        game.moves,
        timer.elapsedSeconds,
        game.maxConsecutiveMatches,
      );
      setFinalScore(score);
      trackGameCompleted(
        difficulty,
        game.moves,
        timer.elapsedSeconds,
        score,
        getStarRating(difficulty, score),
        game.maxConsecutiveMatches,
        game.totalPairs,
      );

      const record: ScoreRecord = {
        difficulty,
        moves: game.moves,
        time: timer.elapsedSeconds,
        date: new Date().toISOString(),
        score,
      };
      setBestScores((prev) => [...prev, record].slice(-50));
    }
  }, [game.isComplete]);

  const handleNewGame = useCallback(() => {
    trackNewGame(difficulty);
    game.resetGame();
    timer.reset();
    setHasStarted(false);
    setFinalScore(0);
    prevMatchedPairs.current = 0;
  }, [game, timer, difficulty]);

  const handleChangeDifficulty = useCallback(() => {
    trackChangeDifficulty(difficulty);
    router.push("/");
  }, [router, difficulty]);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <ContourBackground />

      <GameHeader
        moves={game.moves}
        matchedPairs={game.matchedPairs}
        totalPairs={game.totalPairs}
        elapsedSeconds={timer.elapsedSeconds}
        difficulty={difficulty}
        onNewGame={handleNewGame}
        onChangeDifficulty={handleChangeDifficulty}
      />

      <div className="flex-1 flex items-start justify-center pt-4">
        <GameBoard
          cards={game.cards}
          difficulty={difficulty}
          onFlip={handleFlip}
          flippedCount={game.flippedCards.length}
        />
      </div>

      <VictoryModal
        isOpen={game.isComplete}
        score={finalScore}
        moves={game.moves}
        elapsedSeconds={timer.elapsedSeconds}
        difficulty={difficulty}
        totalPairs={game.totalPairs}
        onPlayAgain={handleNewGame}
        onChangeDifficulty={handleChangeDifficulty}
      />
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center">
          <div className="text-yk-royal-blue text-lg font-medium">
            Loading game...
          </div>
        </div>
      }
    >
      <GameContent />
    </Suspense>
  );
}
