import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowDownRight, RotateCcw } from 'lucide-react';

interface HeroTypographicAnimationProps {
  lang: 'pt' | 'en';
  onBookNow: () => void;
  onLearnMethod: () => void;
  startZenSound?: () => void;
  stopZenSound?: () => void;
}

interface KineticWord {
  pt: string;
  en: string;
  kanji: string;
  step: string;
}

const SEQUENCE_WORDS: KineticWord[] = [
  { pt: 'SENTIR.', en: 'FEEL.', kanji: '感', step: '01' },
  { pt: 'COMPREENDER.', en: 'UNDERSTAND.', kanji: '解', step: '02' },
  { pt: 'CUIDAR.', en: 'CARE.', kanji: '慈', step: '03' },
  { pt: 'TRATAR.', en: 'TREAT.', kanji: '療', step: '04' },
  { pt: 'EVOLUIR.', en: 'EVOLVE.', kanji: '進', step: '05' },
];

const WORD_DURATION_MS = 1800; // ~1.8s per word (within requested 1.5s to 2s range)

export default function HeroTypographicAnimation({
  lang,
  onBookNow,
  onLearnMethod,
  startZenSound,
  stopZenSound,
}: HeroTypographicAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check accessibility: prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
        setIsResolved(true);
      }
      const handler = (e: MediaQueryListEvent) => {
        if (e.matches) {
          setReducedMotion(true);
          setIsResolved(true);
        }
      };
      mediaQuery.addEventListener?.('change', handler);
      return () => mediaQuery.removeEventListener?.('change', handler);
    }
  }, []);

  // Run the sequential typographic animation once
  useEffect(() => {
    if (reducedMotion || isResolved) return;

    timerRef.current = setTimeout(() => {
      if (currentIndex < SEQUENCE_WORDS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Animation finished: reveal final messages permanently, no auto-loop
        setIsResolved(true);
      }
    }, WORD_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isResolved, reducedMotion]);

  const replaySequence = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsResolved(false);
    setCurrentIndex(0);
  };

  const currentWord = SEQUENCE_WORDS[currentIndex];
  const activeWordLabel = lang === 'pt' ? currentWord.pt : currentWord.en;

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-left">
      {/* 1. Identification Line above the typography */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="mb-4 sm:mb-6 flex items-center justify-between gap-4 flex-wrap"
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0"
          >
            <img
              src="/assets/nipon_emblem_clean.png"
              alt="Símbolo Nipon Spa"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-[0_2px_8px_rgba(230,0,18,0.45)]"
            />
          </motion.div>
          <span className="text-label text-white/90 text-xs sm:text-sm tracking-[0.22em] sm:tracking-[0.28em] block uppercase">
            {lang === 'pt'
              ? 'NIPON SPA · TERAPIAS JAPONESAS · TELHEIRAS, LISBOA'
              : 'NIPON SPA · JAPANESE THERAPIES · TELHEIRAS, LISBON'}
          </span>
        </div>

        {/* Minimalist discreet replay action when resolved */}
        {isResolved && !reducedMotion && (
          <button
            onClick={replaySequence}
            className="text-white/40 hover:text-white/80 transition-colors duration-200 text-xs flex items-center gap-1.5 cursor-pointer py-1 px-2.5 rounded-full hover:bg-white/5"
            title={lang === 'pt' ? 'Rever sequência tipográfica' : 'Replay typographic sequence'}
          >
            <RotateCcw className="w-3 h-3" />
            <span className="font-mono text-[10px] tracking-wider uppercase">Replay</span>
          </button>
        )}
      </motion.div>

      {/* 2. Reserved Stage for the Typography (Zero Layout Shift container) */}
      <div 
        className="relative my-5 sm:my-7 select-none min-h-[280px] sm:min-h-[320px] md:min-h-[350px] flex flex-col justify-center"
        onMouseEnter={startZenSound}
        onMouseLeave={stopZenSound}
      >
        <AnimatePresence mode="wait">
          {!isResolved ? (
            /* Kinetic Sequential Typography (Inspired by Besible - Calm & Serene Pace) */
            <motion.div
              key="kinetic-sequence"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ 
                opacity: 0, 
                y: -12,
                filter: 'blur(8px)',
                transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } 
              }}
              className="w-full flex flex-col justify-center"
            >
              {/* Subtle Step Index & Japanese Kanji Marker */}
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#cc0000] font-semibold">
                  {currentWord.step} / 05
                </span>
                <span className="h-[1px] w-6 sm:w-10 bg-white/20" />
                <span className="text-sm sm:text-base text-white/60 font-light tracking-widest font-sans">
                  {currentWord.kanji}
                </span>
              </div>

              {/* Individual Animated Word (Ultra-smooth, gentle elevation) */}
              <div className="overflow-hidden py-1 sm:py-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`word-${currentIndex}`}
                    initial={{
                      opacity: 0,
                      y: 20,
                      filter: 'blur(6px)',
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                    }}
                    exit={{
                      opacity: 0,
                      y: -16,
                      filter: 'blur(6px)',
                    }}
                    transition={{
                      duration: 0.85,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="font-heading font-light text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] tracking-tight text-white leading-none uppercase"
                  >
                    {activeWordLabel}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Minimalist Progress Track (Synchronized with 1.8s pace) */}
              <div className="w-full max-w-xs sm:max-w-sm mt-5 sm:mt-7 flex items-center gap-2">
                <div className="flex-1 h-[2px] bg-white/15 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#cc0000]"
                    initial={{ width: `${(currentIndex / 5) * 100}%` }}
                    animate={{ width: `${((currentIndex + 1) / 5) * 100}%` }}
                    transition={{ duration: 1.8, ease: 'linear' }}
                  />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                  Nipon Spa
                </span>
              </div>
            </motion.div>
          ) : (
            /* Final Revealed State: Original Homepage Messages & Styling */
            <motion.div
              key="resolved-hero"
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {/* Main Title (H1) — Exact original text, typography, size, alignment */}
              <h1 className="relative z-10 font-heading font-light text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] text-white leading-[1.18] sm:leading-[1.12] tracking-tight max-w-3xl cursor-default">
                {lang === 'pt'
                  ? 'A dor não tem de fazer parte da sua vida.'
                  : 'Pain does not have to be part of your life.'}
              </h1>

              {/* Subtle traditional Japanese seal & dividing accents — Preserved between the two messages */}
              <div className="relative z-10 flex items-center justify-start gap-3 sm:gap-4 mt-4 sm:mt-5 opacity-80">
                <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-white/40 to-transparent"></span>
                <span className="text-label tracking-[0.25em] text-white/75">
                  日本スパ · 静寂と調和
                </span>
                <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-white/40"></span>
              </div>

              {/* Hero Supporting Text — Exact original text, typography, size, alignment */}
              <div className="max-w-2xl mt-5 sm:mt-6 mb-2">
                <p className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed font-light">
                  {lang === 'pt'
                    ? 'Há 22 anos em Lisboa, cuidamos de cada corpo com a tradição das terapias japonesas e protocolos personalizados.'
                    : 'For 22 years in Lisbon, we care for each body with the tradition of Japanese therapies and personalized protocols.'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Action Buttons — Statically Positioned Below, ALWAYS Accessible During and After Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch sm:items-center justify-start mt-4 sm:mt-6"
      >
        {/* Primary CTA: Agendar tratamento */}
        <button
          onClick={onBookNow}
          className="w-full sm:w-auto bg-[#cc0000] hover:bg-brand-red-hover text-white px-8 py-3.5 rounded-full text-btn transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#cc0000]/25 flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>{lang === 'pt' ? 'Agendar tratamento' : 'Book treatment'}</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>

        {/* Secondary CTA: Conhecer o Método Nipon */}
        <button
          onClick={onLearnMethod}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full text-btn transition-all duration-300 hover:scale-105 active:scale-95 border border-white/40 text-white hover:bg-white hover:text-black cursor-pointer backdrop-blur-sm shadow-sm flex items-center justify-center gap-2 group"
        >
          <span>{lang === 'pt' ? 'Conhecer o Método Nipon' : 'Discover the Nipon Method'}</span>
          <ArrowDownRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </motion.div>
    </div>
  );
}
