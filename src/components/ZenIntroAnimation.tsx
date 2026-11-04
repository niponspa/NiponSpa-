import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NiponEmblem } from './NiponLogo';

interface ZenIntroAnimationProps {
  onComplete?: () => void;
  lang?: 'pt' | 'en';
}

export default function ZenIntroAnimation({
  onComplete,
  lang = 'pt'
}: ZenIntroAnimationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Elegant automatic transition after ~2.0 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleDismiss = () => {
    setVisible(false);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="zen-intro-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.04,
            filter: 'blur(8px)',
            transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } 
          }}
          onClick={handleDismiss}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] cursor-pointer select-none overflow-hidden"
        >
          {/* Ambient red breathing halo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ 
              opacity: [0, 0.45, 0.25], 
              scale: [0.6, 1.25, 1.05] 
            }}
            transition={{ duration: 2.0, ease: 'easeOut' }}
            className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full bg-[#E60012]/20 blur-[100px] pointer-events-none"
          />

          {/* Concentric subtle zen ripple circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 0.35, 0], 
              scale: [0.5, 1.3, 1.7] 
            }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
            className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/10 pointer-events-none"
          />

          {/* Authentic Japanese Symbol from Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="relative shadow-2xl shadow-[#E60012]/35 rounded-full p-1.5 transition-transform duration-700 hover:scale-105">
              <NiponEmblem 
                size={110} 
                className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_4px_30px_rgba(230,0,18,0.5)]" 
              />
            </div>

            {/* Subtle Brand & Lineage reveal */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-center space-y-1.5"
            >
              <span className="text-xs sm:text-sm font-heading font-medium tracking-[0.38em] text-white/95 uppercase block pl-[0.38em]">
                NIPON SPA
              </span>
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.28em] text-[#E60012] uppercase block pl-[0.28em]">
                日本スパ · 静寂と調和
              </span>
            </motion.div>
          </motion.div>

          {/* Delicate hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="absolute bottom-8 sm:bottom-12 flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase"
          >
            <span>{lang === 'pt' ? 'Entrar' : 'Enter'}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
