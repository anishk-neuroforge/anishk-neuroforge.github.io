"use client";

import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipFadeTextProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  letterDuration?: number;
  staggerDelay?: number;
  exitStaggerDelay?: number;
}

const defaultWords = ["LOADING", "COMPUTING", "TRAINING", "INFERENCING", "DEPLOYING"];

const Letter = memo(function Letter({
  char,
  letterDuration,
  delay,
  exitDelay,
}: {
  char: string;
  letterDuration: number;
  delay: number;
  exitDelay: number;
}) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, filter: "blur(14px)", x: -20 }}
      animate={{ opacity: 1, filter: "blur(0px)", x: 0, transition: { duration: letterDuration, delay, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, filter: "blur(14px)", x: 20, transition: { duration: letterDuration * 0.8, delay: exitDelay, ease: [0.4, 0, 1, 1] } }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
});

const Word = memo(function Word({
  text,
  staggerDelay,
  exitStaggerDelay,
  letterDuration,
  textClassName,
}: {
  text: string;
  staggerDelay: number;
  exitStaggerDelay: number;
  letterDuration: number;
  textClassName?: string;
}) {
  const letters = useMemo(() => text.split(""), [text]);
  return (
    <span className={cn("inline-flex", textClassName)}>
      {letters.map((char, i) => (
        <Letter
          key={`${char}-${i}`}
          char={char}
          letterDuration={letterDuration}
          delay={i * staggerDelay}
          exitDelay={(letters.length - 1 - i) * exitStaggerDelay}
        />
      ))}
    </span>
  );
});

export function FlipFadeText({
  words = defaultWords,
  interval = 1200,
  className,
  textClassName,
  letterDuration = 0.5,
  staggerDelay = 0.06,
  exitStaggerDelay = 0.04,
}: FlipFadeTextProps) {
  const [index, setIndex] = useState(0);

  const updateIndex = useCallback(() => {
    setIndex((prev) => (prev + 1) % words.length);
  }, [words.length]);

  useEffect(() => {
    const timer = setInterval(updateIndex, interval);
    return () => clearInterval(timer);
  }, [updateIndex, interval]);

  const currentWord = useMemo(() => words[index], [words, index]);

  return (
    <div className={cn("relative inline-flex items-center justify-center overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.div key={currentWord} className="inline-flex">
          <Word
            text={currentWord}
            staggerDelay={staggerDelay}
            exitStaggerDelay={exitStaggerDelay}
            letterDuration={letterDuration}
            textClassName={textClassName}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default FlipFadeText;
