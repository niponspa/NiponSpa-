import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ZenIntroAnimationProps {
  onComplete?: () => void;
  lang?: 'pt' | 'en';
}

export default function ZenIntroAnimation({
  onComplete,
}: ZenIntroAnimationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Elegant automatic transition after ~2.2 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 2200);

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
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } 
          }}
          onClick={handleDismiss}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] cursor-pointer select-none overflow-hidden"
        >
          {/* Ambient red breathing halo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ 
              opacity: [0, 0.4, 0.25], 
              scale: [0.6, 1.25, 1.05] 
            }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
            className="absolute w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full bg-[#E60012]/20 blur-[100px] pointer-events-none"
          />

          {/* Concentric subtle zen ripple circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 0.3, 0], 
              scale: [0.5, 1.3, 1.7] 
            }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
            className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/10 pointer-events-none"
          />

          {/* Pure Japanese Emblem (Only the logo, without typography, 100% clean without white blotches) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center justify-center"
          >
            <div className="relative transition-transform duration-700 hover:scale-105">
              <img 
                src="/assets/nipon_emblem_clean.png"
                alt="Nipon Spa Logo 日本"
                className="w-32 h-auto sm:w-44 max-w-[180px] object-contain drop-shadow-[0_4px_30px_rgba(230,0,18,0.45)] select-none pointer-events-none"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
