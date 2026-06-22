"use client";

import { useState, useCallback, useRef } from "react";
import { Card, Difficulty, GameState } from "@/types/game";
import { createDeck } from "@/lib/cards";
import { FLIP_DELAY_MS } from "@/lib/constants";

const initialState = (difficulty: Difficulty): GameState => {
  const cards = createDeck(difficulty);
  return {
    cards,
    flippedCards: [],
    matchedPairs: 0,
    totalPairs: cards.length / 2,
    moves: 0,
    isComplete: false,
    difficulty,
    consecutiveMatches: 0,
    score: 0,
  };
};

export function useGameState(difficulty: Difficulty) {
  const [state, setState] = useState<GameState>(() => initialState(difficulty));
  const lockRef = useRef(false);
  const maxConsecutiveRef = useRef(0);

  const flipCard = useCallback((cardId: string) => {
    if (lockRef.current) return;

    setState((prev) => {
      const card = prev.cards.find((c) => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched) return prev;
      if (prev.flippedCards.length >= 2) return prev;

      const newCards = prev.cards.map((c) =>
        c.id === cardId ? { ...c, isFlipped: true } : c,
      );
      const newFlipped = [...prev.flippedCards, cardId];

      if (newFlipped.length === 2) {
        lockRef.current = true;
        const [firstId, secondId] = newFlipped;
        const first = newCards.find((c) => c.id === firstId)!;
        const second = newCards.find((c) => c.id === secondId)!;
        const isMatch = first.partnerId === second.partnerId;

        if (isMatch) {
          const matched = newCards.map((c) =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c,
          );
          const newMatchedPairs = prev.matchedPairs + 1;
          const newConsecutive = prev.consecutiveMatches + 1;
          if (newConsecutive > maxConsecutiveRef.current) {
            maxConsecutiveRef.current = newConsecutive;
          }
          const isComplete = newMatchedPairs === prev.totalPairs;

          lockRef.current = false;
          return {
            ...prev,
            cards: matched,
            flippedCards: [],
            matchedPairs: newMatchedPairs,
            moves: prev.moves + 1,
            isComplete,
            consecutiveMatches: newConsecutive,
          };
        }

        setTimeout(() => {
          setState((s) => ({
            ...s,
            cards: s.cards.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c,
            ),
            flippedCards: [],
          }));
          lockRef.current = false;
        }, FLIP_DELAY_MS);

        return {
          ...prev,
          cards: newCards,
          flippedCards: newFlipped,
          moves: prev.moves + 1,
          consecutiveMatches: 0,
        };
      }

      return { ...prev, cards: newCards, flippedCards: newFlipped };
    });
  }, []);

  const resetGame = useCallback(
    (newDifficulty?: Difficulty) => {
      lockRef.current = false;
      maxConsecutiveRef.current = 0;
      setState(initialState(newDifficulty ?? state.difficulty));
    },
    [state.difficulty],
  );

  return {
    ...state,
    maxConsecutiveMatches: maxConsecutiveRef.current,
    flipCard,
    resetGame,
  };
}
