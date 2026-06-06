"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHRASES = ["LOADING", "COMPUTING", "SEARCHING", "RETRIEVING", "ASSEMBLING"];
const WORD_MS = 650;

export function SplashScreen() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (i >= PHRASES.length - 1) {
      const t = setTimeout(() => setVisible(false), WORD_MS + 200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI((p) => p + 1), WORD_MS);
    return () => clearTimeout(t);
  }, [i]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={PHRASES[i]}
                initial={{ opacity: 0, filter: "blur(18px)", y: 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(18px)", y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="font-sans font-bold text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.35em]"
              >
                {PHRASES[i]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
