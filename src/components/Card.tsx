"use client";

import { motion } from "framer-motion";
import { Card as CardType } from "@/types/game";
import { getPartnerById } from "@/lib/cards";
import Image from "next/image";
import { useState } from "react";

interface CardProps {
  card: CardType;
  onFlip: (id: string) => void;
  disabled: boolean;
}

export default function Card({ card, onFlip, disabled }: CardProps) {
  const partner = getPartnerById(card.partnerId);
  const isRevealed = card.isFlipped || card.isMatched;
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={() => !disabled && !isRevealed && onFlip(card.id)}
      className="perspective-1000 w-full aspect-[3/4] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-yk-green focus-visible:ring-offset-2 rounded-xl"
      aria-label={
        isRevealed ? `${partner?.name} - revealed` : "Hidden card - click to flip"
      }
      disabled={disabled && !isRevealed}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Back face (face-down) */}
        <div className="absolute inset-0 backface-hidden rounded-xl bg-yk-royal-blue border-2 border-yk-green/30 flex items-center justify-center overflow-hidden shadow-lg hover:border-yk-green/60 transition-colors">
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" stroke="#33DCA4" strokeWidth="0.5">
                <circle cx="50" cy="50" r="40" />
                <circle cx="50" cy="50" r="30" />
                <circle cx="50" cy="50" r="20" />
                <circle cx="50" cy="50" r="10" />
              </g>
            </svg>
          </div>
          <div className="text-center z-10">
            <div className="text-3xl font-bold text-yk-green">?</div>
            <div className="text-[10px] text-yk-green/60 mt-1 font-medium tracking-wider uppercase">
              YOUKNOW
            </div>
          </div>
        </div>

        {/* Front face (face-up) */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-white flex flex-col items-center justify-center p-3 shadow-lg border-2 transition-all ${
            card.isMatched
              ? "matched-glow border-yk-green"
              : "border-gray-200"
          }`}
          style={
            card.isMatched
              ? { borderColor: partner?.accentColor }
              : undefined
          }
        >
          {partner && (
            <>
              <div className="flex-1 flex items-center justify-center w-full p-2">
                {!imgError ? (
                  <Image
                    src={partner.logoPath}
                    alt={partner.name}
                    width={120}
                    height={80}
                    className="max-w-[80%] max-h-[70%] w-auto h-auto object-contain"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: partner.accentColor }}
                  >
                    {partner.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="text-xs font-semibold text-yk-royal-blue text-center truncate w-full mt-1">
                {partner.name}
              </div>
              <div className="text-[9px] text-gray-400 font-medium">
                {partner.category}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </button>
  );
}
