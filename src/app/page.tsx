"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Difficulty } from "@/types/game";
import Image from "next/image";
import DifficultySelector from "@/components/DifficultySelector";
import ContourBackground from "@/components/ContourBackground";

export default function Home() {
  const [selected, setSelected] = useState<Difficulty | undefined>();
  const router = useRouter();

  const handleStart = () => {
    if (selected) {
      router.push(`/game?difficulty=${selected}`);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative">
      <ContourBackground />

      <div className="text-center mb-10">
        <div className="mb-6">
          <Image
            src="/youknow-logo.png"
            alt="YOUKNOW Technologies"
            width={200}
            height={53}
            className="mx-auto h-auto max-w-[180px] sm:max-w-[200px]"
            priority
          />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-yk-royal-blue mb-3">
          <span className="text-yk-green">Do</span> YOUKNOW?
        </h1>
        <p className="text-lg text-gray-500 max-w-md mx-auto">
          How well do you know the YOUKNOW tech stack? Match the technology
          partner logos to test your memory.
        </p>
      </div>

      <DifficultySelector onSelect={setSelected} current={selected} />

      <button
        onClick={handleStart}
        disabled={!selected}
        className={`mt-8 px-10 py-4 rounded-2xl text-lg font-bold transition-all cursor-pointer ${
          selected
            ? "bg-yk-green text-yk-royal-blue hover:shadow-lg hover:scale-105 active:scale-100"
            : "bg-yk-grey text-gray-400 cursor-not-allowed"
        }`}
      >
        Start Game
      </button>

      <p className="mt-6 text-xs text-gray-400">
        Flip cards to find matching partner logos. Fewer moves + faster time =
        higher score!
      </p>
    </main>
  );
}
