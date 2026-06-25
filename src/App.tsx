/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Compass, 
  HeartPulse, 
  Sparkles, 
  Star, 
  User, 
  ShieldCheck, 
  Check, 
  ChevronRight, 
  ChevronDown,
  Plus, 
  Trash2, 
  Copy, 
  Lock, 
  LogIn, 
  Coffee, 
  Flower2, 
  CheckCircle2, 
  ArrowRight, 
  Info,
  CalendarDays,
  Utensils,
  BookOpen,
  VolumeX,
  X,
  Menu,
  Play,
  Award,
  Users,
  History,
  TrendingUp,
  Video,
  Facebook,
  Youtube,
  Flame,
  Waves
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { THERAPIES, INITIAL_REVIEWS, generateAvailableSlots, generateMockReference } from './data';
import { Therapy, Booking, PaymentMethod, Review } from './types';
import { TRANSLATIONS } from './translations';
import NiponLogo from './components/NiponLogo';
import GalleryView from './components/GalleryView';
import TeamSection from './components/TeamSection';
import { BLOG_POSTS, BlogPost } from './data/blog';

// Import image assets statically for Vite production bundles
import spaHeroImg from './assets/images/japanese_spa_hero_1781089830835.png';
import therapyHeroImg from './assets/images/japanese_therapy_1781089845836.png';

// Let's use 2026-06-10 as our base date
const BASE_DATE_STR = "2026-06-10";

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return '';
  let videoId = 'AY5qcIq5u2g';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    videoId = match[2];
  }
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const params = [
    'autoplay=1',
    'mute=1',
    'loop=1',
    `playlist=${videoId}`,
    'controls=0',
    'showinfo=0',
    'rel=0',
    'playsinline=1',
    'iv_load_policy=3',
    'enablejsapi=1',
    origin ? `origin=${encodeURIComponent(origin)}` : ''
  ].filter(Boolean).join('&');
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
};

interface LegacyTimelineAndNewGenProps {
  lang: 'pt' | 'en';
}

export function LegacyTimelineAndNewGen({ lang }: LegacyTimelineAndNewGenProps) {
  const [activeMediaTab, setActiveMediaTab] = React.useState<'youtube' | 'facebook' | 'courses' | 'events'>('youtube');
  const [timelineStep, setTimelineStep] = React.useState<number>(0);

  const steps = [
    {
      year: "2004",
      title: lang === 'pt' ? "Fundação por Vanessa Nascimento" : "Founding by Vanessa Nascimento",
      desc: lang === 'pt' 
        ? "Fundado com a enorme paixão de Vanessa Nascimento pelas terapias de cura manuais e pela cultura oriental, o Nipon Spa surgiu como um santuário de autêntico restabelecimento físico e espiritual."
        : "Founded through Vanessa Nascimento's great passion for ancient manual therapies and Japanese care culture, Nipon Spa rose to prominence as a physical and spiritual sanctuary.",
      badge: lang === 'pt' ? "O Nascimento do Templo" : "The Sacred Beginning",
      icon: History
    },
    {
      year: "22 Anos de Sucesso",
      title: lang === 'pt' ? "Crescimento & Adaptação" : "Growth & Mastery",
      desc: lang === 'pt'
        ? "Duas décadas de crescimento sustentável em Lisboa, cultivando a excelência no atendimento personalizado e promovendo rituais consagrados de relaxamento e reequilíbrio inspirados na tradição japonesa."
        : "Two decades of secure growth in Lisbon, polishing our tailor-made hospitality and promoting legendary relaxation and rebalancing rituals inspired by Japanese tradition.",
      badge: lang === 'pt' ? "Equilíbrio & Tradição" : "Balance & Heritage",
      icon: TrendingUp
    },
    {
      year: "Mais de 50.000 + Clientes",
      title: lang === 'pt' ? "Legado e Referência de Lisboa" : "Lisbon's Trusted Benchmark",
      desc: lang === 'pt'
        ? "Mais de 50 mil clientes confiaram as suas mentes e corpos ao nosso espaço, consolidando o Nipon Spa como a autoridade inquestionável em bem-estar e calmaria na capital portuguesa."
        : "Over 50,000 patrons have surrendered their stress and fatigue to our master therapists, cementing Nipon Spa as the ultimate oasis in the Portuguese capital.",
      badge: lang === 'pt' ? "Comunidade Alinhada" : "Aligned Community",
      icon: Users
    },
    {
      year: "Nova Geração",
      title: lang === 'pt' ? "Uma Nova Liderança" : "A New Leadership",
      desc: lang === 'pt'
        ? "A passagem do bastão de liderança. A essência do tratamento nipónico alia-se agora a uma nova gestão estratégica com os mesmos valores tradicionais, unindo a tradição japonesa à inovação."
        : "The leadership handoff. The original spirit of Japanese restorative care joins a new strategic leadership, merging Japanese tradition with innovation while maintaining the core ancestral values.",
      badge: lang === 'pt' ? "Evolução & Sinergia" : "Evolution & Synergy",
      icon: Sparkles
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in text-left">
      
      {/* 1. O Nosso Legado - 22 Anos de Dedicação ao Bem-estar */}
      <div className="relative overflow-hidden py-4">
        {/* Background watermark */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
          <span className="text-8xl font-black font-serif text-white uppercase tracking-widest">伝承</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-brand-red font-mono font-bold text-xs uppercase tracking-[0.22em] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse"></span>
                {lang === 'pt' ? 'O Nosso Legado • 22 Anos' : 'Our Legacy • 22 Years'}
              </span>
              <h2 className="text-3xl font-light tracking-tight text-white font-heading">
                {lang === 'pt' ? 'Dedicação Integral ao Bem-estar' : 'Unwavering Dedication to Well-being'}
              </h2>
            </div>

            <div className="relative border-l-2 border-brand-red/30 pl-5 space-y-4">
              <p className="text-base sm:text-lg font-serif italic text-gray-200 leading-relaxed font-normal">
                {lang === 'pt'
                  ? '“O Nipon Spa nasceu da paixão de Vanessa Nascimento pelas terapias manuais e pela cultura japonesa de cuidar das pessoas com atenção, respeito e excelência.”'
                  : '“Nipon Spa was born from Vanessa Nascimento’s deep passion for manual therapies and the Japanese culture of caring for people with absolute focus, deep respect, and clinical excellence.”'}
              </p>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans font-light">
                {lang === 'pt'
                  ? 'Ao longo de mais de duas décadas, milhares de clientes confiaram nos nossos cuidados, transformando o Nipon Spa numa referência em Lisboa. Hoje, esse legado continua através de uma nova geração que partilha os mesmos valores de dedicação, profissionalismo e atenção ao detalhe.'
                  : 'Over more than two decades, thousands of clients have trusted our care, turning Nipon Spa into an undisputed reference in Lisbon. Today, this legacy continues through a new generation sharing the exact same values of devotion, extreme professionalism, and micro-attention to detail.'}
              </p>
            </div>
          </div>

          {/* Stat Cards Column */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 w-full">
            <div className="p-4 text-center space-y-1">
              <span className="text-4xl font-heading font-extrabold text-brand-red block tracking-tight">22+</span>
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                {lang === 'pt' ? 'Anos em Lisboa' : 'Years in Lisbon'}
              </span>
            </div>

            <div className="p-4 text-center space-y-1">
              <span className="text-4xl font-heading font-extrabold text-[#cc0000] block tracking-tight">60.000+</span>
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                {lang === 'pt' ? 'Atendimentos Realizados' : 'Treatments Performed'}
              </span>
            </div>

            <div className="p-4 text-center space-y-1">
              <span className="text-4xl font-heading font-extrabold text-brand-gold block tracking-tight">100%</span>
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                {lang === 'pt' ? 'Protocolos Personalizados' : 'Tailored Treatment Plans'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LINHA DO TEMPO INTERATIVA */}
      <div className="bg-brand-charcoal border border-brand-border rounded-3xl p-6 sm:p-10 space-y-8 relative">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="text-brand-gold font-mono font-bold text-[10px] uppercase tracking-widest block">
            {lang === 'pt' ? 'Cronologia de Excelência' : 'Chronology of Excellence'}
          </span>
          <h3 className="text-2xl font-bold font-heading text-white">
            {lang === 'pt' ? 'A Nossa Linha do Tempo' : 'Our Legacy Timeline'}
          </h3>
          <p className="text-xs text-gray-400 font-sans">
            {lang === 'pt' 
              ? 'Clique nos marcos cronológicos abaixo para viajar pela história do Nipon Spa e vivenciar a nossa transitoriedade de gerações.'
              : 'Click on the chronological milestones below to explore the history of Nipon Spa and discover our passing of the baton.'}
          </p>
        </div>

        {/* Timeline Horizon Tabs */}
        <div className="flex flex-nowrap overflow-x-auto md:overflow-visible items-center justify-start md:justify-center gap-x-8 max-w-4xl mx-auto border-b border-brand-border/40 pb-0 scrollbar-none w-full px-2">
          {steps.map((s, idx) => {
            const isActive = timelineStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setTimelineStep(idx)}
                className={`relative py-3 text-xs sm:text-[13px] font-medium tracking-wide transition duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? 'text-[#cc0000] font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{s.year}</span>
                {isActive && (
                  <motion.span 
                    layoutId="activeTimelineStep"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#cc0000]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Timeline Slide Detail Display */}
        <div className="bg-brand-black/40 border border-brand-border/65 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border/40 pb-4">
            <div className="space-y-1">
              <span className="text-[9px] bg-brand-red/15 text-brand-red border border-brand-red/35 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono font-bold">
                {steps[timelineStep].badge}
              </span>
              <h4 className="text-xl font-heading font-extrabold text-white">
                {steps[timelineStep].title}
              </h4>
            </div>
            <span className="font-mono text-xs font-bold text-brand-gold select-none bg-brand-charcoal/85 border border-brand-border px-3.5 py-1.5 rounded-xl">
              {steps[timelineStep].year}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans max-w-4xl">
            {steps[timelineStep].desc}
          </p>

          {/* STEP 0: 2004 (Fundação - Vanessa's Testimonial Video) */}
          {timelineStep === 0 && (
            <div className="space-y-4 pt-4 border-t border-brand-border/30">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-[0.2em] block">
                  {lang === 'pt' ? 'TESTEMUNHO HISTÓRICO: VANESSA NASCIMENTO' : 'HISTORICAL TESTIMONIAL: VANESSA NASCIMENTO'}
                </span>
                <p className="text-[10px] text-gray-500 font-mono italic">
                  {lang === 'pt' ? 'O testemunho sincero sobre o nascimento do Nipon Spa:' : 'The heartfelt story about the inception of Nipon Spa:'}
                </p>
              </div>

              {/* Vanessa's testimony simulated video container */}
              <div className="relative overflow-hidden border border-brand-border bg-brand-black max-w-2xl mx-auto rounded-xl p-6 text-center space-y-4 shadow-xl">
                <div className="absolute inset-0 opacity-15 bg-gradient-to-t from-brand-gold to-transparent pointer-events-none"></div>
                
                <div className="w-14 h-14 rounded-full bg-brand-charcoal border border-brand-gold flex items-center justify-center text-brand-gold mx-auto shadow animate-pulse">
                  <Play className="w-5 h-5 text-brand-gold ml-0.5" />
                </div>

                <div className="space-y-1 relative z-10">
                  <h5 className="text-white text-sm font-heading font-medium">
                    {lang === 'pt' ? 'O Meu Testemunho • Por Vanessa Nascimento' : 'My Testimony • By Vanessa Nascimento'}
                  </h5>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-md mx-auto">
                    {lang === 'pt'
                      ? 'Vanessa Nascimento partilha em primeira pessoa as suas inspirações, a busca pela excelência na arte de cuidar japonesa e como transformou uma visão num templo de paz no coração de Lisboa.'
                      : 'Vanessa Nascimento shares first-hand her inspirations, the search for absolute excellence in the Japanese art of care, and how she crafted an urban sanctuary of peace in Lisbon.'}
                  </p>
                  <span className="text-[10px] text-brand-gold font-mono uppercase bg-brand-gold/10 border border-brand-gold/30 px-3 py-1 rounded-full inline-block mt-2 font-bold select-none">
                    {lang === 'pt' ? '⏳ Vídeo Brevemente • Testemunho de Vanessa' : '⏳ Video Coming Soon • Vanessa’s Testimonial'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Nova Geração (Directors Information) */}
          {timelineStep === 3 && (
            <div className="space-y-6 pt-6 border-t border-brand-border/30 animate-fade-in text-center max-w-2xl mx-auto">
              <span className="text-brand-red font-mono font-bold text-xs uppercase tracking-widest block">
                {lang === 'pt' ? 'Evolução & Rebranding' : 'Evolution & Rebranding'}
              </span>
              <h3 className="text-xl md:text-2xl font-bold font-heading text-white">
                {lang === 'pt' ? 'Preservando o Legado, Inspirando o Futuro' : 'Preserving the Legacy, Inspiring the Future'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                {lang === 'pt' 
                  ? 'A transição para uma nova geração marca o início de uma nova era estratégica para o Nipon Spa. Unimos a excelência de rituais tradicionais com mais de 22 anos à inovação e dinamismo de uma equipa apaixonada.'
                  : 'The transition to a new generation marks the beginning of a new strategic era for Nipon Spa. We unite over 22 years of excellent traditional rituals with the innovation and dynamism of a passionate team.'}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-mono text-brand-gold uppercase tracking-wider bg-brand-gold/10 border border-brand-gold/25 px-4 py-2 rounded-full font-bold">
                  <span>✦</span>
                  {lang === 'pt' ? 'Conheça a nossa equipa de especialistas abaixo' : 'Meet our team of specialists below'}
                  <span>✦</span>
                </span>
              </div>
            </div>
          )}

        </div>
      </div>



      {/* 4. PORQUE ESCOLHER O NIPON SPA */}
      <div className="space-y-8 py-4">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-brand-gold font-mono font-bold text-[10px] uppercase tracking-widest block">
            {lang === 'pt' ? 'Diferenciais do Nosso Templo' : 'Why Choose Nipon Spa'}
          </span>
          <h3 className="text-2xl font-bold font-heading text-white">
            {lang === 'pt' ? 'Porque escolher o Nipon Spa?' : 'Why Choose the Nipon Spa?'}
          </h3>
          <p className="text-xs text-gray-400 font-sans">
            {lang === 'pt' 
              ? 'Uma síntese dos pilares que tornaram os nossos rituais tradicionais num marco insubstituível em Lisboa.'
              : 'Our key competitive advantages that make every physical treatment an unforgettable milestone of peace.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: lang === 'pt' ? 'Cultura japonesa autêntica' : 'Authentic Japanese Culture',
              desc: lang === 'pt' 
                ? 'Os nossos rituais tradicionais, o aroma acolhedor a madeira hinoki e a infusão de chá matcha biológico transportam-no verdadeiramente para Quioto.'
                : 'Our traditional rituals, welcoming Hinoki scent profile, and organic matcha teas convey Kyoto’s true zen.',
              icon: Flower2
            },
            {
              title: lang === 'pt' ? 'Formação com mestres japoneses' : 'Trained with Japanese Masters',
              desc: lang === 'pt' 
                ? 'Todos os nossos terapeutas são formados e certificados nas linhagens mais tradicionais de massagem oriental.'
                : 'Every practitioner is certified and trained under rigorous traditional lineages of Eastern acupressure.',
              icon: Award
            },
            {
              title: lang === 'pt' ? 'Atendimento Omotenashi' : 'Sincere Omotenashi Care',
              desc: lang === 'pt' 
                ? 'Antecipamos cada necessidade com discrição absoluta e respeito total ao silêncio que o alívio das tensões exige.'
                : 'We anticipate every bodily need with absolute silence, discretion, and profound individual focus.',
              icon: Sparkles
            },
            {
              title: lang === 'pt' ? 'Tratamentos personalizados' : 'Customized Treatments',
              desc: lang === 'pt' 
                ? 'Os óleos biológicos essenciais, as técnicas e as frequências de pressões são individualizados para as suas necessidades exatas.'
                : 'Organic essential oils, specialized techniques, and pressure frequencies are configured strictly for your exact needs.',
              icon: ShieldCheck
            },
            {
              title: lang === 'pt' ? 'Equipa especializada' : 'Specialist Certified Team',
              desc: lang === 'pt' 
                ? 'Terapeutas altamente dedicados com conhecimento de anatomia e profundo respeito pela cura integrada.'
                : 'Directly supported by licensed professionals with rigorous training in full-body restoration.',
              icon: Users
            },
            {
              title: lang === 'pt' ? 'Ambiente tranquilo' : 'Tranquil Soundproofed Space',
              desc: lang === 'pt' 
                ? 'Nenhum ruído urbano da cidade de Lisboa ultrapassa as nossas acusticamente isoladas paredes de relaxamento.'
                : 'No Lisbon street noise can bypass our thick custom-built acoustic buffers, ensuring uninterrupted calm.',
              icon: Coffee
            }
          ].map((v, index) => {
            return (
              <div key={index} className="bg-brand-charcoal/65 border border-brand-border/60 rounded-2xl p-6 space-y-3 hover:border-brand-red/30 transition duration-300 text-left">
                <h4 className="font-heading font-extrabold text-white text-base">
                  {v.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export const FOCUS_AREAS = [
  {
    id: 'pain-relief',
    icon: 'Flame',
    titlePt: 'Tratamento para dores e tensões',
    titleEn: 'Treatment for Pain & Tension',
    descPt: 'Focado no alívio de dor nas costas, tensão cervical, ombros rígidos e cansaço físico acumulado através de acupressão profunda adaptada.',
    descEn: 'Focused on relieving back pain, neck tension, stiff shoulders, and accumulated physical fatigue through customized deep acupressure.',
    badgePt: 'Alívio & Recuperação',
    badgeEn: 'Relief & Recovery',
    levels: [
      {
        id: 'protocol-30',
        namePt: 'Alívio Rápido',
        nameEn: 'Quick Relief',
        duration: 30,
        price: 40,
        descPt: 'Sessão express focada na descompressão rápida da sua zona de principal dor (costas, pescoço ou ombros). Alívio imediato da rigidez e desativação de pontos de gatilho agudos.',
        descEn: 'Express session focused on rapid decompression of your main area of pain (back, neck, or shoulders). Immediate stiffness relief and acute trigger point deactivation.',
        resultsPt: ['Costas leves e sem peso acumulado', 'Alívio instantâneo da rigidez no pescoço', 'Aumento imediato de vitalidade física'],
        resultsEn: ['Light back free of heavy stiffness', 'Instant relief of neck tension', 'Immediate boost in physical vitality'],
        benefitsPt: ['Atuação ultra-focada na zona de maior queixa', 'Desativação de pontos de gatilho de stress agudo'],
        benefitsEn: ['Ultra-focused relief on your primary area of concern', 'Deactivation of acute stress trigger points']
      },
      {
        id: 'protocol-60',
        namePt: 'Equilíbrio Profundo',
        nameEn: 'Deep Balance',
        duration: 60,
        price: 70,
        descPt: 'Uma massagem completa adaptada às suas necessidades de alívio e bem-estar corporal. Combina acupressão oriental e fluidez muscular profunda para descompressão geral.',
        descEn: 'A full massage tailored to your needs for relief and physical well-being. Blends Eastern acupressure and deep muscular flow for overall decompression.',
        resultsPt: ['Relaxamento muscular e mental profundo', 'Descompressão de tensões generalizadas', 'Qualidade de sono incrivelmente restaurada'],
        resultsEn: ['Deep physical and mental relaxation', 'Decompression of generalized body tension', 'Incredibly restored sleep quality'],
        benefitsPt: ['Harmonia profunda entre o corpo e a mente', 'Realinhamento do fluxo de energia vital (Ki)'],
        benefitsEn: ['Deep harmony between body and mind', 'Realigns the flow of vital energy (Ki)']
      },
      {
        id: 'protocol-90',
        namePt: 'Experiência Completa',
        nameEn: 'Complete Experience',
        duration: 90,
        price: 90,
        descPt: 'O auge do alívio terapêutico. Um ritual completo com massagem dos pés à cabeça e alongamento terapêutico profundo para uma renovação física total.',
        descEn: 'The absolute pinnacle of therapeutic relief. A complete ritual with head-to-toe massage and deep therapeutic stretching for a total physical renewal.',
        resultsPt: ['Sensação de renascer físico e espiritual absoluto', 'Alívio profundo e relaxamento muscular de tecidos moles', 'Desconexão total do stress quotidiano'],
        resultsEn: ['Absolute physical and spiritual rebirth', 'Deep muscle relief and soft tissue relaxation', 'Complete disconnection from daily stress'],
        benefitsPt: ['Massagem integrada de corpo inteiro, dos pés à cabeça', 'Tratamento premium focado no alívio geral e alongamento'],
        benefitsEn: ['Integrated full-body massage from head to toe', 'Premium treatment focused on overall relief and stretching']
      }
    ]
  },
  {
    id: 'body-reshaping',
    icon: 'Waves',
    titlePt: 'Tratamento para redução de medidas e inchaços',
    titleEn: 'Treatment for Measurements & Swelling Reduction',
    descPt: 'Protocolos de modelagem e drenagem manual suave para eliminar líquidos em excesso, diminuir o inchaço e redefinir contornos.',
    descEn: 'Gentle manual drainage and contouring protocols to eliminate excess fluids, reduce bloating, and redefine contours.',
    badgePt: 'Drenagem & Definição',
    badgeEn: 'Drainage & Definition',
    levels: [
      {
        id: 'protocol-30',
        namePt: 'Alívio Rápido',
        nameEn: 'Quick Relief',
        duration: 30,
        price: 40,
        descPt: 'Drenagem express focada em desinchar e ativar a circulação na zona de maior retenção (ex: pernas ou abdómen). Perfeito para um alívio leve e imediato.',
        descEn: 'Express drainage focused on reducing swelling and activating circulation in the area of greatest retention (e.g., legs or abdomen). Perfect for light, immediate relief.',
        resultsPt: ['Desinchaço instantâneo de pernas ou abdómen', 'Sensação imediata de leveza e bem-estar', 'Ativação da microcirculação sanguínea'],
        resultsEn: ['Instant reduction in leg or abdominal bloating', 'Immediate feeling of lightness and well-being', 'Activation of blood microcirculation'],
        benefitsPt: ['Foco na área de maior retenção hídrica', 'Massagem de alta eficácia com toque express'],
        benefitsEn: ['Focus on the area with the highest water retention', 'Highly effective express touch massage']
      },
      {
        id: 'protocol-60',
        namePt: 'Equilíbrio Profundo',
        nameEn: 'Deep Balance',
        duration: 60,
        price: 70,
        descPt: 'Protocolo completo de drenagem manual suave e modelagem corporal. Atua profundamente para eliminar líquidos acumulados, combater o inchaço e redefinir contornos.',
        descEn: 'Full protocol of gentle manual drainage and body sculpting. Acts deeply to eliminate retained fluids, combat bloating, and redefine body contours.',
        resultsPt: ['Redução visível de medidas, inchaço e gordura localizada', 'Melhoria no aspeto de casca de laranja e firmeza da pele', 'Eliminação acelerada de toxinas corporais'],
        resultsEn: ['Visible reduction in measurements, bloating, and localized fat', 'Improvement in orange-peel skin appearance and firmness', 'Accelerated elimination of body toxins'],
        benefitsPt: ['Drenagem linfática manual baseada em técnicas orientais', 'Remodelação corporal e combate à gordura localizada e celulite'],
        benefitsEn: ['Manual lymphatic drainage based on Eastern techniques', 'Body contouring targeting localized fat and cellulite']
      },
      {
        id: 'protocol-90',
        namePt: 'Experiência Completa',
        nameEn: 'Complete Experience',
        duration: 90,
        price: 90,
        descPt: 'Tratamento de drenagem profunda e modelagem corporal integrada de 90 minutos. Atuação prolongada para máxima redução de inchaço e definição dos contornos corporais.',
        descEn: '90-minute integrated deep drainage and body shaping treatment. Extended session for maximum reduction of bloating and body contour definition.',
        resultsPt: ['Renovação corporal total com redução extrema do inchaço e medidas', 'Diminuição da gordura localizada e suavização do aspeto de casca de laranja', 'Luminosidade, desintoxicação dos tecidos e relaxamento profundo'],
        resultsEn: ['Total body renewal with extreme bloating and measurement reduction', 'Reduction in localized fat and smoothing of the orange-peel appearance', 'Radiance, tissue detoxification, and deep relaxation'],
        benefitsPt: ['Drenagem corporal profunda de alta definição', 'Atuação prolongada e intensiva no combate à gordura localizada e celulite'],
        benefitsEn: ['Deep high-definition body drainage', 'Extended and intensive targeting of localized fat and cellulite reduction']
      }
    ]
  },
  {
    id: 'facial-rejuvenation',
    icon: 'Flower2',
    titlePt: 'Tratamento Facial para Rejuvenescimento e hidratação profunda',
    titleEn: 'Facial Treatment for Rejuvenation & Deep Hydration',
    descPt: 'Rituais de massagem e nutrição celular baseados em segredos japoneses para devolver a luminosidade, firmeza e hidratação profunda à sua pele.',
    descEn: 'Massage and cellular nourishment rituals based on Japanese secrets to restore radiance, firmness, and deep hydration to your skin.',
    badgePt: 'Beleza & Revitalização',
    badgeEn: 'Beauty & Revitalization',
    levels: [
      {
        id: 'protocol-30',
        namePt: 'Alívio Rápido',
        nameEn: 'Quick Relief',
        duration: 30,
        price: 40,
        descPt: 'Ritual facial expresso com massagem Kobido e nutrição celular rápida. Devolve o brilho natural e frescura à pele em apenas 30 minutos.',
        descEn: 'Express facial ritual with Kobido massage and quick cellular nourishment. Restores natural glow and freshness to the skin in just 30 minutes.',
        resultsPt: ['Luminosidade instantânea e aspeto descansado', 'Tonificação expressa dos músculos faciais', 'Hidratação rápida de camadas superficiais'],
        resultsEn: ['Instant radiance and rested look', 'Express toning of facial muscles', 'Quick hydration of surface skin layers'],
        benefitsPt: ['Massagem lifting Kobido simplificada', 'Nutrição rápida com extratos naturais orientais'],
        benefitsEn: ['Simplified Kobido lifting massage', 'Quick nourishment with natural Eastern extracts']
      },
      {
        id: 'protocol-60',
        namePt: 'Equilíbrio Profundo',
        nameEn: 'Deep Balance',
        duration: 60,
        price: 70,
        descPt: 'Limpeza de pele Japonesa com ultra som, sem extração, sem peeling químico e sem agredir a pele.',
        descEn: 'Japanese facial cleansing with ultrasound, without extraction, without chemical peeling, and without harming the skin.',
        resultsPt: ['Pele profundamente limpa, desintoxicada e revigorada', 'Textura incrivelmente suave e aspeto purificado', 'Estímulo natural de renovação celular e firmeza'],
        resultsEn: ['Deeply clean, detoxified, and refreshed skin', 'Incredibly smooth texture and purified appearance', 'Natural stimulation of cell renewal and firmness'],
        benefitsPt: ['Limpeza ultrassónica e hidratação profunda da pele', 'Efeito de clareamento suave e um maravilhoso glow na pele'],
        benefitsEn: ['Ultrasonic cleansing and deep skin hydration', 'Gentle brightening effect and a wonderful natural skin glow']
      },
      {
        id: 'protocol-90',
        namePt: 'Experiência Completa',
        nameEn: 'Complete Experience',
        duration: 90,
        price: 90,
        descPt: 'Limpeza de pele Japonesa com ultra som, máscara especial com ativos especiais e head massagem para um tratamento completo.',
        descEn: 'Japanese facial cleansing with ultrasound, special active mask, and integrated head massage for a complete treatment.',
        resultsPt: ['Limpeza ultrassónica profunda aliada a ativos de alta performance', 'Pele incrivelmente rejuvenescida, firme e super hidratada'],
        resultsEn: ['Deep ultrasonic cleansing combined with high-performance active ingredients', 'Incredibly rejuvenated, firm, and deeply hydrated skin'],
        benefitsPt: ['Tratamento ultrassónico completo com ativos especiais e regeneradores', 'Massagem de cabeça (Head Massage) relaxante e estimulante inclusa'],
        benefitsEn: ['Complete ultrasonic treatment with special and regenerating active ingredients', 'Relaxing and stimulating head massage included']
      }
    ]
  }
];

const STATIC_GOOGLE_REVIEWS = {
  rating: 4.8,
  totalReviews: 243,
  link: "https://www.google.com/search?kgmid=/g/1tdq_z_w&hl=pt-PT&q=Nippon+Spa+em+Telheiras&shem=epsd1,ltae,rimspwouoe&shndl=30&source=sh/x/loc/osrp/m5/1&kgs=37813a7ec0896364&utm_source=epsd1,ltae,rimspwouoe,sh/x/loc/osrp/m5/1",
  reviewsPt: [
    {
      author_name: "Margarete Lazaretti",
      rating: 5,
      text: "Uma grata experiência! Gostei muito das técnicas usadas. Saí mais leve e com menos rigidez na lombar! Obrigada!",
      relative_time_description: "Há 3 meses",
      reply: {
        author_name: "Nippon Spa em Telheiras (proprietário)",
        text: "Agradecemos o relato que nos encheu de alegria 🙏✨",
        relative_time_description: "Há 3 meses"
      }
    },
    {
      author_name: "Filipe Carvalho",
      rating: 5,
      text: "Uma experiência simplesmente incrível. Desde o primeiro momento senti um ambiente acolhedor e profissional. A massagem foi realizada com muita técnica, sensibilidade e atenção aos detalhes, conseguindo aliviar completamente a tensão do corpo e da mente. Saí renovado, leve e com uma sensação de bem-estar. Recomendo sem qualquer dúvida",
      relative_time_description: "Há 5 meses",
      reply: {
        author_name: "Nippon Spa em Telheiras (proprietário)",
        text: "Muito obrigado pelas tuas palavras tão completas e generosas! É um enorme prazer saber que sentiste o ambiente acolhedor e profissional que tanto valorizamos no Nipon Spa Japonês Telheiras.\n\nCada massagem é feita com dedicação, técnica e atenção ao detalhe, por isso ficamos felizes por teres saído renovado e em equilíbrio. Esperamos voltar a cuidar de ti em breve. Recomendações como a tua significam muito para nós! 🙏✨",
        relative_time_description: "Há 5 meses"
      }
    },
    {
      author_name: "Maria Rezende",
      rating: 5,
      text: "Foi a 1ª vez e fiquei fã. Entrei com imensas contraturas e dores, acabo de sair leve e sem dores. A Lourdes foi a minha terapeuta, parabéns, excelente trabalho 👏",
      relative_time_description: "Há 5 meses",
      reply: {
        author_name: "Nippon Spa em Telheiras (proprietário)",
        text: "Muito obrigado por partilhares a tua primeira experiência connosco! Saber que saíste do Nipon Spa Japonês Telheiras leve e sem dores deixa-nos mesmo felizes. A Lourdes vai adorar saber que fez a diferença no teu bem-estar. Parabéns a ti também por dares esse passo por ti. Até breve para mais momentos de alívio e relaxamento! 👏✨",
        relative_time_description: "Há 5 meses"
      }
    },
    {
      author_name: "Lourenço De Castro",
      rating: 5,
      text: "Foi uma experiência muito positiva. Depois de ter experimentado já várias técnicas, foi bom saber que tenho uma alternativa nas minhas crises de coluna.",
      relative_time_description: "Há 8 meses",
      reply: {
        author_name: "Nippon Spa em Telheiras (proprietário)",
        text: "Obrigado pela tua partilha! Ficamos muito felizes por saber que encontraste no Nipon Spa Japonês Telheiras uma alternativa eficaz para aliviar as tuas crises de coluna. A nossa equipa dedica-se a oferecer terapias personalizadas com atenção e cuidado. Esperamos voltar a ajudar-te sempre que precisares! 🙏✨",
        relative_time_description: "Há 8 meses"
      }
    },
    {
      author_name: "Ricardo Afonso",
      rating: 5,
      text: "Atendimento 5 estrelas, adorei! Cheguei com fortes dores no joelho esquerdo, estava com dificuldades de caminhar desde o natal e com muito inchaço. Saio do Nipon Terapias Japonesas sem dores e a caminhar normalmente. Recomendo a todos e agradeço a terapeuta Lourdes Souza. Tratamento excelente",
      relative_time_description: "Há 4 meses",
      reply: {
        author_name: "Nippon Spa em Telheiras (proprietário)",
        text: "Muito obrigado por partilhares a tua experiência. Saber que saíste do Nipon Spa Japonês Telheiras sem dores e a caminhar normalmente depois de tanto desconforto deixa-nos profundamente felizes.\n\nA Lourdes Souza agradece de coração o teu reconhecimento. Tratamentos como este mostram o poder das terapias japonesas quando são feitas com dedicação e conhecimento. Ficamos à tua espera sempre que precisares de cuidar de ti! 🙏✨",
        relative_time_description: "Há 4 meses"
      }
    }
  ],
  reviewsEn: [
    {
      author_name: "Margarete Lazaretti",
      rating: 5,
      text: "A very pleasant experience! I really liked the techniques used. I left feeling lighter and with less stiffness in my lower back! Thank you!",
      relative_time_description: "3 months ago",
      reply: {
        author_name: "Nippon Spa em Telheiras (owner)",
        text: "We thank you for the feedback that filled us with joy 🙏✨",
        relative_time_description: "3 months ago"
      }
    },
    {
      author_name: "Filipe Carvalho",
      rating: 5,
      text: "A simply incredible experience. From the very first moment I felt a welcoming and professional atmosphere. The massage was performed with great technique, sensitivity, and attention to detail, managing to completely relieve the tension of body and mind. I left renewed, light, and with a sense of well-being. I recommend it without any doubt.",
      relative_time_description: "5 months ago",
      reply: {
        author_name: "Nippon Spa em Telheiras (owner)",
        text: "Thank you very much for your complete and generous words! It is a huge pleasure to know that you felt the welcoming and professional environment we value so much at Nipon Spa Japonês Telheiras.\n\nEach massage is done with dedication, technique, and attention to detail, so we are happy you left feeling renewed and in balance. We hope to take care of you again soon. Recommendations like yours mean a lot to us! 🙏✨",
        relative_time_description: "5 months ago"
      }
    },
    {
      author_name: "Maria Rezende",
      rating: 5,
      text: "It was my first time and I became a fan. I entered with a lot of contractures and pain, and I just left feeling light and pain-free. Lourdes was my therapist, congratulations, excellent work 👏",
      relative_time_description: "5 months ago",
      reply: {
        author_name: "Nippon Spa em Telheiras (owner)",
        text: "Thank you so much for sharing your first experience with us! Knowing that you left Nipon Spa Japonês Telheiras light and pain-free makes us truly happy. Lourdes will love to know she made a difference in your well-being. Congratulations to you as well for taking this step for yourself. See you soon for more moments of relief and relaxation! 👏✨",
        relative_time_description: "5 months ago"
      }
    },
    {
      author_name: "Lourenço De Castro",
      rating: 5,
      text: "It was a very positive experience. After having tried several techniques, it was good to know that I have an alternative for my back pain crises.",
      relative_time_description: "8 months ago",
      reply: {
        author_name: "Nippon Spa em Telheiras (owner)",
        text: "Thank you for sharing! We are very happy to know that you found at Nipon Spa Japonês Telheiras an effective alternative to relieve your back pain crises. Our team is dedicated to offering personalized therapies with care and attention. We hope to help you again whenever you need! 🙏✨",
        relative_time_description: "8 months ago"
      }
    },
    {
      author_name: "Ricardo Afonso",
      rating: 5,
      text: "5-star service, loved it! I arrived with severe pain in my left knee, had difficulties walking since Christmas and a lot of swelling. I leave Nipon Terapias Japonesas without pain and walking normally. I recommend it to everyone and thank therapist Lourdes Souza. Excellent treatment.",
      relative_time_description: "4 months ago",
      reply: {
        author_name: "Nippon Spa em Telheiras (owner)",
        text: "Thank you so much for sharing your experience. Knowing that you left Nipon Spa Japonês Telheiras without pain and walking normally after so much discomfort makes us deeply happy.\n\nLourdes Souza from the bottom of her heart thanks you for your recognition. Treatments like this show the power of Japanese therapies when done with dedication and knowledge. We look forward to seeing you whenever you need to take care of yourself! 🙏✨",
        relative_time_description: "4 months ago"
      }
    }
  ]
};

export default function App() {
  // Local states
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeConsultantNeed, setActiveConsultantNeed] = useState<string | null>(null);
  const [themeMode, setThemeMode] = useState<'red' | 'bw'>('bw');

  interface GoogleReview {
    author_name: string;
    rating: number;
    text: string;
    relative_time_description: string;
    profile_photo_url?: string;
    reply?: {
      author_name: string;
      text: string;
      relative_time_description: string;
    };
  }

  interface GoogleReviewsData {
    place_id: string;
    name: string;
    rating: number;
    user_ratings_total: number;
    reviews: GoogleReview[];
    is_mock: boolean;
  }

  const [googleReviews, setGoogleReviews] = useState<GoogleReviewsData | null>(null);
  const [googleReviewsLoading, setGoogleReviewsLoading] = useState<boolean>(true);


  const [currentVideo, setCurrentVideo] = useState<string>(() => {
    const saved = localStorage.getItem('nipon_spa_bg_video');
    if (saved && (saved.includes('youtube') || saved.includes('youtu.be'))) {
      return saved;
    }
    return 'https://www.youtube.com/watch?v=AY5qcIq5u2g';
  });

  const t = TRANSLATIONS[lang];

  // Translation helpers for therapies dynamically
  const getTherapyName = (therapy: Therapy) => lang === 'pt' ? therapy.name : (therapy.nameEn || therapy.name);
  const getTherapyDesc = (therapy: Therapy) => lang === 'pt' ? therapy.description : (therapy.descriptionEn || therapy.description);
  const getTherapyBenefits = (therapy: Therapy) => lang === 'pt' ? therapy.benefits : (therapy.benefitsEn || therapy.benefits);
  
  // Multi-step booking state
  const [bookingTherapy, setBookingTherapy] = useState<Therapy>(THERAPIES[0]);
  const [selectedDate, setSelectedDate] = useState<string>(''); // YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mbway');
  
  // Simulated Card State
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCVV, setCardCVV] = useState<string>('');
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  
  // Verification / Simulation statuses
  const [bookingStep, setBookingStep] = useState<number>(1); // 1: Schedule, 2: Customer Info, 3: Payment, 4: Confirmed
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentCountdown, setPaymentCountdown] = useState<number>(20);
  const [generatedRef, setGeneratedRef] = useState<{ entity: string; reference: string; value: string } | null>(null);
  const [mbWayApproved, setMbWayApproved] = useState<boolean>(false);
  
  // Custom Reviews State
  const [reviewAuthor, setReviewAuthor] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewService, setReviewService] = useState<string>(THERAPIES[0].name);
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState<string>('');
  const [aboutActiveStep, setAboutActiveStep] = useState<number>(0);

  // Blog states
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [blogEmail, setBlogEmail] = useState<string>('');
  const [blogSubscribed, setBlogSubscribed] = useState<boolean>(false);

  // Focus selection state for showing the 3 tailored levels with explanation and price
  const [selectedFocusArea, setSelectedFocusArea] = useState<{
    id: string;
    titlePt: string;
    titleEn: string;
    descPt: string;
    descEn: string;
    badgePt: string;
    badgeEn: string;
  } | null>(null);

  // Notification notification bar
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Staff Portal states
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('nipon_staff_auth') === 'true';
  });
  const [staffUsername, setStaffUsername] = useState<string>('');
  const [staffPassword, setStaffPassword] = useState<string>('');
  const [staffError, setStaffError] = useState<string>('');
  
  // Dashboard management and filters
  const [staffSearchQuery, setStaffSearchQuery] = useState<string>('');
  const [staffStatusFilter, setStaffStatusFilter] = useState<'all' | 'paid' | 'pending'>('all');
  const [staffTherapyFilter, setStaffTherapyFilter] = useState<string>('all');
  
  // Edit reservation inline state
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [editingBookingDate, setEditingBookingDate] = useState<string>('');
  const [editingBookingTime, setEditingBookingTime] = useState<string>('');

  // Manual fast booking creation modal/panel state
  const [isAddingManualBooking, setIsAddingManualBooking] = useState<boolean>(false);
  const [manualCustName, setManualCustName] = useState<string>('');
  const [manualCustEmail, setManualCustEmail] = useState<string>('');
  const [manualCustPhone, setManualCustPhone] = useState<string>('');
  const [manualSpecialNotes, setManualSpecialNotes] = useState<string>('');
  const [manualTherapyId, setManualTherapyId] = useState<string>(THERAPIES[0].id);
  const [manualDate, setManualDate] = useState<string>('2026-06-15');
  const [manualTime, setManualTime] = useState<string>('10:00');
  const [manualIsPaid, setManualIsPaid] = useState<boolean>(true);
  const [manualPaymentMethod, setManualPaymentMethod] = useState<PaymentMethod>('card');

  // Staff log-in and log-out handler functions
  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((staffUsername.trim().toLowerCase() === 'staff' || staffUsername.trim().toLowerCase() === 'admin') && staffPassword === 'nipon2026') {
      setIsStaffLoggedIn(true);
      setStaffError('');
      localStorage.setItem('nipon_staff_auth', 'true');
    } else {
      setStaffError(lang === 'pt' ? 'Credenciais incorretas.' : 'Incorrect credentials.');
    }
  };

  const handleStaffLogout = () => {
    setIsStaffLoggedIn(false);
    setStaffUsername('');
    setStaffPassword('');
    localStorage.removeItem('nipon_staff_auth');
    setActiveTab('home');
  };

  // Video programmatic autoplay helpers
  const videoRef = useRef<HTMLVideoElement>(null);

  // Zen sound effects for title hover
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const bubbleTimerRef = useRef<number | null>(null);
  const fadeTimeoutRef = useRef<number | null>(null);

  const createNoiseBuffer = (ctx: AudioContext) => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  };

  const stopImmediateNodes = () => {
    if (bubbleTimerRef.current) {
      window.clearTimeout(bubbleTimerRef.current);
      bubbleTimerRef.current = null;
    }
    if (noiseSourceRef.current) {
      try { noiseSourceRef.current.stop(); } catch(e) {}
      noiseSourceRef.current = null;
    }
    if (lfoRef.current) {
      try { lfoRef.current.stop(); } catch(e) {}
      lfoRef.current = null;
    }
    filterNodeRef.current = null;
  };

  const startZenSound = () => {
    try {
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = null;
      }

      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // If already playing, fade it back up softly without re-triggering new nodes
      if (mainGainRef.current && noiseSourceRef.current) {
        mainGainRef.current.gain.cancelScheduledValues(now);
        mainGainRef.current.gain.setValueAtTime(mainGainRef.current.gain.value, now);
        mainGainRef.current.gain.linearRampToValueAtTime(0.20, now + 1.2);
        return;
      }

      // Cleanup any previous nodes
      stopImmediateNodes();

      // Master Gain Node for the background waterfall/stream flow
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0, now);
      mainGain.connect(ctx.destination);
      mainGainRef.current = mainGain;

      // Create white noise source for water rush
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx);
      noise.loop = true;
      noiseSourceRef.current = noise;

      // Filter to shape raw white noise into soothing flowing water
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      // Wet rumble around 320Hz, bandwidth (Q) of 1.2
      filter.frequency.setValueAtTime(320, now);
      filter.Q.setValueAtTime(1.2, now);
      filterNodeRef.current = filter;

      // Highpass filter to cut muddy low-end frequencies below 140Hz
      const lowCut = ctx.createBiquadFilter();
      lowCut.type = 'highpass';
      lowCut.frequency.setValueAtTime(140, now);

      // Connect noise -> bandpass -> highpass -> mainGain
      noise.connect(filter);
      filter.connect(lowCut);
      lowCut.connect(mainGain);

      // Create an LFO to modulate filter frequency slowly (the flowing movement of a creek)
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.18, now); // 0.18 Hz is an ultra slow wave

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(110, now); // oscillate by 110Hz above/below 320Hz

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      lfo.start(now);
      lfoRef.current = lfo;
      noise.start(now);

      // Fade in the background flow gently
      mainGain.gain.linearRampToValueAtTime(0.20, now + 1.0);

      // Bubbles & splashing droplets generation loop
      const triggerBubble = () => {
        if (!audioCtxRef.current || !mainGainRef.current) return;
        const currentCtx = audioCtxRef.current;
        const bNow = currentCtx.currentTime;

        try {
          // Generate a rapid frequency-sweeping sine burst that mimics a wet water droplet
          const osc = currentCtx.createOscillator();
          const oscGain = currentCtx.createGain();
          
          osc.type = 'sine';
          
          // Random base frequency for the bubble drop (750Hz to 1550Hz sounds super real!)
          const baseFreq = 750 + Math.random() * 800;
          
          osc.frequency.setValueAtTime(baseFreq, bNow);
          // Rise pitch up slightly as bubble releases
          osc.frequency.exponentialRampToValueAtTime(baseFreq * (1.12 + Math.random() * 0.12), bNow + 0.15);

          // Very fast envelope (attack, decay)
          oscGain.gain.setValueAtTime(0, bNow);
          const peakVal = 0.05 + Math.random() * 0.06;
          oscGain.gain.linearRampToValueAtTime(peakVal, bNow + 0.015);
          oscGain.gain.exponentialRampToValueAtTime(0.0001, bNow + 0.18);

          // Connect to mainGain
          osc.connect(oscGain);
          oscGain.connect(mainGainRef.current);

          osc.start(bNow);
          osc.stop(bNow + 0.22);
        } catch (e) {}

        // Schedule next bubble with organic, dynamic intervals
        const nextInterval = 60 + Math.random() * 180; // every 60ms to 240ms
        bubbleTimerRef.current = window.setTimeout(triggerBubble, nextInterval);
      };

      // Start the bubble scheduler
      triggerBubble();

    } catch (err) {
      console.warn("Failed to trigger Zen stream audio:", err);
    }
  };

  const stopZenSound = () => {
    const ctx = audioCtxRef.current;
    const mainGain = mainGainRef.current;
    if (!ctx || !mainGain) return;

    try {
      const now = ctx.currentTime;
      mainGain.gain.cancelScheduledValues(now);
      mainGain.gain.setValueAtTime(mainGain.gain.value, now);
      
      // Soothing lingering 2.2s fade out
      mainGain.gain.linearRampToValueAtTime(0, now + 2.2);

      fadeTimeoutRef.current = window.setTimeout(() => {
        stopImmediateNodes();
        mainGainRef.current = null;
      }, 2300);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
      if (bubbleTimerRef.current) {
        window.clearTimeout(bubbleTimerRef.current);
      }
      try {
        stopImmediateNodes();
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
        }
      } catch (e) {}
    };
  }, []);

  useEffect(() => {
    if (activeTab === 'home' && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Video playback was delayed or prevented:", error);
        });
      }
    }
  }, [activeTab]);

  // Synchronize URL path & hash with state-driven tabs for robust direct access
  useEffect(() => {
    const handleUrlSync = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      
      const isReservar = path === '/reservar' || hash === '#/reservar' || hash === '#reservar';
      
      if (isReservar) {
        setActiveTab('reservar');
      } else {
        // Fallback checks for both path segment and hash segment
        const possibleTabFromPath = path.slice(1);
        const possibleTabFromHash = hash.replace(/^#\/?/, '');
        
        const validTabs = ['home', 'about', 'therapies', 'blog', 'staff-portal', 'bookings', 'reservar', 'reviews', 'gallery'];
        
        if (validTabs.includes(possibleTabFromHash)) {
          setActiveTab(possibleTabFromHash);
        } else if (validTabs.includes(possibleTabFromPath)) {
          setActiveTab(possibleTabFromPath);
        } else {
          setActiveTab('home');
        }
      }
    };

    // Initial parsing on mount
    handleUrlSync();

    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);
    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, []);

  // Synchronize activeTab state to the browser URL pathname (and hash fallback) for direct addressability
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    const targetPath = activeTab === 'reservar' ? '/reservar' : (activeTab === 'home' ? '/' : `/${activeTab}`);
    
    // Smooth state push
    if (currentPath !== targetPath) {
      try {
        window.history.pushState(null, '', targetPath);
      } catch (e) {
        // Fallback to hash routing if history pushState fails or is disallowed in sandboxes
        const targetHash = `#/${activeTab}`;
        if (currentHash !== targetHash) {
          window.location.hash = targetHash;
        }
      }
    }
  }, [activeTab]);

  useEffect(() => {
    setGoogleReviewsLoading(true);
    
    const fallbackReviews_pt = [
      {
        author_name: "Mariana Silva",
        rating: 5,
        text: "Uma experiência absolutamente divina. Senti uma paz inexplicável e o atendimento Omotenashi é real e reconfortante.",
        relative_time_description: "Há uma semana",
        profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80"
      },
      {
        author_name: "João Pereira",
        rating: 5,
        text: "Massagem Shiatsu impecável. O terapeuta foi extremamente cuidadoso com as minhas dores nas costas e senti alívio imediato no final.",
        relative_time_description: "Há 2 semanas",
        profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80"
      },
      {
        author_name: "Sofia Santos",
        rating: 5,
        text: "O ritual do chá matcha de encerramento é sublime e a sala aquecida com cheiro a yuzu transportou-me para Quioto.",
        relative_time_description: "Há um mês",
        profile_photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80"
      },
      {
        author_name: "Beatriz Costa",
        rating: 5,
        text: "O Zen Head Spa é simplesmente viciante! O tratamento com vapor, óleos quentes no cabelo e a reflexologia facial fizeram-me dormir a meio do serviço. Excelente oferta e o chá verde no final de porcelana é maravilhoso.",
        relative_time_description: "Há 2 meses",
        profile_photo_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&q=80"
      },
      {
        author_name: "Cláudia Vasconcelos",
        rating: 5,
        text: "Uma autêntica viagem ao Japão sem sair de Lisboa! O Ritual Sakura&Chá de Matcha deixou a minha pele divinal. O espaço cheira a madeira de Hinoki quente e a massagem foi divinal, com muita dedicação. Vou voltar no próximo mês.",
        relative_time_description: "Há 3 meses",
        profile_photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80"
      }
    ];

    const fallbackReviews_en = [
      {
        author_name: "Mariana Silva",
        rating: 5,
        text: "An absolutely divine experience. I felt an inexplicable peace, and the Omotenashi service is real and comforting.",
        relative_time_description: "A week ago",
        profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80"
      },
      {
        author_name: "João Pereira",
        rating: 5,
        text: "Impeccable Shiatsu massage. The therapist was extremely careful with my back pain, and I felt immediate relief in the end.",
        relative_time_description: "2 weeks ago",
        profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80"
      },
      {
        author_name: "Sofia Santos",
        rating: 5,
        text: "The closing matcha tea ritual is sublime, and the heated room smelling of yuzu transported me straight to Kyoto.",
        relative_time_description: "A month ago",
        profile_photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80"
      },
      {
        author_name: "Beatriz Costa",
        rating: 5,
        text: "The Zen Head Spa is simply addictive! The steam treatment, hot oils on hair and the facial reflexology made me fall asleep mid-service. Excellent service and the green tea at the end in porcelain is wonderful.",
        relative_time_description: "2 months ago",
        profile_photo_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&q=80"
      },
      {
        author_name: "Cláudia Vasconcelos",
        rating: 5,
        text: "An authentic journey to Japan without leaving Lisbon! The Ritual Sakura & Chá de Matcha left my skin divine. The space smells of warm Hinoki wood and the massage was divine, with a lot of dedication. I will return next month.",
        relative_time_description: "3 months ago",
        profile_photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80"
      }
    ];

    const clientFallback: GoogleReviewsData = {
      place_id: "ChIJoYDJpv09kw0RgA_UBAmKQRs",
      name: "Nipon Spa Telheiras",
      rating: 4.8,
      user_ratings_total: 243,
      reviews: lang === "pt" ? fallbackReviews_pt : fallbackReviews_en,
      is_mock: false
    };

    fetch(`/api/google-reviews?lang=${lang}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`API returned HTTP ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data && data.reviews) {
          setGoogleReviews(data);
        } else {
          setGoogleReviews(clientFallback);
        }
        setGoogleReviewsLoading(false);
      })
      .catch(err => {
        console.warn("Using high-quality client-side reviews fallback:", err);
        setGoogleReviews(clientFallback);
        setGoogleReviewsLoading(false);
      });
  }, [lang]);

  // Load from local storage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('nipon_spa_bookings');
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (e) {
        console.error("Error parsing saved bookings");
      }
    } else {
      // Dynamic initial setup with one demo booking for illustration
      const demoBooking: Booking = {
        id: 'bk-demo',
        therapyId: 'protocol-90',
        dateTime: '2026-06-12T14:00:00Z',
        date: '2026-06-12',
        time: '14:00',
        customerName: 'Yuki Sato',
        customerEmail: 'yuki.sato@example.com',
        customerPhone: '912 345 678',
        isPaid: true,
        paymentMethod: 'card',
        paymentReference: { cardNumberLast4: '4321' },
        createdAt: '2026-06-09T18:30:00Z'
      };
      setBookings([demoBooking]);
      localStorage.setItem('nipon_spa_bookings', JSON.stringify([demoBooking]));
    }

    const savedReviews = localStorage.getItem('nipon_spa_reviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (e) {
        console.error("Error parsing saved reviews");
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('nipon_spa_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  // Sync bookings to localStorage
  const saveBookingsState = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('nipon_spa_bookings', JSON.stringify(newBookings));
  };

  // Generate date options starting from June 10, 2026 for 14 available days
  const getAvailableDates = () => {
    const dates = [];
    const baseDate = new Date(BASE_DATE_STR);
    
    for (let i = 0; i < 14; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      // Weekdays and weekends labels
      const weekdayOptions: {[key: number]: string} = {
        0: 'Domingo', 1: 'Segunda', 2: 'Terça', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta', 6: 'Sábado'
      };
      
      dates.push({
        dateString,
        dayNum: day,
        monthName: d.toLocaleString('pt-PT', { month: 'short' }).toUpperCase().replace('.', ''),
        weekday: weekdayOptions[d.getDay()],
        rawDate: d
      });
    }
    return dates;
  };

  const datesList = getAvailableDates();

  // Start booking wizard (now pointing to the new integrated DOC.pt booking page)
  const handleOpenBooking = (therapy?: Therapy) => {
    if (therapy) {
      setBookingTherapy(therapy);
    }
    setActiveTab('reservar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Change date and automatically adjust available time slot
  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
    const slots = generateAvailableSlots(dateStr);
    setSelectedTime(slots[0] || '');
  };

  // Step 1 to Step 2
  const handleConfirmDateTime = () => {
    if (!selectedDate || !selectedTime) return;
    setBookingStep(2);
  };

  // Step 2 to Step 3
  const handleConfirmCustomerDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) return;
    
    // If Multibanco is chosen, compute reference immediately
    if (paymentMethod === 'multibanco' && bookingTherapy) {
      setGeneratedRef(generateMockReference(bookingTherapy.price));
    }
    setBookingStep(3);
  };

  // Start checkout sequence timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (bookingStep === 3 && paymentMethod === 'mbway' && isProcessingPayment && paymentCountdown > 0) {
      timer = setTimeout(() => {
        setPaymentCountdown(prev => prev - 1);
      }, 1000);
    } else if (paymentCountdown === 0 && isProcessingPayment) {
      setIsProcessingPayment(false);
      // Auto-decline if zero reached without approval
    }
    return () => clearTimeout(timer);
  }, [bookingStep, paymentMethod, isProcessingPayment, paymentCountdown]);

  // Handle MBWay Trigger
  const handleTriggerMBWayPay = () => {
    setIsProcessingPayment(true);
    setPaymentCountdown(45);
    setMbWayApproved(false);
  };

  // Approve MBWay
  const handleSimulateMBWayApprove = () => {
    setMbWayApproved(true);
    setIsProcessingPayment(false);
    
    // Complete booking object
    setTimeout(() => {
      finalizeBooking();
    }, 600);
  };

  // Finalize booking writes to state and localStorage
  const finalizeBooking = () => {
    // Technical fallback guard
    alert(lang === 'pt' 
      ? 'De momento, os agendamentos online e pagamentos automáticos encontram-se bloqueados pois o site está sob construção.' 
      : 'At this moment, online scheduling and automated payments are blocked because the website is under construction.');
    return;

    if (!bookingTherapy) return;

    const newBooking: Booking = {
      id: 'bk-' + Math.floor(100000 + Math.random() * 900000),
      therapyId: bookingTherapy.id,
      dateTime: `${selectedDate}T${selectedTime}:00Z`,
      date: selectedDate,
      time: selectedTime,
      customerName,
      customerEmail,
      customerPhone,
      specialNotes,
      isPaid: true,
      paymentMethod,
      paymentReference: paymentMethod === 'mbway' 
        ? { phone: customerPhone } 
        : paymentMethod === 'multibanco' 
          ? { entity: generatedRef?.entity, reference: generatedRef?.reference }
          : { cardNumberLast4: cardNumber.slice(-4) || '1111' },
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...bookings];
    saveBookingsState(updated);
    setBookingStep(4);
  };

  // Delete/Cancel booking
  const handleCancelBooking = (id: string) => {
    if (window.confirm("Deseja realmente cancelar esta marcação terapêutica?")) {
      const filtered = bookings.filter(b => b.id !== id);
      saveBookingsState(filtered);
    }
  };

  // Review submission
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    const newReview: Review = {
      id: 'rev-' + Date.now(),
      author: reviewAuthor,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString().split('T')[0],
      serviceReceived: reviewService
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('nipon_spa_reviews', JSON.stringify(updated));

    // Reset fields
    setReviewAuthor('');
    setReviewComment('');
    setReviewSuccessMessage('Obrigado! A sua avaliação tradicional foi publicada com sucesso.');
    setTimeout(() => setReviewSuccessMessage(''), 5000);
  };

  const copyRefToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Filtered therapy catalog
  const filteredTherapies = THERAPIES.filter(t => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  return (
    <div className={`min-h-screen bg-brand-black text-gray-200 selection:bg-brand-red selection:text-white relative overflow-hidden japanese-grid-overlay ${themeMode === 'bw' ? 'theme-bw' : ''}`}>
      
      {/* Decorative incense/glow red spheres */}
      <div className="absolute top-20 left-[-10%] w-[220px] h-[220px] rounded-full bg-brand-red/[0.03] blur-[150px] pointer-events-none breathing-glow-accent"></div>
      <div className="absolute bottom-40 right-[-10%] w-[240px] h-[240px] rounded-full bg-brand-gold/[0.02] blur-[160px] pointer-events-none"></div>

      {/* Floating Top Header */}
      <header className="sticky top-0 z-40 bg-brand-black/95 backdrop-blur-md border-b border-brand-border/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Shinto Emblem */}
            <div className="flex items-center cursor-pointer" onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <NiponLogo layout="horizontal" circleSize={40} inverse={true} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 text-xs font-semibold tracking-widest uppercase h-full items-center relative">
              <button 
                onClick={() => { setActiveTab('about'); }}
                className={`transition duration-250 py-2 relative h-full flex items-center ${activeTab === 'about' ? 'text-brand-red font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                {t.navAbout}
                {activeTab === 'about' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red rounded-full animate-fade-in"></span>
                )}
              </button>
              <button 
                onClick={() => { setActiveTab('therapies'); setSelectedCategory('all'); }}
                className={`transition duration-250 py-2 relative h-full flex items-center ${activeTab === 'therapies' ? 'text-brand-red font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                {t.navTreatments}
                {activeTab === 'therapies' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red rounded-full animate-fade-in"></span>
                )}
              </button>
              <button 
                onClick={() => { setActiveTab('gallery'); }}
                className={`transition duration-250 py-2 relative h-full flex items-center ${activeTab === 'gallery' ? 'text-brand-red font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                {t.navGallery}
                {activeTab === 'gallery' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red rounded-full animate-fade-in"></span>
                )}
              </button>
              <button 
                onClick={() => { setActiveTab('reviews'); }}
                className={`transition duration-250 py-2 relative h-full flex items-center ${activeTab === 'reviews' ? 'text-brand-red font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                {t.navReviews}
                {activeTab === 'reviews' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red rounded-full animate-fade-in"></span>
                )}
              </button>
              <button 
                onClick={() => { setActiveTab('blog'); setSelectedBlogPost(null); }}
                className={`transition duration-250 py-2 relative h-full flex items-center ${activeTab === 'blog' ? 'text-brand-red font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                {t.navBlog}
                {activeTab === 'blog' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red rounded-full animate-fade-in"></span>
                )}
              </button>
            </nav>

            {/* Header Contacts & CTA */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6">
              {/* Language Selector */}
              <div className="flex items-center space-x-1 p-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold tracking-widest uppercase">
                <button 
                  onClick={() => setLang('pt')}
                  className={`px-1.5 sm:px-2 py-0.5 rounded-full cursor-pointer transition ${lang === 'pt' ? 'bg-[#cc0000] text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  PT
                </button>
                <button 
                  onClick={() => setLang('en')}
                  className={`px-1.5 sm:px-2 py-0.5 rounded-full cursor-pointer transition ${lang === 'en' ? 'bg-[#cc0000] text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  EN
                </button>
              </div>



              {/* Staff Portal Lock Button */}
              <button 
                onClick={() => { setActiveTab('staff-portal'); }} 
                className={`border text-[10px] font-bold uppercase tracking-widest transition-all duration-300 relative rounded-full p-2.5 cursor-pointer ${
                  activeTab === 'staff-portal'
                    ? 'border-[#cc0000] bg-[#cc0000]/10 text-brand-red'
                    : 'border-white/10 hover:bg-white/10 text-gray-400 hover:text-white'
                }`}
                title={lang === 'pt' ? 'Área do Trabalhador' : 'Staff Workspace'}
              >
                <LogIn className="w-3.5 h-3.5" />
                {isStaffLoggedIn && (
                  <span className="absolute -top-1 -right-1 bg-green-500 w-2.5 h-2.5 rounded-full ring-2 ring-brand-black"></span>
                )}
              </button>

              {/* Primary Reservar Button */}
              <button 
                onClick={() => { setActiveTab('reservar'); }} 
                className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 relative rounded-full border ${
                  activeTab === 'reservar'
                    ? 'bg-[#cc0000] border-[#cc0000] text-white shadow-lg shadow-[#cc0000]/15'
                    : 'border-brand-red bg-brand-red text-white hover:bg-brand-red-hover hover:border-brand-red-hover'
                }`}
              >
                {t.navBookRitual}
              </button>

              {/* Mobile Hamburger Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition cursor-pointer"
                aria-label="Open menu"
                id="mobile-menu-btn"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-brand-black/95 backdrop-blur-md flex flex-col p-6 md:hidden overflow-y-auto">
            {/* Header of Drawer */}
            <div className="flex items-center justify-between pb-8 border-b border-brand-border/60">
              <div onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <NiponLogo layout="horizontal" circleSize={36} inverse={true} />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 text-gray-400 hover:text-white flex items-center justify-center transition border border-brand-border cursor-pointer"
                id="close-mobile-menu-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links inside drawer */}
            <div className="flex-1 flex flex-col justify-center space-y-6 py-6 text-center">
              <button 
                onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }}
                className={`text-lg font-bold tracking-widest uppercase transition duration-200 ${activeTab === 'about' ? 'text-brand-red font-extrabold' : 'text-gray-400 hover:text-white'}`}
              >
                {t.navAbout}
              </button>
              <button 
                onClick={() => { setActiveTab('therapies'); setSelectedCategory('all'); setIsMobileMenuOpen(false); }}
                className={`text-lg font-bold tracking-widest uppercase transition duration-200 ${activeTab === 'therapies' ? 'text-brand-red font-extrabold' : 'text-gray-400 hover:text-white'}`}
              >
                {t.navTreatments}
              </button>
              <button 
                onClick={() => { setActiveTab('gallery'); setIsMobileMenuOpen(false); }}
                className={`text-lg font-bold tracking-widest uppercase transition duration-200 ${activeTab === 'gallery' ? 'text-brand-red font-extrabold' : 'text-gray-400 hover:text-white'}`}
              >
                {t.navGallery}
              </button>
              <button 
                onClick={() => { setActiveTab('reviews'); setIsMobileMenuOpen(false); }}
                className={`text-lg font-bold tracking-widest uppercase transition duration-200 ${activeTab === 'reviews' ? 'text-brand-red font-extrabold' : 'text-gray-400 hover:text-white'}`}
              >
                {t.navReviews}
              </button>
              <button 
                onClick={() => { setActiveTab('blog'); setSelectedBlogPost(null); setIsMobileMenuOpen(false); }}
                className={`text-lg font-bold tracking-widest uppercase transition duration-200 ${activeTab === 'blog' ? 'text-brand-red font-extrabold' : 'text-gray-400 hover:text-white'}`}
              >
                {t.navBlog}
              </button>
              <button 
                onClick={() => { setActiveTab('reservar'); setIsMobileMenuOpen(false); }}
                className="text-lg font-extrabold tracking-widest uppercase py-2.5 px-6 rounded-full border border-brand-red bg-brand-red text-white hover:bg-[#cc0000] transition duration-200"
              >
                {t.navBookRitual}
              </button>
            </div>

            {/* Language and theme quick selectors within Drawer */}
            <div className="border-t border-brand-border/60 pt-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-gray-500 font-mono">Idioma / Language</span>
                <div className="flex items-center space-x-1 p-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold tracking-widest uppercase">
                  <button 
                    onClick={() => { setLang('pt'); }}
                    className={`px-3 py-1.5 rounded-[2px] cursor-pointer transition ${lang === 'pt' ? 'bg-brand-red text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    PT
                  </button>
                  <button 
                    onClick={() => { setLang('en'); }}
                    className={`px-3 py-1.5 rounded-[2px] cursor-pointer transition ${lang === 'en' ? 'bg-brand-red text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    EN
                  </button>
                </div>
              </div>


            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="pb-24">
        
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-24">
            
            {/* Hero Banner Section */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
              {/* Background cover video with image poster fallback */}
              <div className="absolute inset-0 z-0">
                {currentVideo.includes('youtube.com') || currentVideo.includes('youtu.be') ? (
                  <div 
                    className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-brand-black bg-cover bg-center"
                    style={{ backgroundImage: `url(${spaHeroImg})` }}
                  >
                    <iframe
                      src={getYouTubeEmbedUrl(currentVideo)}
                      title="Japanese Nature Ambient"
                      className="absolute top-1/2 left-1/2 w-[177.77777778vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 opacity-35 scale-110 pointer-events-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      frameBorder="0"
                    />
                  </div>
                ) : (
                  <video 
                    key={currentVideo}
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    poster={spaHeroImg}
                    className="w-full h-full object-cover object-center opacity-40 transition-opacity duration-1000"
                  >
                    <source src={currentVideo} type="video/mp4" />
                  </video>
                )}
                {/* Master gradients overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-brand-black/40"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center w-full">
                {/* Centered Headline with elegant typography hierarchy */}
                <motion.h1 
                  className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.15] text-white max-w-5xl mx-auto mb-6 select-none cursor-default"
                  whileHover="hover"
                  initial="initial"
                  onMouseEnter={startZenSound}
                  onMouseLeave={stopZenSound}
                >
                  {lang === 'pt' ? (
                    <>
                      Há 22 anos a ajudar Lisboa a viver <motion.span 
                        className="text-[#cc0000] italic font-serif font-semibold lowercase tracking-normal inline-block"
                        variants={{
                          initial: { scale: 1 },
                          hover: { scale: 1.05, filter: "drop-shadow(0 0 15px rgba(204,0,0,0.5))" }
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >sem dores</motion.span> e sem tensão.
                    </>
                  ) : (
                    <>
                      Helping Lisbon live <motion.span 
                        className="text-[#cc0000] italic font-serif font-semibold lowercase tracking-normal inline-block"
                        variants={{
                          initial: { scale: 1 },
                          hover: { scale: 1.05, filter: "drop-shadow(0 0 15px rgba(204,0,0,0.5))" }
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >without pain</motion.span> and tension for 22 years.
                    </>
                  )}
                </motion.h1>

                {/* Centered high quality description styled as a premium highly-readable subtitle */}
                <p className="text-sm sm:text-base text-gray-300 font-sans max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
                  {lang === 'pt' ? (
                    <>
                      Tratamentos personalizados inspirados na tradição japonesa.
                      <br />
                      Não acreditamos em tratamentos iguais para todos!
                      <br />
                      Cada protocolo é cuidadosamente adaptado às necessidades do seu corpo.
                    </>
                  ) : (
                    <>
                      Personalized treatments inspired by Japanese tradition.
                      <br />
                      We do not believe in one-size-fits-all treatments!
                      <br />
                      Each protocol is carefully adapted to the unique needs of your body.
                    </>
                  )}
                </p>

                {/* Centered CTAs with sharp borders matching the styling of Nipon Spa exactly */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <button 
                    onClick={() => {
                      setActiveTab('reservar');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto bg-[#cc0000] hover:bg-brand-red-hover text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300"
                  >
                    {t.btnBookNow}
                  </button>
                  
                  <button 
                    onClick={() => {
                      setActiveTab('therapies');
                      setSelectedCategory('all');
                      setTimeout(() => {
                        const elem = document.getElementById('catalog-element');
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="w-full sm:w-auto hover:bg-white/5 hover:text-white text-gray-300 border border-white/10 px-8 py-3.5 rounded-full font-semibold uppercase tracking-widest text-xs transition duration-200 bg-brand-black/30"
                  >
                    {t.btnViewTreatments}
                  </button>
                </div>

                {/* Micro info badges below */}
                <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-red" />
                    <span>{t.heroBadgeLocation}</span>
                  </span>
                  <span className="text-brand-gold">•</span>
                  <span className="flex items-center space-x-1.5">
                    <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                    <span>{t.heroBadgeReviews}</span>
                  </span>
                </div>
              </div>

              {/* Minimalist animated Scroll Down Indicator */}
              <div 
                onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight * 0.82,
                    behavior: 'smooth'
                  });
                }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-10 group"
              >
                <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-gray-400 group-hover:text-brand-red transition duration-300 mb-1 select-none">
                  {lang === 'pt' ? 'Rolar para baixo' : 'Scroll down'}
                </span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="text-gray-400 group-hover:text-brand-red transition duration-300"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </div>
            </section>





            {/* Focus of Treatment Section (Main Highlight) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-xl mx-auto space-y-3">
                <span className="text-[#cc0000] font-mono font-bold text-[10px] uppercase tracking-widest block">
                  {lang === 'pt' ? 'Programas Focados em Resultados' : 'Result-Focused Programs'}
                </span>
                <h3 className="text-3xl md:text-4xl font-light text-white font-heading tracking-tight leading-tight">
                  {lang === 'pt' ? 'Selecione o Seu Foco de Tratamento' : 'Select Your Treatment Focus'}
                </h3>
                <div className="w-12 h-[1px] bg-[#cc0000]/50 mx-auto"></div>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  {lang === 'pt' 
                    ? 'Cada sessão é totalmente personalizada para o seu objetivo principal de hoje. Escolha uma das opções abaixo para ver as durações, explicações e valores:'
                    : 'Each session is fully customized to your primary objective of the day. Choose one of the options below to see durations, explanations, and prices:'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto pt-4">
                {FOCUS_AREAS.map(opt => {
                  const IconComponent = opt.icon === 'Flame' ? Flame : opt.icon === 'Waves' ? Waves : Flower2;
                  return (
                    <div 
                      key={opt.id}
                      className="bg-white/[0.02] border border-brand-border/60 hover:border-[#cc0000]/60 p-6 rounded-3xl hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between group text-left relative"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="p-2.5 bg-white/[0.04] border border-brand-border/40 rounded-2xl group-hover:scale-110 transition duration-300">
                            <IconComponent className={`w-5 h-5 ${opt.icon === 'Waves' ? 'text-brand-gold' : 'text-[#cc0000]'}`} />
                          </div>
                          <span className="text-[9px] font-mono tracking-wider text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">
                            {lang === 'pt' ? opt.badgePt : opt.badgeEn}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-white group-hover:text-[#cc0000] transition duration-200 leading-snug">
                            {lang === 'pt' ? opt.titlePt : opt.titleEn}
                          </h4>
                          <p className="text-[11px] text-gray-400 leading-relaxed">
                            {lang === 'pt' ? opt.descPt : opt.descEn}
                          </p>
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-brand-border/30 flex justify-end">
                        <button
                          onClick={() => {
                            setSelectedFocusArea(opt);
                          }}
                          className="text-[10px] text-brand-red font-bold uppercase tracking-widest flex items-center space-x-1.5 hover:text-white transition duration-200 cursor-pointer"
                        >
                          <span>{lang === 'pt' ? 'Selecionar' : 'Select'}</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition duration-200" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* WHY CHOOSE & WHEN TO SEEK HELP SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                
                {/* Column 1: Why Choose Nipon Spa (Porque Escolher) */}
                <div className="lg:col-span-7 bg-brand-charcoal/40 border border-brand-border/60 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden text-left">
                  {/* Subtle decorative Kanji watermarks */}
                  <div className="absolute top-4 right-4 opacity-5 pointer-events-none select-none">
                    <span className="text-[90px] font-bold font-serif text-white leading-none">選択</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-brand-red font-mono font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red"></span>
                        {lang === 'pt' ? 'Excelência & Tradição' : 'Excellence & Tradition'}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-light text-white font-heading tracking-tight">
                        {lang === 'pt' ? 'Porque escolher o Nipon Spa?' : 'Why choose Nipon Spa?'}
                      </h3>
                      <div className="w-12 h-[1px] bg-brand-red/40"></div>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          titlePt: "Há mais de 22 anos em Telheiras",
                          titleEn: "Over 22 years in Telheiras",
                          descPt: "Tradição sólida e confiança no mesmo local servindo Lisboa.",
                          descEn: "Solid tradition and trust in the same location serving Lisbon.",
                          icon: CalendarDays,
                        },
                        {
                          titlePt: "Mais de 60.000 atendimentos realizados",
                          titleEn: "Over 60,000 treatments completed",
                          descPt: "Experiência clínica comprovada no alívio de dor e tensão corporal.",
                          descEn: "Proven clinical experience in pain relief and muscle tension.",
                          icon: Sparkles,
                        },
                        {
                          titlePt: "Formação com mestres japoneses",
                          titleEn: "Trained by Japanese masters",
                          descPt: "Técnicas autênticas e linhagem de conhecimento direto do Japão.",
                          descEn: "Authentic techniques and direct knowledge lineage from Japan.",
                          icon: Award,
                        },
                        {
                          titlePt: "Protocolos personalizados",
                          titleEn: "Personalized protocols",
                          descPt: "Não acreditamos em terapias iguais. Cada corpo recebe um plano único.",
                          descEn: "We do not believe in same-for-all treatments. Every body is unique.",
                          icon: Compass,
                        },
                        {
                          titlePt: "Cultura Omotenashi – a arte japonesa de cuidar",
                          titleEn: "Omotenashi Culture – the Japanese art of caring",
                          descPt: "Cuidado absoluto com atenção invisível e antecipação das suas necessidades.",
                          descEn: "Absolute care with invisible thoughtfulness, anticipating your needs.",
                          icon: Flower2,
                        }
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div key={idx} className="flex items-start space-x-4 group">
                            {/* Japanese style icon: Red circle like Hinomaru with gold/white icon */}
                            <div className="w-10 h-10 rounded-full bg-brand-red/10 border border-brand-red/35 flex items-center justify-center text-brand-red shrink-0 group-hover:bg-[#cc0000] group-hover:text-white transition duration-300 shadow-sm">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="text-white font-heading font-medium text-sm group-hover:text-brand-red transition duration-200">
                                {lang === 'pt' ? item.titlePt : item.titleEn}
                              </h4>
                              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                                {lang === 'pt' ? item.descPt : item.descEn}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Column 2: When to Seek Help (Quando Procurar Ajuda) */}
                <div className="lg:col-span-5 bg-gradient-to-b from-brand-charcoal/80 to-brand-black border border-brand-border/60 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden text-left">
                  {/* Subtle decorative Kanji watermarks */}
                  <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none select-none">
                    <span className="text-[100px] font-bold font-serif text-white leading-none">救助</span>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-brand-gold font-mono font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                        {lang === 'pt' ? 'Sinais de Alerta' : 'Warning Signs'}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-light text-white font-heading tracking-tight">
                        {lang === 'pt' ? 'Quando procurar ajuda?' : 'When to seek help?'}
                      </h3>
                      <div className="w-12 h-[1px] bg-brand-gold/40"></div>
                    </div>

                    <div className="space-y-4 text-gray-300 font-sans text-sm leading-relaxed font-light">
                      <p>
                        {lang === 'pt'
                          ? "Quanto mais cedo atuar, mais fácil é evitar que pequenas tensões se transformem em limitações do dia a dia."
                          : "The earlier you act, the easier it is to prevent minor tensions from becoming daily limitations."}
                      </p>
                      <p>
                        {lang === 'pt'
                          ? "Se sente dores nas costas, tensão cervical, desconforto nos ombros ou simplesmente sente que o seu corpo precisa de atenção, este pode ser o momento ideal para cuidar de si."
                          : "If you feel back pain, cervical tension, shoulder discomfort, or simply feel that your body needs attention, this could be the perfect moment to care for yourself."}
                      </p>
                    </div>

                    {/* Quick Pain Relief/Tension Visual List */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {[
                        { pt: "Dor nas Costas", en: "Back Pain" },
                        { pt: "Tensão Cervical", en: "Neck Tension" },
                        { pt: "Ombros Tensos", en: "Stiff Shoulders" },
                        { pt: "Stresse Diário", en: "Daily Stress" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2 bg-white/5 border border-brand-border/40 px-3 py-2 rounded-xl">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0"></span>
                          <span className="text-xs text-gray-300 font-mono">{lang === 'pt' ? item.pt : item.en}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-brand-border/20">
                      <p className="text-xs text-brand-gold italic font-serif leading-relaxed text-center lg:text-left">
                        {lang === 'pt' 
                          ? "“Há 22 anos a ajudar pessoas em Lisboa a sentirem-se melhor no seu próprio corpo.”"
                          : "“For 22 years helping people in Lisbon feel better in their own bodies.”"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-brand-border/30">
                    <button
                      onClick={() => {
                        setActiveTab('reservar');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full bg-[#cc0000] hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-widest py-3 rounded-full transition duration-300 shadow-md shadow-[#cc0000]/10 flex items-center justify-center space-x-2"
                    >
                      <Flower2 className="w-4 h-4 text-white" />
                      <span>{lang === 'pt' ? 'Reservar Protocolo Personalizado' : 'Book Personalized Protocol'}</span>
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* EXCLUSIVE SECTION: BLOCO OMOTENASHI & ARISSA MATSUMOTO */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-brand-charcoal via-brand-charcoal/90 to-brand-black border border-brand-border rounded-3xl p-6 sm:p-8 md:p-12 overflow-hidden relative">
                {/* Background decorative Japanese Kanji */}
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none select-none">
                  <span className="text-[120px] font-extrabold font-serif text-white tracking-widest leading-none">持て成し</span>
                </div>
                
                <div className="max-w-4xl mx-auto space-y-8 relative z-10 text-left">
                  
                  {/* Omotenashi Philosophy content */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-brand-red font-mono font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse"></span>
                        {lang === 'pt' ? 'Exclusividade • Omotenashi' : 'Exclusive • Omotenashi Philosophy'}
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white font-heading">
                        {lang === 'pt' ? 'A Alma do Cuidado' : 'The Soul of Care'}
                      </h2>
                      <p className="text-xs font-mono text-brand-gold uppercase tracking-widest">
                        {lang === 'pt' ? 'A Filosofia Omotenashi no Nipon Spa' : 'Omotenashi Philosophy at Nipon Spa'}
                      </p>
                    </div>

                    <div className="relative border-l-2 border-brand-red/40 pl-6 py-1 space-y-4">
                      <p className="text-lg sm:text-xl font-serif italic text-gray-200 leading-relaxed font-normal">
                        {lang === 'pt' 
                          ? '“No Japão, cuidar de alguém significa antecipar as suas necessidades antes mesmo que ele precise pedir.”'
                          : '“In Japan, caring for someone means anticipating their needs even before they have to ask.”'}
                      </p>
                      <p className="text-sm text-gray-400 font-sans leading-relaxed font-light">
                        {lang === 'pt'
                          ? 'Este é o espírito Omotenashi que inspira cada atendimento no Nipon Spa. Sob a orientação de Arissa Matsumoto, nossa equipa cultiva a arte japonesa da atenção invisível, onde cada toque, o silêncio respeitoso, o aroma de madeira hinoki e o chá de boas-vindas formam um ritual completo de renovação espiritual e corporal.'
                          : 'This is the Omotenashi spirit that inspires every moment of care at Nipon Spa. Under the careful guidance of Arissa Matsumoto, our team cultivates the Japanese art of invisible thoughtfulness, where every touch, respectful silence, and authentic tea service form a deep, restoring ritual.'}
                      </p>
                    </div>

                    {/* Aesthetic signature or highlight line */}
                    <div className="pt-2 flex items-center space-x-3 text-gray-500 font-mono text-[10px] uppercase tracking-wider">
                      <Flower2 className="w-4 h-4 text-brand-red" />
                      <span>NIPON SPA • LISBOA OMOTENASHI LINEAGE</span>
                    </div>

                    {/* Cinematic Video Placeholder */}
                    <div className="relative group rounded-2xl overflow-hidden border border-brand-border/80 bg-brand-black aspect-video flex flex-col items-center justify-center p-6 text-center shadow-2xl transition duration-500 hover:border-brand-red/35 max-w-3xl">
                      {/* Dark ambient background graphic simulating a premium tatami room */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent z-0"></div>
                      
                      {/* Delicate background circles representing Japanese flags or zen stone ripple */}
                      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#cc0000]/5 filter blur-xl group-hover:bg-[#cc0000]/10 transition duration-500"></div>
                      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-gold/5 filter blur-xl"></div>
                      
                      {/* Center icons & play-like aesthetics */}
                      <div className="relative z-10 flex flex-col items-center space-y-4">
                        {/* Play Button Simulation */}
                        <div className="w-16 h-16 rounded-full bg-brand-charcoal border border-brand-border flex items-center justify-center text-brand-gold shadow-lg group-hover:scale-105 group-hover:border-brand-red/50 transition duration-300">
                          <Play className="w-6 h-6 text-brand-gold ml-1 animate-pulse" />
                        </div>
                        
                        {/* Placeholder labels */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-brand-gold tracking-[0.25em] uppercase block font-bold">
                            {lang === 'pt' ? 'EXPERIÊNCIA CINEMÁTICA' : 'CINEMATIC EXPERIENCE'}
                          </span>
                          <h4 className="text-white font-heading font-medium text-sm">
                            {lang === 'pt' ? 'A Alma do Omotenashi' : 'The Soul of Omotenashi'}
                          </h4>
                          <p className="text-[10px] text-gray-500 font-mono italic max-w-xs mx-auto">
                            {lang === 'pt' 
                              ? 'O vídeo oficial está em fase de produção. Em breve estará disponível.'
                              : 'Omotenashi feature video is in production. Streaming is commencing soon.'}
                          </p>
                        </div>

                        {/* Floating tag */}
                        <span className="absolute top-2 right-2 bg-brand-red/10 border border-brand-red/30 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase text-brand-red tracking-wider font-extrabold">
                          {lang === 'pt' ? 'Em Breve' : 'Coming Soon'}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Quick Location Spot */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-brand-charcoal border border-brand-border rounded-3xl p-8 sm:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  
                  <div className="lg:col-span-1 space-y-4 text-center lg:text-left">
                    <span className="text-brand-red font-bold text-xs uppercase tracking-widest block">
                      {lang === 'pt' ? 'Espaço em Lisboa' : 'Lisbon Space'}
                    </span>
                    <h3 className="text-2xl font-bold text-white font-heading">
                      {lang === 'pt' ? 'Onde nos Encontrar' : 'Where to Find Us'}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {lang === 'pt' ? (
                        <>
                          Localizado numa das zonas mais tranquilas e de prestígio, com fácil parqueamento público ao redor.
                        </>
                      ) : (
                        <>
                          Located in one of the most prestigious and peaceful areas with convenient nearby parking.
                        </>
                      )}
                    </p>
                    <div className="pt-2 font-mono text-xs text-gray-300">
                      <div className="flex items-start justify-center lg:justify-start space-x-2 mb-1.5 text-brand-gold">
                        <Clock className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                        <div className="text-left font-mono">
                          {lang === 'pt' ? (
                            <>
                              <p className="font-semibold text-white">Horário de Funcionamento:</p>
                              <p className="text-[11px] text-gray-300 font-sans">Seg. a Sex.: 11:00 - 20:00</p>
                              <p className="text-[11px] text-gray-300 font-sans">Sábado: 10:00 - 17:00</p>
                              <p className="text-[11px] text-gray-400 font-sans">Domingo: Encerrado</p>
                            </>
                          ) : (
                            <>
                              <p className="font-semibold text-white">Opening Hours:</p>
                              <p className="text-[11px] text-gray-300 font-sans">Mon. to Fri.: 11:00 - 20:00</p>
                              <p className="text-[11px] text-gray-300 font-sans">Saturday: 10:00 - 17:00</p>
                              <p className="text-[11px] text-gray-400 font-sans">Sunday: Closed</p>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="flex items-center justify-center lg:justify-start space-x-2">
                        <Phone className="w-4 h-4 text-brand-red shrink-0" />
                        <span>917 448 484</span>
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-2 relative rounded-3xl overflow-hidden border border-brand-border h-[250px] sm:h-[300px]">
                    {/* Visual Vector Representational Map */}
                    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 text-center">
                      <div className="relative mb-4 flex items-center justify-center">
                        <div className="w-10 h-10 bg-[#cc0000] text-white rounded-full flex items-center justify-center relative z-10 shadow-md shadow-[#cc0000]/15">
                          <MapPin className="w-5 h-5" />
                        </div>
                      </div>
                      <h4 className="text-gray-900 font-bold font-heading text-base">Rua Prista Monteiro, 20 Loja B, Lisboa</h4>
                      <p className="text-gray-500 text-xs mt-1 max-w-md">
                        A menos de 1 km da Estrada da Luz, Benfica, de fácil acesso pela Segunda Circular.
                      </p>
                      
                      <div className="mt-4 flex space-x-3">
                        <a 
                          href="https://maps.google.com/?q=Rua+Prista+Monteiro+20+Lisboa" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-brand-gray border border-brand-border text-gray-700 hover:text-black px-4 py-2 rounded-full text-xs font-semibold transition"
                        >
                          Abrir Google Maps
                        </a>
                        <button 
                          onClick={() => copyRefToClipboard("Rua Prista Monteiro, 20 Loja B Lisboa 1600-253")}
                          className="bg-[#cc0000] text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-brand-red-hover transition flex items-center space-x-1.5 shadow-md shadow-[#cc0000]/10"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{isCopied ? 'Copiado!' : 'Copiar Morada'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

          </div>
        )}

        {/* TAB 2: TREATMENTS CATALOG */}
        {activeTab === 'therapies' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12" id="catalog-element">
            
            {/* Catalog Introduction */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#cc0000] mb-2 block font-mono">
                {lang === 'pt' ? 'O Cuidado de Excelência em Lisboa' : 'Excellence of Traditional Care in Lisbon'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-light text-white font-heading tracking-tight leading-tight">
                {lang === 'pt' ? 'Tratamentos & Programas de Resultados' : 'Result-Driven Japanese Treatments'}
              </h1>
              <p className="text-xs text-gray-400 max-w-lg mx-auto leading-relaxed">
                {lang === 'pt' 
                  ? 'No Nipon Spa, cada ritual é desenhado para reequilibrar o seu corpo e mente. Selecione o seu foco principal abaixo para conhecer as opções disponíveis:' 
                  : 'At Nipon Spa, each ritual is crafted to realign body and mind. Select your primary focus below to learn about available options:'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto pt-4 pb-12">
              {FOCUS_AREAS.map(opt => {
                const IconComponent = opt.icon === 'Flame' ? Flame : opt.icon === 'Waves' ? Waves : Flower2;
                return (
                  <div 
                    key={opt.id}
                    className="bg-white/[0.02] border border-brand-border/60 hover:border-[#cc0000]/60 p-6 rounded-3xl hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between group text-left relative"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="p-2.5 bg-white/[0.04] border border-brand-border/40 rounded-2xl group-hover:scale-110 transition duration-300">
                          <IconComponent className={`w-5 h-5 ${opt.icon === 'Waves' ? 'text-brand-gold' : 'text-[#cc0000]'}`} />
                        </div>
                        <span className="text-[9px] font-mono tracking-wider text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">
                          {lang === 'pt' ? opt.badgePt : opt.badgeEn}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#cc0000] transition duration-200 leading-snug">
                          {lang === 'pt' ? opt.titlePt : opt.titleEn}
                        </h4>
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                          {lang === 'pt' ? opt.descPt : opt.descEn}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-brand-border/30 flex justify-end">
                      <button
                        onClick={() => {
                          setSelectedFocusArea(opt);
                        }}
                        className="text-[10px] text-brand-red font-bold uppercase tracking-widest flex items-center space-x-1.5 hover:text-white transition duration-200 cursor-pointer"
                      >
                        <span>{lang === 'pt' ? 'Selecionar' : 'Select'}</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition duration-200" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: NEW DOC.PT RESERVAR PAGE */}
        {activeTab === 'reservar' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-20 space-y-8 animate-fade-in" id="reservar-page">
            {/* Page Title & Traditional Subtitle */}
            <div className="text-center space-y-3">
              <span className="text-brand-red font-bold text-xs uppercase tracking-widest block font-mono">
                Omotenashi • {lang === 'pt' ? 'Reserva Segura Directa' : 'Secure Direct Booking'}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white font-heading tracking-tight" id="reservar-title">
                {lang === 'pt' ? 'Reserve o seu momento' : 'Reserve your moment'}
              </h1>
              <p className="text-xs md:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
                {lang === 'pt' 
                  ? 'Escolha as suas terapias de bem-estar preferidas e marque o seu horário ideal com facilidade na plataforma oficial DOC.pt. Aguardamos a sua honrosa visita para lhe proporcionar uma harmonia inigualável.' 
                  : 'Select your preferred wellness therapies and secure your ideal time slot easily on our official DOC.pt platform. We look forward to welcoming you for an unparalleled state of harmony.'}
              </p>
            </div>

            {/* Premium Info Panel / Fallback Section */}
            <div className="bg-brand-charcoal border border-brand-border rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border-b border-brand-border/40 pb-6">
                <div className="flex items-center space-x-3.5 text-center sm:text-left">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#cc0000]/10 border border-[#cc0000]/30 shrink-0 mx-auto sm:mx-0">
                    <ShieldCheck className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {lang === 'pt' ? 'Garantia de Ligação Segura' : 'Secure Connection Guarantee'}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-lg">
                      {lang === 'pt' 
                        ? 'O formulário de agendamento é carregado diretamente dos servidores certificados da DOC.pt para proteger os seus dados.' 
                        : 'The scheduling form is loaded directly from certified DOC.pt servers to protect your private information.'}
                    </p>
                  </div>
                </div>

                <a 
                  href="https://nipon-spa-japones.doc.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#cc0000] hover:bg-brand-red-hover text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 shrink-0 select-none"
                  id="fallback-button"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{lang === 'pt' ? 'Abrir marcação numa nova janela' : 'Open booking in new window'}</span>
                </a>
              </div>

              {/* Booking block with responsive iframe and rounded corners - Now with taller dimensions for premium visibility */}
              <div className="relative bg-white rounded-2xl overflow-hidden border border-brand-border shadow-inner animate-fade-in" style={{ minHeight: '1100px' }} id="booking-block-wrapper">
                <iframe 
                  src="https://nipon-spa-japones.doc.pt" 
                  className="w-full h-[950px] md:h-[1350px] border-none select-none"
                  title="Nipon Spa Booking"
                  allow="payment"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB: BOOK RITUAL FULL PAGE EXPERIENCE */}
        {activeTab === 'booking' && bookingTherapy && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10 animate-fade-in" id="book-ritual-page">
            {/* Page Title & Traditional Subtitle */}
            <div className="text-center space-y-3">
              <span className="text-brand-red font-bold text-xs uppercase tracking-widest block font-mono">
                {bookingTherapy.japaneseName} • {lang === 'pt' ? 'Garantia de Vaga Segura' : 'Secure Booking Guarantee'}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
                {lang === 'pt' ? 'Agendar o Seu Ritual Tradicional' : 'Book Your Traditional Ritual'}
              </h1>
              <p className="text-xs md:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
                {lang === 'pt' 
                  ? 'Vivencie o verdadeiro acolhimento Omotenashi. Escolha a data, insira os seus dados de contacto e finalize o agendamento de forma fidedigna.' 
                  : 'Experience authentic Omotenashi hospitality. Select a day and slot, enter your direct contact information, and secure your session.'}
              </p>
            </div>

            {/* Stepper Progress Bar */}
            <div className="max-w-xl mx-auto bg-brand-charcoal/40 border border-brand-border/60 p-4 rounded-2xl">
              <div className="flex items-center justify-between text-[11px] sm:text-xs">
                {[
                  { step: 1, title: lang === 'pt' ? 'Agenda' : 'Schedule' },
                  { step: 2, title: lang === 'pt' ? 'Identificação' : 'Identification' },
                  { step: 3, title: lang === 'pt' ? 'Simulação' : 'Simulation' },
                  { step: 4, title: lang === 'pt' ? 'Confirmado' : 'Confirmed' }
                ].map(item => (
                  <div key={item.step} className="flex items-center space-x-1 sm:space-x-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-300 ${bookingStep >= item.step ? 'bg-brand-red text-white scale-110 shadow-lg shadow-brand-red/30' : 'bg-brand-black text-gray-500 border border-brand-border'}`}>
                      {item.step}
                    </span>
                    <span className={`hidden sm:inline ${bookingStep >= item.step ? 'text-white font-semibold' : 'text-gray-500'}`}>
                      {item.title}
                    </span>
                    {item.step < 4 && <ChevronRight className="w-3.5 h-3.5 text-brand-border shrink-0" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Form & Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Content */}
              <div className="lg:col-span-7 bg-brand-charcoal border border-brand-border rounded-3xl p-6 sm:p-8 space-y-6">
                
                {/* STEP 1: DATE & TIME SELECT */}
                {bookingStep === 1 && (
                  <div className="space-y-6">
                    {/* Construction warning banner in the wizard */}
                    <div className="bg-brand-red/10 border border-brand-red/30 p-4 rounded-xl flex items-start space-x-3 text-xs text-gray-300 animate-fade-in">
                      <Lock className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold text-white text-sm">
                          {lang === 'pt' ? '🔒 Plataforma em Construção' : '🔒 Platform Under Construction'}
                        </p>
                        <p className="leading-relaxed">
                          {lang === 'pt' 
                            ? 'Este website encontra-se atualmente em fase de desenvolvimento e testes. Os agendamentos e os pagamentos online correspondentes estão desativados temporariamente e bloqueados para uso público.'
                            : 'This website is currently in testing and setup. Online scheduling and live payments are temporarily disabled and blocked for public use.'}
                        </p>
                      </div>
                    </div>

                    {/* TREATMENT CHOOSE DROPDOWN */}
                    <div className="bg-brand-black/40 border border-brand-border/60 p-4 rounded-2xl space-y-2">
                      <label className="text-[10px] text-gray-400 font-mono uppercase block tracking-widest" htmlFor="therapy-booking-selector-page">
                        {lang === 'pt' ? 'Escolha o seu Ritual Tradicional' : 'Select your Traditional Ritual'}
                      </label>
                      <select
                        id="therapy-booking-selector-page"
                        value={bookingTherapy.id}
                        onChange={(e) => {
                          const therapy = THERAPIES.find(t => t.id === e.target.value);
                          if (therapy) {
                            setBookingTherapy(therapy);
                          }
                        }}
                        className="w-full bg-brand-black border border-brand-border text-white text-xs px-3 py-2.5 rounded-xl focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-sans cursor-pointer"
                      >
                        {THERAPIES.map(t => (
                          <option key={t.id} value={t.id} className="bg-brand-charcoal text-white py-1">
                            {getTherapyName(t)} — {t.duration} min ({t.price}€)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white mb-3 font-heading flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-brand-red" />
                        <span>{lang === 'pt' ? '1. Selecione o Dia Disponível' : '1. Select Available Day'}</span>
                      </h4>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {datesList.map(item => {
                          const slots = generateAvailableSlots(item.dateString);
                          const isFullyBooked = slots.length === 0;
                          const isLowVacancy = slots.length > 0 && slots.length < 4;
                          
                          let statusLabel = lang === 'pt' ? 'Livre' : 'Free';
                          let statusColor = 'text-green-400 border-green-500/20';
                          if (isFullyBooked) {
                            statusLabel = lang === 'pt' ? 'Cheio' : 'Full';
                            statusColor = 'text-red-500 border-red-500/10 opacity-60';
                          } else if (isLowVacancy) {
                            statusLabel = lang === 'pt' ? 'Vagas' : 'Slots';
                            statusColor = 'text-brand-gold border-brand-gold/25';
                          }

                          return (
                            <button
                              key={item.dateString}
                              type="button"
                              disabled={isFullyBooked}
                              onClick={() => handleSelectDate(item.dateString)}
                              className={`border p-2 rounded-xl flex flex-col items-center justify-between min-h-[75px] transition focus:outline-none ${selectedDate === item.dateString ? 'bg-brand-red/15 border-brand-red text-white ring-1 ring-brand-red' : 'bg-brand-black hover:border-gray-500 border-brand-border text-gray-300'} ${isFullyBooked ? 'cursor-not-allowed border-brand-border/30 bg-transparent' : ''}`}
                            >
                              <span className="text-[9px] uppercase tracking-wider text-gray-400">
                                {lang === 'pt' ? item.weekday.slice(0, 3) : item.weekdayEn.slice(0, 3)}
                              </span>
                              <span className="text-base font-extrabold font-mono mt-0.5">{item.dayNum}</span>
                              <span className="text-[8px] tracking-widest text-[#949494]">
                                {lang === 'pt' ? item.monthName : item.monthNameEn}
                              </span>
                              
                              <span className={`text-[8px] font-bold uppercase tracking-wider border px-1.5 py-0.2 rounded mt-1 bg-brand-black/80 ${statusColor}`}>
                                {statusLabel}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white mb-3 font-heading flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-brand-red" />
                        <span>{lang === 'pt' ? `2. Selecione o Horário (${generateAvailableSlots(selectedDate).length} vagas livres)` : `2. Select Time (${generateAvailableSlots(selectedDate).length} free slots)`}</span>
                      </h4>
                      
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {generateAvailableSlots(selectedDate).map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 rounded-lg font-mono text-xs font-semibold focus:outline-none border transition ${selectedTime === time ? 'bg-gradient-to-r from-brand-red to-brand-darkred text-white border-brand-red' : 'bg-brand-black text-gray-300 border-brand-border hover:border-gray-500'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>

                      {generateAvailableSlots(selectedDate).length === 0 && (
                        <p className="text-xs text-brand-red mt-2">{lang === 'pt' ? 'Nenhum horário disponível para o dia selecionado. Por favor mude a data acima.' : 'No slots available for the selected day. Please select another date.'}</p>
                      )}
                    </div>

                    {/* Action Footer */}
                    <div className="pt-4 border-t border-brand-border/40 flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        {lang === 'pt' ? 'Preço do Ritual' : 'Ritual Price'}: <strong className="text-white font-sans text-sm">{bookingTherapy.price}€</strong>
                      </span>
                      <button
                        type="button"
                        disabled={!selectedDate || !selectedTime}
                        onClick={handleConfirmDateTime}
                        className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {lang === 'pt' ? 'Próximo Passo' : 'Next Step'}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: CUSTOMER IDENTIFICATION FORM */}
                {bookingStep === 2 && (
                  <form onSubmit={handleConfirmCustomerDetails} className="space-y-6">
                    <div className="bg-brand-black/35 p-4 rounded-xl border border-brand-border/60 text-xs text-gray-300 flex items-start space-x-2.5 animate-fade-in">
                      <Info className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <div>
                        {lang === 'pt' ? (
                          <>Inicie o preenchimento para o ritual <strong className="text-white">{getTherapyName(bookingTherapy)}</strong> agendado para o dia <strong className="text-white">{selectedDate}</strong> às <strong className="text-white">{selectedTime}</strong>.</>
                        ) : (
                          <>Fill in details for the ritual <strong className="text-white">{getTherapyName(bookingTherapy)}</strong> booked for <strong className="text-white">{selectedDate}</strong> at <strong className="text-white">{selectedTime}</strong>.</>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block" htmlFor="cust-name-page">{lang === 'pt' ? 'Nome Completo' : 'Full Name'}</label>
                        <input 
                          id="cust-name-page"
                          type="text" 
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder={lang === 'pt' ? 'Ex: Manuel Antunes de Sousa' : 'e.g. John Doe'} 
                          className="w-full bg-brand-black border border-brand-border rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                        />
                      </div>

                      {/* Contact Channels Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block" htmlFor="cust-email-page">{lang === 'pt' ? 'Endereço de E-mail' : 'Email Address'}</label>
                          <input 
                            id="cust-email-page"
                            type="email" 
                            required
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder="Ex: cliente@nipon-terapias.com" 
                            className="w-full bg-brand-black border border-brand-border rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                          />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block" htmlFor="cust-phone-page">{lang === 'pt' ? 'Telemóvel (Formato PT)' : 'Mobile Phone (PT Format)'}</label>
                          <input 
                            id="cust-phone-page"
                            type="tel" 
                            required
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder="Ex: 912 345 678" 
                            className="w-full bg-brand-black border border-brand-border rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                          />
                        </div>
                      </div>

                      {/* Special health notes */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block" htmlFor="cust-notes-page">{lang === 'pt' ? 'Observações de Saúde ou Preferências (Opcional)' : 'Health Notes or Preferences (Optional)'}</label>
                        <textarea 
                          id="cust-notes-page"
                          rows={3}
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          placeholder={lang === 'pt' ? 'Ex: Lesões nas costas, preferência por terapeuta senhora, grávida, alergia a algum óleo...' : 'e.g. Back injuries, preference for female therapist, pregnant, oil allergies...'} 
                          className="w-full bg-brand-black border border-brand-border rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                        />
                      </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="pt-4 border-t border-brand-border/40 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setBookingStep(1)}
                        className="text-xs font-semibold text-gray-400 hover:text-white hover:underline focus:outline-none"
                      >
                        {lang === 'pt' ? 'Voltar à Agenda' : 'Back to Calendar'}
                      </button>

                      <button
                        type="submit"
                        className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition duration-200"
                      >
                        {lang === 'pt' ? 'Escolher Pagamento' : 'Select Payment'}
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: INTEGRATED SIMULATED PAYMENT */}
                {bookingStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Construction warning banner in the checkout */}
                    <div className="bg-brand-red/15 border border-brand-red/40 p-5 rounded-2xl flex items-start space-x-3.5 text-xs text-gray-300 shadow-xl">
                      <Lock className="w-5 h-5 text-brand-red shrink-0 mt-0.5 animate-pulse" />
                      <div className="space-y-1">
                        <p className="font-bold text-white text-sm uppercase tracking-wider">
                          {lang === 'pt' ? 'Sistema de Pagamento Bloqueado' : 'Payment Gateways Locked'}
                        </p>
                        <p className="leading-relaxed text-gray-300">
                          {lang === 'pt' 
                            ? 'Lembramos que, dado que o site está sob construção e ainda não está ligado ao gateway de pagamentos (Stripe), os pagamentos eletrónicos e reservas automáticas estão bloqueados. Não é possível concluir o booking.'
                            : 'Since the website is currently under construction and has not yet been connected to the payment provider (Stripe), checkout transactions and live booking entries are completely locked and cannot be finalized.'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white mb-2 font-heading">{lang === 'pt' ? 'Escolha o Método de Pagamento' : 'Choose Your Preferred Payment Method'}</h4>
                      <p className="text-xs text-gray-400">
                        {lang === 'pt' 
                          ? 'O Nipon Spa utiliza encriptação de ponta. Escolha um dos métodos abaixo para a simulação integrada.' 
                          : 'Nipon Spa uses secure high-grade encryption. Choose a method below for this integrated checkout simulation.'}
                      </p>
                    </div>

                    {/* Integrated Selector */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'mbway', label: 'MBWay', desc: lang === 'pt' ? 'Telemóvel' : 'Mobile No.' },
                        { id: 'multibanco', label: 'Multibanco', desc: lang === 'pt' ? 'Ent./Ref.' : 'Entity/Ref.' },
                        { id: 'card', label: lang === 'pt' ? 'Cartão' : 'Card', desc: 'Visa/MC' }
                      ].map(method => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => {
                            setPaymentMethod(method.id as PaymentMethod);
                            if (method.id === 'multibanco') {
                              setGeneratedRef(generateMockReference(bookingTherapy.price));
                            }
                            setIsProcessingPayment(false);
                          }}
                          className={`border p-4 rounded-xl flex flex-col items-center justify-center text-center transition focus:outline-none ${paymentMethod === method.id ? 'bg-brand-red/10 border-brand-red text-white animate-pulse' : 'bg-brand-black border-brand-border text-gray-400 hover:border-gray-500'}`}
                        >
                          <span className="font-heading font-extrabold text-sm text-white uppercase">{method.label}</span>
                          <span className="text-[9px] text-gray-400 mt-1">{method.desc}</span>
                        </button>
                      ))}
                    </div>

                    {/* MBWAY PANEL */}
                    {paymentMethod === 'mbway' && (
                      <div className="bg-brand-black/40 border border-brand-border rounded-xl p-5 space-y-4">
                        <div className="text-center max-w-sm mx-auto space-y-2">
                          <span className="text-[10px] font-bold text-blue-400 tracking-widest block uppercase">{lang === 'pt' ? 'Serviço Expresso' : 'Express Service'}</span>
                          <h5 className="font-bold text-sm text-white">{lang === 'pt' ? 'Pagamento Instantâneo via MBWay' : 'Instant Payment via MBWay'}</h5>
                          <p className="text-[11px] text-gray-400">
                            {lang === 'pt' ? (
                              <>Será enviada uma notificação para o telemóvel <strong className="text-white">{customerPhone || 'digitado'}</strong> correspondente ao valor de <strong className="text-white">{bookingTherapy.price}€</strong>.</>
                            ) : (
                              <>A notification will be sent to the phone <strong className="text-white">{customerPhone || 'entered'}</strong> for the amount of <strong className="text-white">{bookingTherapy.price}€</strong>.</>
                            )}
                          </p>
                        </div>

                        {!isProcessingPayment ? (
                          <div className="pt-2 text-center flex flex-col items-center">
                            <button
                              type="button"
                              disabled
                              className="bg-gray-700/60 text-gray-500 border border-brand-border/40 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl cursor-not-allowed inline-flex items-center space-x-2"
                            >
                              <Lock className="w-3.5 h-3.5 text-brand-red" />
                              <span>{lang === 'pt' ? 'Pagamento Bloqueado (Em Construção)' : 'Payment Blocked (In Construction)'}</span>
                            </button>
                            <p className="text-[10px] text-brand-red/80 mt-2 font-medium">
                              {lang === 'pt' ? '⚠️ Indisponível em fase de testes' : '⚠️ Unavailable in test phase'}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-brand-charcoal border border-brand-red/20 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-3.5">
                            <div className="relative flex items-center justify-center">
                              <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-brand-red/30 opacity-75"></span>
                              <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white text-[11px] font-bold font-mono">
                                {paymentCountdown}s
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-xs text-white font-semibold">{lang === 'pt' ? 'Notificação pendente na app MBWay...' : 'Notification pending in MBWay app...'}</p>
                              <p className="text-[10px] text-gray-400 mt-1">{lang === 'pt' ? 'Aceda à sua aplicação MBWay no telemóvel e autorize o débito para concluir.' : 'Please open the app on your mobile phone and authorize.'}</p>
                            </div>

                            <button
                              type="button"
                              onClick={handleSimulateMBWayApprove}
                              className="bg-brand-gold text-brand-black hover:bg-brand-gold-pale px-4 py-2 rounded-lg text-[10px] font-extrabold uppercase tracking-widest transition duration-150"
                            >
                              {lang === 'pt' ? '✓ Simular Aprovação' : '✓ Simulate Approval'}
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* MULTIBANCO PANEL */}
                    {paymentMethod === 'multibanco' && generatedRef && (
                      <div className="bg-brand-black/40 border border-brand-border rounded-xl p-5 space-y-4">
                        <div className="text-center max-w-sm mx-auto">
                          <h5 className="font-bold text-sm text-white">{lang === 'pt' ? 'Referências para Pagamento' : 'Payment References'}</h5>
                          <p className="text-[11px] text-gray-400 mt-1">
                            {lang === 'pt' ? 'Pague num terminal Caixa Multibanco ou através do Homebanking do seu banco (Pagamento de Serviços).' : 'Pay at any Multibanco ATM or via your bank\'s Homebanking portal.'}
                          </p>
                        </div>

                        <div className="bg-brand-charcoal border border-brand-border rounded-xl p-4 space-y-3 font-mono text-xs max-w-xs mx-auto">
                          <div className="flex justify-between border-b border-brand-border pb-1.5">
                            <span className="text-gray-400">{lang === 'pt' ? 'Entidade' : 'Entity'}:</span>
                            <span className="text-white font-bold">{generatedRef.entity}</span>
                          </div>
                          
                          <div className="flex justify-between border-b border-brand-border pb-1.5 items-center">
                            <span className="text-gray-400">{lang === 'pt' ? 'Referência' : 'Reference'}:</span>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-brand-gold font-bold">{generatedRef.reference}</span>
                              <button 
                                type="button"
                                onClick={() => {
                                  copyRefToClipboard(generatedRef.reference.replace(/\s/g, ''));
                                }}
                                className="text-gray-400 hover:text-white p-1 cursor-pointer"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex justify-between pb-1">
                            <span className="text-gray-400">{lang === 'pt' ? 'Valor' : 'Amount'}:</span>
                            <span className="text-white font-bold">{generatedRef.value} €</span>
                          </div>
                        </div>

                        <div className="pt-2 text-center flex flex-col items-center">
                          <button
                            type="button"
                            disabled
                            className="bg-gray-700/60 text-gray-500 border border-brand-border/40 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl cursor-not-allowed inline-flex items-center space-x-2"
                          >
                            <Lock className="w-3.5 h-3.5 text-brand-red" />
                            <span>{lang === 'pt' ? 'Agendamento Bloqueado (Em Construção)' : 'Booking Blocked (In Construction)'}</span>
                          </button>
                          <p className="text-[10px] text-brand-red/80 mt-2 font-medium">
                            {lang === 'pt' ? '⚠️ Sistema sob testes' : '⚠️ System under testing'}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* CREDIT CARD PANEL */}
                    {paymentMethod === 'card' && (
                      <div className="bg-brand-black/40 border border-brand-border rounded-xl p-5 space-y-6">
                        {/* Interactive flipping card */}
                        <div className="flex justify-center">
                          <div 
                            className={`w-full max-w-[320px] h-[190px] rounded-2xl relative transition-all duration-500 transform`}
                            style={{ 
                              perspective: '1000px',
                              transformStyle: 'preserve-3d',
                              transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                            }}
                          >
                            {/* FRONT SIDE */}
                            <div 
                              className="absolute inset-0 bg-gradient-to-br from-[#121111] via-[#1c1112] to-[#2b080b] rounded-2xl p-5 border border-brand-border flex flex-col justify-between shadow-lg font-sans"
                              style={{ backfaceVisibility: 'hidden' }}
                            >
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <span className="text-[9px] text-brand-gold uppercase tracking-widest block font-bold">Nipon Spa VIP Card</span>
                                  <div className="w-10 h-7 bg-brand-red/20 rounded-md border border-brand-red/40 relative"></div>
                                </div>
                                <Flower2 className="w-8 h-8 text-brand-red" />
                              </div>

                              <div className="space-y-4">
                                <p className="font-mono text-sm tracking-widest text-white">
                                  {cardNumber || '•••• •••• •••• ••••'}
                                </p>
                                
                                <div className="flex justify-between items-end">
                                  <div>
                                    <span className="text-[7px] text-gray-400 uppercase tracking-wider block">Hóspede</span>
                                    <span className="font-heading text-xs tracking-wide text-gray-200 uppercase truncate max-w-[150px] inline-block font-bold">
                                      {customerName || 'NOME COMPLETO'}
                                    </span>
                                  </div>
                                  
                                  <div>
                                    <span className="text-[7px] text-gray-400 uppercase tracking-wider block">Validade</span>
                                    <span className="font-mono text-[11px] text-white">
                                      {cardExpiry || 'MM/AA'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* BACK SIDE */}
                            <div 
                              className="absolute inset-0 bg-gradient-to-br from-[#0c0505] to-[#140b0c] rounded-2xl border border-brand-border flex flex-col justify-between py-5 shadow-lg"
                              style={{ 
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)'
                              }}
                            >
                              <div className="w-full h-10 bg-black mt-2"></div>
                              <div className="px-5 space-y-4 text-right">
                                <div className="inline-block">
                                  <span className="text-[6px] text-gray-400 uppercase tracking-wider block mb-1">{lang === 'pt' ? 'Assinatura' : 'Signature'}</span>
                                  <div className="bg-white/10 px-3 py-1 rounded border border-white/20 flex items-center justify-end font-mono text-xs italic text-white min-w-[70px]">
                                    {cardCVV || 'CVV'}
                                  </div>
                                </div>
                                <p className="text-[7px] text-gray-500 leading-tight">{lang === 'pt' ? 'Este cartão é pessoal.' : 'This card is personal.'}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Credit Card Fields */}
                        <div className="space-y-4 pt-2">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block" htmlFor="c-num-page">{lang === 'pt' ? 'Número do Cartão' : 'Card Number'}</label>
                            <input 
                              id="c-num-page"
                              type="text" 
                              required
                              value={cardNumber}
                              onFocus={() => setIsCardFlipped(false)}
                              onChange={(e) => {
                                const text = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                                setCardNumber(text.slice(0, 19));
                              }}
                              placeholder="4532 9845 1124 0930" 
                              className="w-full bg-brand-black border border-brand-border rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red font-mono"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block" htmlFor="c-exp-page">{lang === 'pt' ? 'Validade' : 'Expiry'}</label>
                              <input 
                                id="c-exp-page"
                                type="text" 
                                required
                                value={cardExpiry}
                                onFocus={() => setIsCardFlipped(false)}
                                onChange={(e) => {
                                  const text = e.target.value.replace(/^([1-9]\/|[2-9])$/g, '0$1/').replace(/^(0[1-9]|1[0-2])$/g, '$1/').replace(/^(0[1-9]|1[0-2])\/([0-9]{2})$/g, '$1/$2');
                                  setCardExpiry(text.slice(0, 5));
                                }}
                                placeholder="12/28" 
                                className="w-full bg-brand-black border border-brand-border rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block" htmlFor="c-cvv-page">CVV</label>
                              <input 
                                id="c-cvv-page"
                                type="password" 
                                required
                                value={cardCVV}
                                onFocus={() => setIsCardFlipped(true)}
                                onBlur={() => setIsCardFlipped(false)}
                                onChange={(e) => {
                                  const text = e.target.value.replace(/\D/g, '');
                                  setCardCVV(text.slice(0, 3));
                                }}
                                placeholder="•••" 
                                className="w-full bg-brand-black border border-brand-border rounded-lg p-2.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="pt-2 text-center flex flex-col items-center">
                            <button
                              type="button"
                              disabled
                              className="bg-gray-700/60 text-gray-500 border border-brand-border/40 text-xs font-bold uppercase tracking-wider px-8 py-3 rounded-xl cursor-not-allowed inline-flex items-center space-x-2"
                            >
                              <Lock className="w-3.5 h-3.5 text-brand-red" />
                              <span>{lang === 'pt' ? 'Pagamentos Bloqueados (Em Construção)' : 'Payments Blocked (In Construction)'}</span>
                            </button>
                            <p className="text-[10px] text-brand-red/80 mt-2 font-medium">
                              {lang === 'pt' ? '⚠️ Gateway de pagamentos inativo' : '⚠️ Payment gateway inactive'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="pt-4 border-t border-brand-border/40 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setBookingStep(2)}
                        className="text-xs font-semibold text-gray-400 hover:text-white hover:underline focus:outline-none"
                      >
                        {lang === 'pt' ? 'Voltar aos Dados Pessoais' : 'Back to Personal Info'}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: CONFIRMATION SUCCESS */}
                {bookingStep === 4 && (
                  <div className="text-center py-6 space-y-6 animate-fade-in">
                    <div className="relative w-20 h-20 bg-brand-gold/10 border-2 border-brand-gold rounded-full flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-10 h-10 text-brand-gold animate-bounce" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold text-white font-heading px-1">
                        {lang === 'pt' ? 'Agendamento Realizado com Sucesso!' : 'Booking Completed Successfully!'}
                      </h3>
                      <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                        {lang === 'pt' 
                          ? <>Excelente escolha! A sua meditação/ritual tradicional está registada de forma fidedigna. Enviámos o seu passe e instruções para <strong className="text-white">{customerEmail}</strong>.</>
                          : <>Excellent choice! Your authentic traditional ritual is securely registered. We have sent your pass to <strong className="text-white">{customerEmail}</strong>.</>}
                      </p>
                    </div>

                    {/* Styled Voucher Paper Ticket */}
                    <div className="bg-brand-black border border-brand-border rounded-2xl p-5 text-left font-mono text-xs max-w-md mx-auto space-y-4">
                      <div className="text-center border-b border-brand-border pb-3">
                        <span className="text-brand-red font-bold uppercase tracking-widest block text-[10px]">
                          {lang === 'pt' ? 'Passe de Confirmação' : 'Confirmation Voucher'}
                        </span>
                        <span className="text-[9px] text-gray-400">
                          {lang === 'pt' ? 'Apresente este talão à entrada' : 'Present this voucher upon entry'}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">{lang === 'pt' ? 'Tratamento' : 'Treatment'}:</span>
                          <span className="text-white font-bold">{getTherapyName(bookingTherapy)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{lang === 'pt' ? 'Hóspede' : 'Guest'}:</span>
                          <span className="text-white font-bold">{customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{lang === 'pt' ? 'Dia e Hora' : 'Date & Time'}:</span>
                          <span className="text-brand-gold font-bold">
                            {selectedDate} {lang === 'pt' ? 'às' : 'at'} {selectedTime}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{lang === 'pt' ? 'Estado do Pagamento' : 'Payment Status'}:</span>
                          <span className="text-green-400 font-bold">
                            {lang === 'pt' ? '✓ LIQUIDADO' : '✓ SETTLED'}
                          </span>
                        </div>
                      </div>

                      <div className="text-center border-t border-brand-border pt-3">
                        <span className="text-[10px] text-brand-gold tracking-widest uppercase">Omotenashi • Nipon Spa</span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('bookings');
                        }}
                        className="bg-brand-charcoal text-white hover:text-white hover:border-brand-gold border border-brand-border px-5 py-2.5 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        {lang === 'pt' ? 'Visualizar Minhas Reservas' : 'View My Bookings'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('home');
                        }}
                        className="bg-brand-red text-white hover:bg-brand-red-hover px-5 py-2.5 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        {lang === 'pt' ? 'Voltar ao Início' : 'Back to Home'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Treatment & Selection Voucher Summary */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-brand-charcoal border border-brand-border rounded-3xl p-6 space-y-5 sticky top-28">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono border-b border-brand-border/60 pb-3">
                    {lang === 'pt' ? 'Resumo da Reserva Fidedigna' : 'Trusted Booking Voucher Summary'}
                  </h3>

                  <div className="space-y-4">
                    {/* Selected therapy details */}
                    <div className="flex items-start space-x-3.5 border-b border-brand-border/30 pb-4">
                      <div className="w-14 h-14 bg-brand-black border border-brand-border rounded-xl flex items-center justify-center text-brand-red shrink-0 font-mono text-lg font-bold select-none">
                        {bookingTherapy.japaneseName[0]}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block font-mono">
                          {bookingTherapy.japaneseName}
                        </span>
                        <h4 className="font-heading font-light text-sm text-white transition">
                          {getTherapyName(bookingTherapy)}
                        </h4>
                        <span className="text-[9px] text-gray-400 block pb-1">
                          {bookingTherapy.duration} min • {bookingTherapy.price}€
                        </span>
                      </div>
                    </div>

                    {/* Voucher data */}
                    <div className="space-y-2.5 text-xs font-mono">
                      <div className="flex justify-between items-center text-gray-400">
                        <span>{lang === 'pt' ? 'Dia Escolhido:' : 'Selected Day:'}</span>
                        <span className="text-white font-semibold">{selectedDate || '—'}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-400">
                        <span>{lang === 'pt' ? 'Hora Agendada:' : 'Selected Slot:'}</span>
                        <span className="text-brand-gold font-bold">{selectedTime || '—'}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-400 border-t border-brand-border/30 pt-2.5">
                        <span>{lang === 'pt' ? 'Nome do Hóspede:' : 'Guest Name:'}</span>
                        <span className="text-white font-medium truncate max-w-[130px]">{customerName || '—'}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-400">
                        <span>{lang === 'pt' ? 'Telemóvel:' : 'Mobile Phone:'}</span>
                        <span className="text-white font-mono">{customerPhone || '—'}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-400">
                        <span>{lang === 'pt' ? 'Pagamento por:' : 'Method:'}</span>
                        <span className="text-white uppercase font-bold text-[10px]">{paymentMethod}</span>
                      </div>
                    </div>

                    {/* Shinto Omotenashi aesthetic guarantee stamp */}
                    <div className="border-t border-brand-border/60 pt-4 text-center mt-2">
                      <div className="bg-brand-black/40 border border-brand-border/40 p-3 rounded-xl flex flex-col items-center justify-center space-y-1">
                        <span className="text-[14px] text-brand-red font-mono font-bold select-none tracking-widest">御持て成し</span>
                        <span className="text-[8px] text-gray-400 uppercase tracking-widest block font-mono">OMOTENASHI SERVICE VOUCHER</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: USER BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 space-y-8">
            <div className="text-center">
              <span className="text-brand-red font-bold text-xs uppercase tracking-widest block mb-2">{t.accBadge}</span>
              <h1 className="text-3xl font-black text-white font-heading tracking-tight">{t.accTitle}</h1>
              <p className="text-xs text-gray-400 mt-2">
                {t.accDesc}
              </p>
            </div>

            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map(booking => {
                  const correlatedTherapy = THERAPIES.find(t => t.id === booking.therapyId);
                  
                  return (
                    <div 
                      key={booking.id} 
                      className="bg-brand-charcoal border border-brand-border rounded-2xl p-6 space-y-4 hover:border-brand-gold/20 transition relative overflow-hidden"
                    >
                      {/* Premium Shinto Stamp pattern for paid bookings */}
                      {booking.isPaid && (
                        <div className="absolute right-4 top-4 border-2 border-brand-gold/20 font-bold font-heading text-[10px] uppercase tracking-wider text-brand-gold/85 px-2.5 py-1 rounded-lg transform rotate-[-5deg] select-none">
                          {lang === 'pt' ? '✓ PAGO ONLINE' : '✓ PAID ONLINE'}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4">
                        <div className="flex items-start space-x-3.5">
                          <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/35 flex flex-col items-center justify-center shrink-0">
                            <span className="text-brand-red text-xs font-bold font-heading">
                              {correlatedTherapy?.japaneseName || '日'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">ID: {booking.id}</span>
                            <h3 className="font-heading font-extrabold text-white text-base mt-0.5">
                              {correlatedTherapy ? getTherapyName(correlatedTherapy) : (lang === 'pt' ? 'Massagem Tradicional' : 'Traditional Therapy')}
                            </h3>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">
                              {lang === 'pt' ? 'Cliente' : 'Client'}: {booking.customerName} | {lang === 'pt' ? 'Fone' : 'Phone'}: {booking.customerPhone}
                            </p>
                          </div>
                        </div>

                        {/* Date and hour details */}
                        <div className="bg-brand-black border border-brand-border/60 px-4 py-2.5 rounded-xl font-mono text-center shrink-0">
                          <div className="flex items-center space-x-1.5 text-xs text-white justify-center">
                            <CalendarIcon className="w-3.5 h-3.5 text-brand-red" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 text-[11px] text-gray-400 justify-center mt-1">
                            <Clock className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
                            <span>{booking.time} ({correlatedTherapy?.duration || 60} min)</span>
                          </div>
                        </div>
                      </div>

                      {/* Display Payment Detail */}
                      <div className="bg-brand-black/40 border border-brand-border/60 rounded-xl p-3 text-xs flex flex-wrap gap-4 items-center justify-between text-gray-400">
                        <div>
                          {lang === 'pt' ? 'Método de Pagamento' : 'Payment Method'}: <span className="text-white uppercase font-bold">{booking.paymentMethod}</span>
                        </div>
                        {booking.paymentReference && (
                          <div className="font-mono text-[11.5px] text-brand-gold">
                            {booking.paymentMethod === 'multibanco' && `${lang === 'pt' ? 'Entidade' : 'Entity'}: ${booking.paymentReference.entity} | ${lang === 'pt' ? 'Referência' : 'Reference'}: ${booking.paymentReference.reference}`}
                            {booking.paymentMethod === 'mbway' && `${lang === 'pt' ? 'Contacto MBWay' : 'MBWay Contact'}: ${booking.paymentReference.phone}`}
                            {booking.paymentMethod === 'card' && `${lang === 'pt' ? 'Cartão Terminado em' : 'Card Ending in'}: •••• ${booking.paymentReference.cardNumberLast4}`}
                          </div>
                        )}
                      </div>

                      {/* Special info or comments if any */}
                      {booking.specialNotes && (
                        <p className="text-xs text-gray-400 italic bg-brand-gray/30 p-2.5 rounded-lg border-l-2 border-brand-red">
                          "{lang === 'pt' ? 'Nota' : 'Note'}: {booking.specialNotes}"
                        </p>
                      )}

                      {/* Interaction buttons */}
                      <div className="pt-2 flex justify-between items-center">
                        <span className="text-[10px] text-gray-400">
                          {lang === 'pt' ? 'Criado em' : 'Booked on'}: {new Date(booking.createdAt).toLocaleString(lang === 'pt' ? 'pt-PT' : 'en-US')}
                        </span>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              // Reschedule acts by reopening scheduler modal
                              if (correlatedTherapy) {
                                handleOpenBooking(correlatedTherapy);
                              }
                            }}
                            className="text-xs text-gray-300 font-semibold hover:text-brand-gold px-3 py-1.5 rounded bg-brand-gray transition"
                          >
                            {lang === 'pt' ? 'Reagendar' : 'Reschedule'}
                          </button>
                          
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-xs text-brand-red/90 font-semibold hover:text-white px-3 py-1.5 rounded hover:bg-brand-red/25 transition flex items-center space-x-1 border border-brand-red/10"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{lang === 'pt' ? 'Desmarcar' : 'Cancel'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-brand-charcoal border border-brand-border p-12 text-center rounded-3xl space-y-4">
                <div className="w-16 h-16 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarDays className="w-8 h-8" />
                </div>
                <h3 className="text-white font-bold text-lg font-heading">{t.noBookingsTitle}</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  {t.noBookingsDesc}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => { setActiveTab('therapies'); }}
                    className="bg-brand-red text-white text-xs px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider"
                  >
                    {t.btnViewMenu}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: REVIEWS & LEAVE REVIEW */}
        {activeTab === 'reviews' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
            
            {/* Reviews Introduction */}
            <div className="border-b border-brand-border/60 pb-12">
              <div className="text-center lg:text-left space-y-3 p-6 bg-brand-charcoal/20 rounded-2xl border border-brand-border/10">
                <span className="text-brand-red font-bold text-xs uppercase tracking-widest block">
                  {lang === 'pt' ? 'Testemunhos' : 'Testimonials'}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-tight">
                  {lang === 'pt' ? 'O que dizem os nossos clientes' : 'What our clients say'}
                </h1>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {lang === 'pt'
                    ? 'A opinião sincera de quem já vivenciou o autêntico reequilíbrio físico, mental e espiritual Omotenashi.'
                    : 'Honest opinions from those who have experienced our authentic physical, mental, and spiritual Omotenashi realignment.'}
                </p>
              </div>
            </div>

            {/* GOOGLE REVIEWS SHOWCASE SECTION (DARK JAPANESE SPA SEAMLESS INTEGRATION) */}
            <div className="space-y-8 relative overflow-hidden pt-4">
              {/* Subtle design element: stylized Japanese characters for 'harmonious environment' or 'Omotenashi' in delicate watermarked white */}
              <div className="absolute top-4 right-6 opacity-[0.02] font-bold text-6xl md:text-8xl select-none pointer-events-none text-white font-mono tracking-widest">
                和 de 心
              </div>
              
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-brand-border/60 relative z-10 font-sans">
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-2 bg-brand-charcoal/60 px-3 py-1.5 rounded-full border border-brand-border">
                    <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                    <span className="text-[10px] font-mono font-bold text-brand-gold uppercase tracking-widest leading-none">
                      Nipon Spa Telheiras — Google Places
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                        4,8
                      </span>
                      <div className="space-y-1">
                        <div className="flex text-brand-gold">
                          {Array.from({ length: 5 }).map((_, s) => {
                            const starValue = s + 1;
                            const isFull = starValue <= 4;
                            const isHalf = starValue === 5;
                            return (
                              <div key={s} className="relative w-4 h-4">
                                <Star className="w-4 h-4 text-gray-600 stroke-none opacity-30" />
                                {isFull && (
                                  <Star className="absolute top-0 left-0 w-4 h-4 fill-brand-gold stroke-brand-gold" />
                                )}
                                {isHalf && (
                                  <div className="absolute top-0 left-0 w-[80%] h-full overflow-hidden">
                                    <Star className="w-4 h-4 fill-brand-gold stroke-brand-gold" />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold leading-none">
                          {lang === 'pt' ? '4,8/5 no Google' : '4.8/5 on Google'}
                        </p>
                      </div>
                    </div>
                    
                    <span className="text-xs text-gray-400 mt-1 sm:mt-0 font-light">
                      {lang === 'pt' ? 'Com base em 243 opiniões' : 'Based on 243 reviews'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={STATIC_GOOGLE_REVIEWS.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-brand-charcoal/40 hover:bg-brand-charcoal border border-brand-border text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition duration-200"
                  >
                    <span>{lang === 'pt' ? 'Ver avaliações no Google' : 'View Reviews on Google'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                  </a>

                  <a
                    href={STATIC_GOOGLE_REVIEWS.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-brand-red hover:bg-[#cc0000] text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm hover:shadow duration-200"
                  >
                    <Star className="w-3.5 h-3.5 text-white fill-white" />
                    <span>{lang === 'pt' ? 'Deixar Avaliação' : 'Leave a Review'}</span>
                  </a>
                </div>
              </div>

              {/* Up to 5 Review Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 font-sans">
                {(lang === 'pt' ? STATIC_GOOGLE_REVIEWS.reviewsPt : STATIC_GOOGLE_REVIEWS.reviewsEn).map((crit, idx) => (
                  <div 
                    key={idx}
                    className="bg-brand-charcoal/60 border border-brand-border/80 rounded-2xl p-6 flex flex-col justify-between hover:border-brand-border transition duration-350 relative group"
                  >
                    <div className="space-y-4">
                      {/* Name, Avatar & Stars row */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-brand-black border border-brand-border flex items-center justify-center text-brand-gold font-bold text-xs uppercase font-mono shadow-inner shrink-0">
                            {crit.author_name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-heading font-extrabold text-white text-xs leading-tight">{crit.author_name}</h4>
                            <p className="text-[10px] text-gray-500 mt-0.5 leading-none">{crit.relative_time_description}</p>
                          </div>
                        </div>
                        <div className="flex text-brand-gold space-x-0.5 mt-0.5">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star 
                              key={s} 
                              className={`w-3 h-3 ${s < crit.rating ? 'fill-brand-gold stroke-brand-gold' : 'text-gray-700 stroke-transparent'}`} 
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed font-sans font-light italic">
                        "{crit.text}"
                      </p>

                      {crit.reply && (
                        <div className="mt-4 pl-3.5 border-l-2 border-brand-gold/50 bg-brand-black/40 p-3 rounded-r-xl rounded-bl-xl border border-brand-border/30 space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[9px] font-bold font-mono">
                              N
                            </div>
                            <div className="flex items-baseline space-x-2">
                              <span className="text-[10px] font-bold text-white leading-none">
                                {crit.reply.author_name}
                              </span>
                              <span className="text-[8px] text-gray-500 leading-none">
                                {crit.reply.relative_time_description}
                              </span>
                            </div>
                          </div>
                          <p className="text-[10px] text-gray-400 leading-relaxed font-sans whitespace-pre-line">
                            {crit.reply.text}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Google G watermark / Verification badge */}
                    <div className="flex items-center justify-between border-t border-brand-border/40 pt-3.5 mt-4 font-sans">
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest font-bold flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{lang === 'pt' ? 'Avaliação Verificada' : 'Verified Review'}</span>
                      </span>
                      
                      <span className="opacity-30 group-hover:opacity-80 transition duration-200">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB: GALLERY VIEW */}
        {activeTab === 'gallery' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16 animate-fade-in" id="gallery-page">
            <GalleryView lang={lang} />
          </div>
        )}

        {/* TAB 5: ABOUT NIPON SPA (ABOUT US PAGE) */}
        {activeTab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16 animate-fade-in" id="about-page">
            
            {/* TIMELINE, LEGACY AND NEW GENERATION COMPONENT EXPANSION */}
            <LegacyTimelineAndNewGen lang={lang} />

            {/* OUR TEAM OF SPECIALISTS SECTION */}
            <TeamSection lang={lang} />

            {/* BRAND FAQS & SECURITY TRUST STATEMENT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: FAQ Grid */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xs font-bold font-mono text-brand-gold uppercase tracking-widest mb-3">
                    {lang === 'pt' ? 'Perguntas Frequentes • FAQ' : 'Frequently Asked Questions • FAQ'}
                  </h3>
                  <h2 className="text-2xl font-bold font-heading text-white">
                    {lang === 'pt' ? 'Preparar a sua Visita' : 'Preparing For Your Visit'}
                  </h2>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      qPt: 'Com quanta antecedência devo chegar?',
                      qEn: 'How early should I arrive?',
                      aPt: 'Recomendamos que chegue 10 minutos antes do horário marcado para que possamos conversar e entender melhor a necessidade de cada um.',
                      aEn: 'We suggest arriving 10 minutes before your scheduled slot so we can speak and better understand each individual\'s needs.'
                    },
                    {
                      qPt: 'As massagens são indicadas para grávidas ou pessoas com lesões?',
                      qEn: 'Are the massages safe for pregnant clients or those with injuries?',
                      aPt: 'Sim, mas pedimos que indique estas condições no formulário de reserva para adaptarmos óleos ou pressões. Dispomos de terapeutas especialistas licenciados.',
                      aEn: 'Yes. Please document any medical conditions or pregnancy in the booking notes box. Our certified masters will customize the oil blends and physical pressure.'
                    },
                    {
                      qPt: 'Como funcionam os cancelamentos ou reagendamentos?',
                      qEn: 'How do rescheduling or cancellations work?',
                      aPt: 'Pode gerir as suas marcações no painel "As Minhas Reservas" no topo. Os reagendamentos podem ser coordenados de forma gratuita até 24h antes do ritual.',
                      aEn: 'You can monitor and manage your visits from the "My Account" page. Rescheduling can be executed free of charge up to 24 hours prior to the session.'
                    }
                  ].map((faq, idx) => (
                    <div key={idx} className="bg-brand-charcoal border border-brand-border rounded-xl p-5 space-y-2">
                      <span className="text-brand-red font-extrabold text-xs block font-mono font-bold">0{idx + 1}</span>
                      <h4 className="text-sm font-bold text-white font-heading">{lang === 'pt' ? faq.qPt : faq.qEn}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">{lang === 'pt' ? faq.aPt : faq.aEn}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Physical Lisbon details Card */}
              <div className="lg:col-span-5 bg-brand-charcoal border border-brand-border rounded-3xl p-6 md:p-8 space-y-6">
                <div className="border-b border-brand-border/60 pb-4 text-center">
                  <span className="text-[10px] font-bold text-brand-red uppercase tracking-widest block font-mono mb-1">
                    {lang === 'pt' ? 'A Nossa Localização Fidedigna' : 'Our Authentic Lisbon Sanctuary'}
                  </span>
                  <p className="text-xs text-gray-400 font-sans">
                    {lang === 'pt' ? 'Um portal direto para o Japão Zen no coração de Telheiras, Lisboa.' : 'A direct portal to Zen Kyoto right in the heart of Telheiras, Lisbon.'}
                  </p>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-heading mb-0.5">{lang === 'pt' ? 'Endereço:' : 'Address:'}</strong>
                      <span className="text-gray-400 block font-mono">Rua Prista Monteiro, 20 Loja B</span>
                      <span className="text-[9px] text-[#888] font-mono">1600-253 Lisboa, Portugal</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-heading mb-0.5">{lang === 'pt' ? 'Contacto Telefónico:' : 'Direct Telephone:'}</strong>
                      <span className="text-gray-400 font-mono">+351 917 448 484</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-heading mb-0.5">{lang === 'pt' ? 'Correio Eletrónico:' : 'Direct Email:'}</strong>
                      <a href="mailto:nipon@nipon-terapias.com" className="text-gray-400 hover:text-brand-gold font-mono transition duration-150">nipon@nipon-terapias.com</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 6: BLOG TRADICIONAL (BLOG PAGE) */}
        {activeTab === 'blog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16 animate-fade-in" id="blog-page">
            
            {!selectedBlogPost ? (
              // BLOG INDEX / POSTS LIST VIEW
              <div className="space-y-12">
                {/* HERO SECTION - SEM CARD */}
                <div className="relative overflow-hidden pb-10 border-b border-brand-border/40 text-center md:text-left animate-fade-in">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <span className="text-8xl font-black font-mono select-none tracking-widest text-white">読書</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-8 space-y-4">
                      <span className="text-brand-red font-semibold text-xs uppercase tracking-widest block font-mono">
                        {lang === 'pt' ? 'Artigos & Sabedoria • Dokusho' : 'Articles & Wisdom • Dokusho'}
                      </span>
                      <h1 className="text-2xl md:text-4xl font-light text-white font-heading tracking-tight animate-fade-in leading-snug">
                        {lang === 'pt' 
                          ? 'DOKUSHO • Sabedoria Japonesa para uma Vida com Mais Equilíbrio' 
                          : 'DOKUSHO • Japanese Wisdom for a Balanced Life'}
                      </h1>
                      <div className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans max-w-2xl animate-fade-in space-y-2">
                        {lang === 'pt' ? (
                          <>
                            <p>Explore artigos exclusivos sobre terapias japonesas, cultura Omotenashi, rituais ancestrais, bem-estar e filosofia de vida japonesa.</p>
                            <p>Um espaço criado para partilhar o conhecimento que inspira há gerações a missão do Nipon Spa.</p>
                          </>
                        ) : (
                          <>
                            <p>Explore exclusive articles on Japanese therapies, Omotenashi culture, ancestral rituals, wellness, and Japanese philosophy of life.</p>
                            <p>A space created to share the knowledge that has inspired the mission of Nipon Spa for generations.</p>
                          </>
                        )}
                      </div>
                    </div>
 
                    <div className="md:col-span-4 flex justify-center">
                      <div className="w-36 h-36 rounded-full border border-brand-border/30 flex flex-col items-center justify-center p-4 bg-transparent relative">
                        <BookOpen className="w-8 h-8 text-brand-red mb-2 animate-pulse" />
                        <span className="font-mono text-xs text-brand-gold uppercase tracking-widest font-extrabold">DOKUSHO</span>
                        <span className="text-[10px] text-gray-500 font-mono tracking-tighter mt-1">{lang === 'pt' ? 'Leitura Sagrada' : 'Sacred Reading'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BLOG GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {BLOG_POSTS.map((post) => (
                    <div 
                      key={post.id}
                      className="bg-brand-charcoal border border-brand-border flex flex-col hover:border-brand-red/45 transition duration-300 group rounded-3xl overflow-hidden"
                    >
                      {/* Image container */}
                      <div className="relative aspect-video w-full overflow-hidden bg-brand-black border-b border-brand-border">
                        <img 
                          src={post.image} 
                          alt={lang === 'pt' ? post.titlePt : post.titleEn}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition duration-500"
                        />
                        {/* Red stamp */}
                        <div className="absolute top-3 right-3 w-8 h-8 bg-brand-black/85 border border-[#cc0000]/50 flex items-center justify-center text-brand-red font-mono font-bold text-sm rounded-full">
                          {post.kanjiSymbol}
                        </div>
                        {/* Read time badge */}
                        <div className="absolute bottom-3 left-3 bg-brand-black/75 px-2.5 py-1 border border-brand-border text-[9px] font-mono uppercase tracking-widest text-brand-gold rounded-full">
                          {lang === 'pt' ? post.readTimePt : post.readTimeEn}
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-6 flex-1 flex flex-col space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 tracking-wider">
                          <span className="uppercase text-brand-gold">{lang === 'pt' ? post.categoryPt : post.categoryEn}</span>
                          <span>{post.date}</span>
                        </div>

                        <div className="space-y-2 flex-1">
                          <h3 className="text-lg font-medium text-white group-hover:text-brand-red transition duration-200">
                            {lang === 'pt' ? post.titlePt : post.titleEn}
                          </h3>
                          <p className="text-xs text-gray-400 font-sans leading-relaxed line-clamp-3">
                            {lang === 'pt' ? post.excerptPt : post.excerptEn}
                          </p>
                        </div>

                        <button 
                          onClick={() => {
                            setSelectedBlogPost(post);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="pt-2 text-[10px] font-bold text-brand-red font-mono uppercase tracking-widest flex items-center space-x-1 hover:text-white transition duration-200 cursor-pointer self-start"
                        >
                          <span>{lang === 'pt' ? 'Ler Artigo' : 'Read Article'}</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition duration-200" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* EMAIL NEWSLETTER BLOCK */}
                <div className="bg-brand-charcoal border border-brand-border p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6 rounded-3xl">
                  <span className="text-brand-gold font-mono font-bold text-xs uppercase tracking-widest block font-bold">
                    {lang === 'pt' ? 'HOSPITALIDADE POR CORREIO • SHINBUN' : 'HOSPITALITY BY MAIL • SHINBUN'}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-light text-white tracking-wide">
                      {lang === 'pt' ? 'Subscreva as Crónicas do Nipon' : 'Subscribe to Nipon Chronicles'}
                    </h3>
                    <p className="text-xs text-gray-400 max-w-lg mx-auto leading-relaxed">
                      {lang === 'pt' 
                        ? 'Receba pequenos ensaios quinzenais de Quioto, técnicas de redução de stress doméstico e avisos de vagas reservadas prioritárias diretamente no seu e-mail.'
                        : 'Receive bi-weekly essays on Kyoto wisdom, stress reduction hacks, and high-vacancy priority alerts directly in your inbox.'}
                    </p>
                  </div>

                  {blogSubscribed ? (
                    <div className="bg-brand-red/10 border border-[#cc0000] p-4 max-w-md mx-auto animate-fade-in">
                      <span className="text-xs font-mono font-bold text-white block uppercase tracking-widest">
                        {lang === 'pt' ? 'SUBSCRITO COM SUCESSO • ARIGATO' : 'SUBSCRIBED SUCCESSFULLY • ARIGATO'}
                      </span>
                      <span className="text-[11px] text-gray-300 block mt-1">
                        {lang === 'pt' ? 'Obrigado por se juntar à nossa comunidade espiritual.' : 'Thank you for joining our spiritual wellness community.'}
                      </span>
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (blogEmail.trim()) {
                          setBlogSubscribed(true);
                        }
                      }}
                      className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
                    >
                      <input 
                        type="email" 
                        required
                        value={blogEmail}
                        onChange={(e) => setBlogEmail(e.target.value)}
                        placeholder={lang === 'pt' ? 'Insira o seu endereço de e-mail...' : 'Enter your email address...'}
                        className="bg-brand-black border border-brand-border text-white text-xs px-5 py-3 focus:outline-none focus:border-brand-red flex-1 font-mono rounded-full"
                      />
                      <button 
                        type="submit"
                        className="bg-[#cc0000] hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition duration-200 cursor-pointer rounded-full"
                      >
                        {lang === 'pt' ? 'Aderir' : 'Join'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ) : (
              // READ ONE BLOG POST DETAIL VIEW
              <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
                {/* Back Link */}
                <button 
                  onClick={() => {
                    setSelectedBlogPost(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition duration-200 cursor-pointer"
                >
                  <span className="group-hover:-translate-x-1 transition duration-200">←</span>
                  <span>{lang === 'pt' ? 'Voltar para o Blog' : 'Back to Blog'}</span>
                </button>

                {/* Article Header block */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 items-center text-xs font-mono tracking-widest text-[#cc0000] uppercase font-bold">
                    <span>{lang === 'pt' ? selectedBlogPost.categoryPt : selectedBlogPost.categoryEn}</span>
                    <span className="text-gray-600 font-normal">•</span>
                    <span className="text-gray-400 font-normal">{selectedBlogPost.date}</span>
                    <span className="text-gray-600 font-normal">•</span>
                    <span className="text-brand-gold font-normal font-mono lowercase">{lang === 'pt' ? selectedBlogPost.readTimePt : selectedBlogPost.readTimeEn}</span>
                  </div>

                  <h1 className="text-2xl md:text-4xl font-light text-white leading-tight font-heading tracking-tight">
                    {lang === 'pt' ? selectedBlogPost.titlePt : selectedBlogPost.titleEn}
                  </h1>

                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-3xl italic">
                    {lang === 'pt' ? selectedBlogPost.excerptPt : selectedBlogPost.excerptEn}
                  </p>
                </div>

                {/* Banner Media Frame */}
                <div className="relative border border-brand-border aspect-[21/9] w-full overflow-hidden bg-brand-black">
                  <img 
                    src={selectedBlogPost.image} 
                    alt={lang === 'pt' ? selectedBlogPost.titlePt : selectedBlogPost.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80"
                  />
                  {/* Overlay stamped labels */}
                  <div className="absolute top-4 right-4 bg-brand-black/90 p-4 border border-brand-border text-center flex flex-col justify-center items-center min-w-[70px]">
                    <span className="text-2xl text-brand-red font-mono font-bold leading-none">{selectedBlogPost.kanjiSymbol}</span>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-gray-400 mt-1">{selectedBlogPost.japaneseTitle}</span>
                  </div>
                </div>

                {/* Paragraph Bodies */}
                <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed tracking-wide max-w-3xl mt-8">
                  {(lang === 'pt' ? selectedBlogPost.contentPt : selectedBlogPost.contentEn).map((paragraph, index) => {
                    // Make the first paragraph distinct (dropcap-inspired layout)
                    if (index === 0) {
                      return (
                        <p key={index} className="text-[15px] text-white leading-loose font-sans border-l-2 border-[#cc0000] pl-4">
                          {paragraph}
                        </p>
                      );
                    }
                    return (
                      <p key={index}>
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Footer seal signature stamp */}
                <div className="pt-8 border-t border-brand-border flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 border border-[#cc0000]/40 flex items-center justify-center font-mono text-brand-red font-bold text-xs rounded-full">
                      印
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">Autor / Editorial</span>
                      <span className="text-xs text-white font-mono uppercase tracking-widest font-bold">Nipon Spa Temple</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedBlogPost(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="border border-brand-border px-4 py-2 hover:bg-white/5 text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all rounded-full font-mono cursor-pointer"
                  >
                    {lang === 'pt' ? 'Outros Ensaios' : 'Other Essays'}
                  </button>
                </div>

                {/* Related posts */}
                <div className="pt-8 space-y-6 animate-fade-in">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-brand-gold font-bold">
                    {lang === 'pt' ? 'Continue a Ler' : 'Continue Reading'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                    {BLOG_POSTS.filter((post) => post.id !== selectedBlogPost.id).map((post) => (
                      <div 
                        key={post.id} 
                        onClick={() => {
                          setSelectedBlogPost(post);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-brand-charcoal border border-brand-border p-5 flex items-start space-x-4 cursor-pointer hover:border-[#cc0000]/45 transition duration-300 rounded-2xl overflow-hidden"
                      >
                        <div className="w-16 h-16 shrink-0 bg-brand-black border border-brand-border overflow-hidden rounded-xl">
                          <img 
                            src={post.image} 
                            alt={lang === 'pt' ? post.titlePt : post.titleEn}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover grayscale opacity-70"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono uppercase tracking-wider text-brand-gold block">{lang === 'pt' ? post.categoryPt : post.categoryEn}</span>
                          <h5 className="text-xs font-bold text-white leading-snug font-sans line-clamp-1 group-hover:text-brand-red transition duration-200">
                            {lang === 'pt' ? post.titlePt : post.titleEn}
                          </h5>
                          <p className="text-[10px] text-gray-400 line-clamp-1 font-sans">{lang === 'pt' ? post.excerptPt : post.excerptEn}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
          </div>
        )}

        {/* TAB: STAFF PORTAL */}
        {activeTab === 'staff-portal' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12 animate-fade-in" id="staff-workspace">
            
            {/* STAGE 1: LOGIN PAGE */}
            {!isStaffLoggedIn ? (
              <div className="max-w-md mx-auto bg-brand-charcoal border border-brand-border p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <span className="text-6xl font-black font-mono select-none tracking-widest text-white">鍵</span>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-brand-red/10 border border-[#cc0000]/30 flex items-center justify-center mx-auto mb-3">
                    <LogIn className="w-5 h-5 text-brand-red" />
                  </div>
                  <h1 className="text-2xl font-black text-white font-heading tracking-tight">
                    {lang === 'pt' ? 'Acesso de Colaboradores' : 'Staff Portal'}
                  </h1>
                  <p className="text-xs text-gray-400">
                    {lang === 'pt' 
                      ? 'Área reservada para gestão de reservas e auditoria Omotenashi do Nipon Spa Lisboa.' 
                      : 'Reserved workspace for reservation management and Omotenashi auditing at Nipon Spa Lisbon.'}
                  </p>
                </div>

                <form onSubmit={handleStaffLogin} className="space-y-4">
                  {staffError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl text-center font-mono">
                      {staffError}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-gray-400 text-[10px] uppercase font-mono tracking-wider block font-bold">
                      {lang === 'pt' ? 'Utilizador / E-mail' : 'Username / Email'}
                    </label>
                    <input 
                      type="text" 
                      required
                      value={staffUsername}
                      onChange={(e) => setStaffUsername(e.target.value)}
                      placeholder="e.g. staff"
                      className="w-full bg-brand-black border border-brand-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-400 text-[10px] uppercase font-mono tracking-wider block font-bold">
                      {lang === 'pt' ? 'Palavra-passe' : 'Password'}
                    </label>
                    <input 
                      type="password" 
                      required
                      value={staffPassword}
                      onChange={(e) => setStaffPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-brand-black border border-brand-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#cc0000] hover:bg-brand-red-hover text-white py-3.5 rounded-full font-bold uppercase tracking-widest text-xs transition duration-200 cursor-pointer"
                  >
                    {lang === 'pt' ? 'Autenticar Dispositivo' : 'Authenticate Device'}
                  </button>
                </form>

              </div>
            ) : (
              /* STAGE 2: LOGGED IN WORKER WORKSPACE */
              <div className="space-y-8 animate-fade-in">
                
                {/* Upper Greeting Row */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-brand-charcoal border border-brand-border p-6 rounded-3xl gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full border border-brand-red/30 bg-brand-black flex items-center justify-center font-mono text-brand-red font-bold text-lg select-none">
                      管
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold block font-bold">
                        {lang === 'pt' ? 'Administração de Reservas Activa' : 'Active Reservation Management Block'}
                      </span>
                      <h2 className="text-xl font-extrabold text-white font-sans mt-0.5">
                        {lang === 'pt' ? 'Gestão de Agendamentos' : 'Active Appointments Manager'}
                      </h2>
                    </div>
                  </div>

                  <div className="flex space-x-3 w-full md:w-auto">
                    <button
                      onClick={() => setIsAddingManualBooking(!isAddingManualBooking)}
                      className="bg-brand-gold text-brand-black hover:bg-brand-gold-pale px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-1.5 flex-1 md:flex-initial cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-brand-black" />
                      <span>{isAddingManualBooking ? (lang === 'pt' ? 'Fechar Formulário' : 'Close Form') : (lang === 'pt' ? 'Nova Reserva' : 'Manual New Book')}</span>
                    </button>
                    <button
                      onClick={handleStaffLogout}
                      className="bg-brand-black border border-brand-border text-gray-300 hover:text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-1.5 flex-1 md:flex-initial cursor-pointer"
                    >
                      <span>{lang === 'pt' ? 'Terminar Sessão' : 'Log Out'}</span>
                    </button>
                  </div>
                </div>

                {/* Bento Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1: Estimated Billing */}
                  <div className="bg-brand-charcoal border border-brand-border p-5 rounded-3xl flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block font-bold">
                      {lang === 'pt' ? 'Faturação Total (Aprovada)' : 'Gross Settled Revenue'}
                    </span>
                    <div className="mt-4">
                      <span className="text-3xl font-black text-brand-gold font-heading tracking-tight select-all">
                        {bookings.filter(b => b.isPaid).reduce((sum, b) => {
                          const therapy = THERAPIES.find(t => t.id === b.therapyId);
                          return sum + (therapy?.price || 0);
                        }, 0)} €
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {lang === 'pt' ? 'Apenas reservas liquidadas' : 'Settled online/ref payments'}
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Total Sessions */}
                  <div className="bg-brand-charcoal border border-brand-border p-5 rounded-3xl flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block font-bold">
                      {lang === 'pt' ? 'Total de Agendamentos' : 'Registered Bookings'}
                    </span>
                    <div className="mt-4">
                      <span className="text-3xl font-black text-white font-heading tracking-tight select-all">
                        {bookings.length}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {lang === 'pt' ? 'Ativas na base de dados' : 'Active in localized storage'}
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Pending Payments */}
                  <div className="bg-brand-charcoal border border-brand-border p-5 rounded-3xl flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block font-bold">
                      {lang === 'pt' ? 'Agendamentos Pendentes' : 'Pending Approvals'}
                    </span>
                    <div className="mt-4">
                      <span className="text-3xl font-black text-brand-red font-heading tracking-tight">
                        {bookings.filter(b => !b.isPaid).length}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {lang === 'pt' ? 'Aguardando liquidação física' : 'Awaiting counter checkout/cash'}
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Most popular ritual */}
                  <div className="bg-brand-charcoal border border-brand-border p-5 rounded-3xl flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block font-bold">
                      {lang === 'pt' ? 'Ritual de Preferência' : 'Top Choice Ritual'}
                    </span>
                    <div className="mt-4">
                      <span className="text-base font-bold text-white font-sans tracking-tight block truncate">
                        {(() => {
                          if (bookings.length === 0) return 'Nenhum / None';
                          const counts: Record<string, number> = {};
                          bookings.forEach(b => {
                            counts[b.therapyId] = (counts[b.therapyId] || 0) + 1;
                          });
                          let maxId = '';
                          let maxCount = -1;
                          Object.entries(counts).forEach(([id, count]) => {
                            if (count > maxCount) {
                              maxCount = count;
                              maxId = id;
                            }
                          });
                          const th = THERAPIES.find(t => t.id === maxId);
                          return th ? (lang === 'pt' ? th.name : (th.nameEn || th.name)) : 'Personalizado';
                        })()}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {lang === 'pt' ? 'Ritual mais solicitado na época' : 'Most frequent therapeutic service'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* MANUAL RESERVATION FAST FORM */}
                {isAddingManualBooking && (
                  <div className="bg-brand-charcoal border border-brand-red/35 p-6 rounded-3xl space-y-4 animate-fade-in text-left">
                    <div className="flex justify-between items-center border-b border-brand-border pb-3">
                      <div>
                        <h3 className="font-heading font-extrabold text-white text-base">
                          {lang === 'pt' ? 'Adicionar Reserva Manual (Balcão / Telefone)' : 'Add Manual Reservation (Walk-In / Phone)'}
                        </h3>
                        <p className="text-[11px] text-gray-400">
                          {lang === 'pt' ? 'Registe uma reserva diretamente e sincronize imediatamente o calendário do Templo.' : 'Register a booking directly, syncing the Temple availability.'}
                        </p>
                      </div>
                      <button 
                        onClick={() => setIsAddingManualBooking(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Cust Name */}
                      <div className="space-y-1.5">
                        <label className="text-gray-400 text-[10px] uppercase font-mono tracking-wider block font-bold">
                          {lang === 'pt' ? 'Nome do Cliente' : 'Customer Name'}
                        </label>
                        <input 
                          type="text"
                          value={manualCustName}
                          onChange={(e) => setManualCustName(e.target.value)}
                          placeholder="e.g. Satoshi Nakamoto"
                          className="w-full bg-brand-black border border-brand-border rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-red"
                        />
                      </div>

                      {/* Cust Email */}
                      <div className="space-y-1.5">
                        <label className="text-gray-400 text-[10px] uppercase font-mono tracking-wider block font-bold">
                          {lang === 'pt' ? 'E-mail do Cliente' : 'Customer Email'}
                        </label>
                        <input 
                          type="email"
                          value={manualCustEmail}
                          onChange={(e) => setManualCustEmail(e.target.value)}
                          placeholder="satoshi@example.com"
                          className="w-full bg-brand-black border border-brand-border rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                        />
                      </div>

                      {/* Cust Phone */}
                      <div className="space-y-1.5">
                        <label className="text-gray-400 text-[10px] uppercase font-mono tracking-wider block font-bold">
                          {lang === 'pt' ? 'Telefone e Contacto' : 'Customer Contact'}
                        </label>
                        <input 
                          type="text"
                          value={manualCustPhone}
                          onChange={(e) => setManualCustPhone(e.target.value)}
                          placeholder="912 345 678"
                          className="w-full bg-brand-black border border-brand-border rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                        />
                      </div>

                      {/* Chosen Therapy ID */}
                      <div className="space-y-1.5">
                        <label className="text-gray-400 text-[10px] uppercase font-mono tracking-wider block font-bold">
                          {lang === 'pt' ? 'Tratamento / Ritual' : 'Ritual / Treatment'}
                        </label>
                        <select
                          value={manualTherapyId}
                          onChange={(e) => setManualTherapyId(e.target.value)}
                          className="w-full bg-brand-black border border-brand-border rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-red cursor-pointer"
                        >
                          {THERAPIES.map(t => (
                            <option key={t.id} value={t.id}>{getTherapyName(t)} ({t.price}€)</option>
                          ))}
                        </select>
                      </div>

                      {/* Chosen Date */}
                      <div className="space-y-1.5">
                        <label className="text-gray-400 text-[10px] uppercase font-mono tracking-wider block font-bold">
                          {lang === 'pt' ? 'Data' : 'Date'}
                        </label>
                        <input 
                          type="date"
                          value={manualDate}
                          onChange={(e) => setManualDate(e.target.value)}
                          className="w-full bg-brand-black border border-brand-border rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                        />
                      </div>

                      {/* Chosen Time */}
                      <div className="space-y-1.5">
                        <label className="text-gray-400 text-[10px] uppercase font-mono tracking-wider block font-bold">
                          {lang === 'pt' ? 'Horário' : 'Time Slot'}
                        </label>
                        <input 
                          type="time"
                          value={manualTime}
                          onChange={(e) => setManualTime(e.target.value)}
                          className="w-full bg-brand-black border border-brand-border rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                        />
                      </div>

                      {/* Special health notes */}
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-gray-400 text-[10px] uppercase font-mono tracking-wider block font-bold">
                          {lang === 'pt' ? 'Preocupações Médicas / Notas Especiais' : 'Medical Concerns / Notes'}
                        </label>
                        <input 
                          type="text"
                          value={manualSpecialNotes}
                          onChange={(e) => setManualSpecialNotes(e.target.value)}
                          placeholder={lang === 'pt' ? 'e.g. Alergias, grávida de 5 meses' : 'e.g. Back pain, 5 months pregnant'}
                          className="w-full bg-brand-black border border-brand-border rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-red"
                        />
                      </div>

                      {/* Payment values */}
                      <div className="flex flex-wrap items-center gap-6 bg-brand-black/30 border border-brand-border/60 p-3 rounded-xl">
                        <div className="space-y-1">
                          <span className="text-gray-400 text-[9px] uppercase font-mono tracking-wider block">
                            {lang === 'pt' ? 'Método' : 'Method'}
                          </span>
                          <select
                            value={manualPaymentMethod}
                            onChange={(e) => setManualPaymentMethod(e.target.value as PaymentMethod)}
                            className="bg-transparent text-white font-bold text-xs select-none focus:outline-none cursor-pointer"
                          >
                            <option value="card" className="bg-brand-charcoal">CARD</option>
                            <option value="mbway" className="bg-brand-charcoal">MBWAY</option>
                            <option value="multibanco" className="bg-brand-charcoal">MB REF</option>
                          </select>
                        </div>

                        <div className="flex items-center space-x-2 border-l border-brand-border/60 pl-4 h-full">
                          <input 
                            type="checkbox"
                            id="manual_is_paid"
                            checked={manualIsPaid}
                            onChange={(e) => setManualIsPaid(e.target.checked)}
                            className="accent-[#cc0000] w-4 h-4 cursor-pointer"
                          />
                          <label htmlFor="manual_is_paid" className="text-xs text-gray-300 font-semibold cursor-pointer select-none">
                            {lang === 'pt' ? 'Confirmar Pago / Liquidado' : 'Mark as Paid / Confirmed'}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button 
                        type="button"
                        onClick={() => setIsAddingManualBooking(false)}
                        className="bg-brand-black border border-brand-border text-gray-300 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer"
                      >
                        {lang === 'pt' ? 'Cancelar / Fechar' : 'Cancel'}
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          if (!manualCustName.trim()) {
                            alert(lang === 'pt' ? 'Nome do cliente é obrigatório.' : 'Customer name is required.');
                            return;
                          }
                          const newBooking: Booking = {
                            id: `bk-${Math.floor(1000 + Math.random() * 9000)}`,
                            therapyId: manualTherapyId,
                            dateTime: `${manualDate}T${manualTime}:00Z`,
                            date: manualDate,
                            time: manualTime,
                            customerName: manualCustName.trim(),
                            customerEmail: manualCustEmail.trim() || 'walk-in@nipon.example.com',
                            customerPhone: manualCustPhone.trim() || 'Sem contacto telefónico',
                            specialNotes: manualSpecialNotes.trim() || undefined,
                            isPaid: manualIsPaid,
                            paymentMethod: manualPaymentMethod,
                            paymentReference: manualPaymentMethod === 'multibanco' ? { entity: '21054', reference: '992 563 112' } : (manualPaymentMethod === 'mbway' ? { phone: manualCustPhone } : { cardNumberLast4: '9988' }),
                            createdAt: new Date().toISOString()
                          };
                          
                          saveBookingsState([newBooking, ...bookings]);
                          
                          // Reset Form
                          setManualCustName('');
                          setManualCustEmail('');
                          setManualCustPhone('');
                          setManualSpecialNotes('');
                          setManualIsPaid(true);
                          setIsAddingManualBooking(false);
                        }}
                        className="bg-[#cc0000] hover:bg-brand-red-hover text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                      >
                        {lang === 'pt' ? 'Gravar Reserva no Templo' : 'Save Temple Reservation'}
                      </button>
                    </div>
                  </div>
                )}

                {/* SEARCH AND FILTER TOOLS */}
                <div className="bg-brand-charcoal border border-brand-border p-6 rounded-3xl space-y-4 text-left">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-brand-gold font-bold block">
                    {lang === 'pt' ? 'Pesquisa de Clientes e Filtros de Auditoria' : 'Search and Audit Filter Engine'}
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Search query input */}
                    <div className="md:col-span-6 relative">
                      <input 
                        type="text"
                        value={staffSearchQuery}
                        onChange={(e) => setStaffSearchQuery(e.target.value)}
                        placeholder={lang === 'pt' ? 'Procurar por nome, telefone, e-mail, id...' : 'Search by name, phone, email, id...'}
                        className="w-full bg-brand-black border border-brand-border rounded-xl pl-5 p-3 text-xs text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>

                    {/* Status filter select */}
                    <div className="md:col-span-3">
                      <select
                        value={staffStatusFilter}
                        onChange={(e) => setStaffStatusFilter(e.target.value as 'all' | 'paid' | 'pending')}
                        className="w-full bg-brand-black border border-brand-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-red cursor-pointer"
                      >
                        <option value="all">{lang === 'pt' ? 'Todos os Pagamentos' : 'All Payment Options'}</option>
                        <option value="paid">{lang === 'pt' ? 'Aprovado / Pago' : 'Paid & Settled'}</option>
                        <option value="pending">{lang === 'pt' ? 'Pendente de Receber' : 'Pending Payment'}</option>
                      </select>
                    </div>

                    {/* Service/Therapy Filter */}
                    <div className="md:col-span-3">
                      <select
                        value={staffTherapyFilter}
                        onChange={(e) => setStaffTherapyFilter(e.target.value)}
                        className="w-full bg-brand-black border border-brand-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-red cursor-pointer"
                      >
                        <option value="all">{lang === 'pt' ? 'Todos os Rituais' : 'All Spa Treatments'}</option>
                        {THERAPIES.map(t => (
                          <option key={t.id} value={t.id}>{getTherapyName(t)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* THE BOOKING LIST */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-xs text-gray-400 font-mono">
                      {lang === 'pt' ? 'Resultados Encontrados' : 'Reservations matching filters'}: <strong className="text-white">{
                        bookings.filter(b => {
                          const therapy = THERAPIES.find(t => t.id === b.therapyId);
                          const nameMatch = getTherapyName(therapy || THERAPIES[0]).toLowerCase().includes(staffSearchQuery.toLowerCase());
                          const custNameMatch = b.customerName.toLowerCase().includes(staffSearchQuery.toLowerCase());
                          const custEmailMatch = b.customerEmail.toLowerCase().includes(staffSearchQuery.toLowerCase());
                          const custPhoneMatch = b.customerPhone.toLowerCase().includes(staffSearchQuery.toLowerCase());
                          const idMatch = b.id.toLowerCase().includes(staffSearchQuery.toLowerCase());
                          const textMatch = nameMatch || custNameMatch || custEmailMatch || custPhoneMatch || idMatch || staffSearchQuery === '';
                          
                          const statusMatch = staffStatusFilter === 'all' 
                            ? true 
                            : staffStatusFilter === 'paid' ? b.isPaid : !b.isPaid;
                            
                          const therapyMatch = staffTherapyFilter === 'all' 
                            ? true 
                            : b.therapyId === staffTherapyFilter;
                            
                          return textMatch && statusMatch && therapyMatch;
                        }).length
                      }</strong>
                    </span>
                    <button
                      onClick={() => {
                        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookings, null, 2));
                        const downloadAnchor = document.createElement('a');
                        downloadAnchor.setAttribute("href", dataStr);
                        downloadAnchor.setAttribute("download", `nipon_spa_bookings_auto_${new Date().toISOString().split('T')[0]}.json`);
                        document.body.appendChild(downloadAnchor);
                        downloadAnchor.click();
                        downloadAnchor.remove();
                      }}
                      className="text-[10px] text-brand-gold hover:text-white uppercase font-mono tracking-wider underline cursor-pointer"
                    >
                      {lang === 'pt' ? 'Exportar Banco de Dados (JSON)' : 'Export Database (JSON)'}
                    </button>
                  </div>

                  {bookings.filter(b => {
                    const therapy = THERAPIES.find(t => t.id === b.therapyId);
                    const nameMatch = getTherapyName(therapy || THERAPIES[0]).toLowerCase().includes(staffSearchQuery.toLowerCase());
                    const custNameMatch = b.customerName.toLowerCase().includes(staffSearchQuery.toLowerCase());
                    const custEmailMatch = b.customerEmail.toLowerCase().includes(staffSearchQuery.toLowerCase());
                    const custPhoneMatch = b.customerPhone.toLowerCase().includes(staffSearchQuery.toLowerCase());
                    const idMatch = b.id.toLowerCase().includes(staffSearchQuery.toLowerCase());
                    const textMatch = nameMatch || custNameMatch || custEmailMatch || custPhoneMatch || idMatch || staffSearchQuery === '';
                    
                    const statusMatch = staffStatusFilter === 'all' 
                      ? true 
                      : staffStatusFilter === 'paid' ? b.isPaid : !b.isPaid;
                      
                    const therapyMatch = staffTherapyFilter === 'all' 
                      ? true 
                      : b.therapyId === staffTherapyFilter;
                      
                    return textMatch && statusMatch && therapyMatch;
                  }).length === 0 ? (
                    <div className="bg-brand-charcoal border border-brand-border p-12 text-center rounded-3xl space-y-2">
                       <p className="text-gray-400 text-sm font-sans">
                          {lang === 'pt' ? 'Nenhuma reserva encontrada correspondente às opções selecionadas.' : 'No active reservations found matching your search parameters.'}
                       </p>
                       <button
                         onClick={() => { setStaffSearchQuery(''); setStaffStatusFilter('all'); setStaffTherapyFilter('all'); }}
                         className="text-brand-gold hover:text-white text-xs underline font-mono cursor-pointer"
                       >
                         {lang === 'pt' ? 'Limpar Filtros de Pesquisa' : 'Clear All Filters'}
                       </button>
                    </div>
                  ) : (
                    bookings.filter(b => {
                      const therapy = THERAPIES.find(t => t.id === b.therapyId);
                      const nameMatch = getTherapyName(therapy || THERAPIES[0]).toLowerCase().includes(staffSearchQuery.toLowerCase());
                      const custNameMatch = b.customerName.toLowerCase().includes(staffSearchQuery.toLowerCase());
                      const custEmailMatch = b.customerEmail.toLowerCase().includes(staffSearchQuery.toLowerCase());
                      const custPhoneMatch = b.customerPhone.toLowerCase().includes(staffSearchQuery.toLowerCase());
                      const idMatch = b.id.toLowerCase().includes(staffSearchQuery.toLowerCase());
                      const textMatch = nameMatch || custNameMatch || custEmailMatch || custPhoneMatch || idMatch || staffSearchQuery === '';
                      
                      const statusMatch = staffStatusFilter === 'all' 
                        ? true 
                        : staffStatusFilter === 'paid' ? b.isPaid : !b.isPaid;
                        
                      const therapyMatch = staffTherapyFilter === 'all' 
                        ? true 
                        : b.therapyId === staffTherapyFilter;
                        
                      return textMatch && statusMatch && therapyMatch;
                    }).map(booking => {
                      const correlatedTherapy = THERAPIES.find(t => t.id === booking.therapyId);
                      const isEditingThis = editingBookingId === booking.id;
                      
                      return (
                        <div 
                          key={booking.id}
                          className="bg-brand-charcoal border border-brand-border rounded-3xl p-6 hover:border-brand-red/30 transition relative overflow-hidden space-y-4 text-left"
                        >
                          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            
                            <div className="flex items-start space-x-4">
                              <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/35 flex flex-col items-center justify-center font-bold text-center shrink-0">
                                <span className="text-brand-red font-heading text-xs uppercase">{correlatedTherapy?.japaneseName || '日'}</span>
                              </div>
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="bg-brand-black text-[9px] font-mono text-gray-500 border border-brand-border px-2 py-0.5 rounded-full uppercase">ID: {booking.id}</span>
                                  {booking.isPaid ? (
                                    <span className="bg-green-500/15 text-green-400 border border-green-500/30 text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-bold">
                                      {lang === 'pt' ? 'PAGO / LIQUIDADO' : 'PAID & CONFIRMED'}
                                    </span>
                                  ) : (
                                    <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-bold">
                                      {lang === 'pt' ? 'AGUARDANDO PAGAMENTO' : 'PENDING COUNTER'}
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-heading font-extrabold text-white text-base mt-1.5">
                                  {correlatedTherapy ? getTherapyName(correlatedTherapy) : (lang === 'pt' ? 'Ritual Especial' : 'Special Ritual')}
                                </h4>
                                
                                <div className="text-xs text-gray-300 font-sans mt-1.5 space-y-0.5">
                                  <p><span className="text-gray-500 font-mono text-[11px]">{lang === 'pt' ? 'CLIENTE' : 'CLIENT'}:</span> <strong className="text-white select-all">{booking.customerName}</strong></p>
                                  <p><span className="text-gray-500 font-mono text-[11px]">{lang === 'pt' ? 'TELEFONE' : 'PHONE'}:</span> <strong className="text-white select-all">{booking.customerPhone}</strong></p>
                                  <p><span className="text-gray-500 font-mono text-[11px]">EMAIL:</span> <strong className="text-white select-all">{booking.customerEmail}</strong></p>
                                </div>
                              </div>
                            </div>

                            {/* Date, schedule or editor panel */}
                            <div className="bg-brand-black border border-brand-border/60 p-4 rounded-2xl min-w-[200px] text-center space-y-2">
                              {!isEditingThis ? (
                                <>
                                  <div className="text-xs text-white font-mono flex items-center justify-center space-x-1">
                                    <CalendarIcon className="w-3.5 h-3.5 text-brand-red" />
                                    <span>{booking.date}</span>
                                  </div>
                                  <div className="text-xs text-brand-gold font-mono flex items-center justify-center space-x-1">
                                    <Clock className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
                                    <span>{booking.time} ({correlatedTherapy?.duration || 60}min)</span>
                                  </div>
                                  <div className="text-xs text-white font-mono mt-1 font-bold pt-1.5 border-t border-brand-border/30">
                                    {correlatedTherapy?.price || 0} €
                                  </div>
                                </>
                              ) : (
                                <div className="space-y-2 text-left">
                                  <span className="text-[9px] uppercase tracking-wider font-mono text-brand-gold font-bold block">{lang === 'pt' ? 'Alterar Data e Hora' : 'Modify Slot'}</span>
                                  <input 
                                    type="date"
                                    value={editingBookingDate}
                                    onChange={(e) => setEditingBookingDate(e.target.value)}
                                    className="w-full bg-brand-charcoal border border-brand-border rounded-lg p-1.5 text-[11px] text-white font-mono focus:outline-none"
                                  />
                                  <input 
                                    type="time"
                                    value={editingBookingTime}
                                    onChange={(e) => setEditingBookingTime(e.target.value)}
                                    className="w-full bg-brand-charcoal border border-brand-border rounded-lg p-1.5 text-[11px] text-white font-mono focus:outline-none"
                                  />
                                  <div className="flex space-x-1.5 pt-1">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = bookings.map(b => {
                                          if (b.id === booking.id) {
                                            return { ...b, date: editingBookingDate, time: editingBookingTime };
                                          }
                                          return b;
                                        });
                                        saveBookingsState(updated);
                                        setEditingBookingId(null);
                                      }}
                                      className="bg-green-500 hover:bg-green-600 text-white text-[10px] uppercase font-bold py-1 px-2.5 rounded-md flex-1 text-center cursor-pointer"
                                    >
                                      {lang === 'pt' ? 'Gravar' : 'Save'}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setEditingBookingId(null)}
                                      className="bg-brand-gray text-gray-300 text-[10px] uppercase font-bold py-1 px-1.5 rounded-md text-center cursor-pointer"
                                    >
                                      {lang === 'pt' ? 'Voltar' : 'Back'}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                          </div>

                          {/* Extra info notes or payment types */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-brand-black/40 border border-brand-border/60 rounded-2xl p-3 text-xs gap-4">
                            <div className="space-y-1">
                              <span className="text-gray-500 uppercase tracking-wider font-mono text-[9px] block">
                                {lang === 'pt' ? 'Método Prévio Registado' : 'Originally Set Method'}
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-white uppercase">{booking.paymentMethod}</span>
                                {booking.paymentReference && (
                                  <span className="text-brand-gold font-mono text-[11px]">
                                    {booking.paymentMethod === 'mbway' && `[MBWAY: ${booking.paymentReference.phone}]`}
                                    {booking.paymentMethod === 'multibanco' && `[ENT: ${booking.paymentReference.entity} | REF: ${booking.paymentReference.reference}]`}
                                    {booking.paymentMethod === 'card' && `[Card: •••• ${booking.paymentReference.cardNumberLast4}]`}
                                  </span>
                                )}
                              </div>
                            </div>

                            {booking.specialNotes && (
                              <div className="text-xs text-red-300 italic bg-brand-red/5 px-3 py-1.5 rounded-lg border-l-2 border-brand-red max-w-sm">
                                <strong className="font-mono text-[10px] uppercase text-brand-red block tracking-wide font-extrabold text-left">🚨 {lang === 'pt' ? 'OBSERVAÇÃO / NOTA DO UTENTE' : 'GUEST NOTES'}</strong>
                                "{booking.specialNotes}"
                              </div>
                            )}
                          </div>

                          {/* Interactive staff actions bar */}
                          <div className="border-t border-brand-border/30 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                            <span className="text-[9px] text-gray-400 font-mono">
                              {lang === 'pt' ? 'Inserção em Base de Dados em' : 'Requested securely via client on'}: {new Date(booking.createdAt).toLocaleString(lang === 'pt' ? 'pt-PT' : 'en-US')}
                            </span>

                            <div className="flex flex-wrap gap-2 justify-end w-full sm:w-auto">
                              {/* Toggle Payment */}
                              <button
                                onClick={() => {
                                  const updated = bookings.map(b => {
                                    if (b.id === booking.id) {
                                      return { ...b, isPaid: !b.isPaid };
                                    }
                                    return b;
                                  });
                                  saveBookingsState(updated);
                                }}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition duration-200 cursor-pointer ${
                                  booking.isPaid 
                                    ? 'bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/50 text-yellow-500' 
                                    : 'bg-green-500/10 hover:bg-green-500/20 border border-green-500/50 text-green-400'
                                }`}
                              >
                                {booking.isPaid ? (lang === 'pt' ? 'Marcar como Pendente' : 'Mark Unpaid') : (lang === 'pt' ? 'Confirmar como Pago' : 'Mark as Paid')}
                              </button>

                              {/* Reschedule toggle */}
                              <button
                                onClick={() => {
                                  if (isEditingThis) {
                                    setEditingBookingId(null);
                                  } else {
                                    setEditingBookingId(booking.id);
                                    setEditingBookingDate(booking.date);
                                    setEditingBookingTime(booking.time);
                                  }
                                }}
                                className="bg-brand-gray hover:bg-brand-gray/80 text-white px-4 py-2 rounded-full text-xs font-semibold cursor-pointer"
                              >
                                {isEditingThis ? (lang === 'pt' ? 'Cancelar Edição' : 'Cancel Edit') : (lang === 'pt' ? 'Reagendar Horário' : 'Reschedule')}
                              </button>

                              {/* Copy info */}
                              <button 
                                onClick={() => {
                                  const summary = `NIPON SPA RESERVA ID: ${booking.id}\nCliente: ${booking.customerName}\nContacto: ${booking.customerPhone}\nRitual: ${correlatedTherapy ? getTherapyName(correlatedTherapy) : 'Shiatsu'}\nAgendamento: ${booking.date} as ${booking.time}\nValor: ${correlatedTherapy?.price || 0}€ - ${booking.isPaid ? 'PAGO' : 'PENDENTE DE PAGAMENTO'}`;
                                  navigator.clipboard.writeText(summary);
                                  alert(lang === 'pt' ? 'Detalhes copiados para a área de transferência!' : 'Details copied to clipboard!');
                                }}
                                className="bg-brand-charcoal border border-brand-border hover:bg-white/5 text-gray-300 px-3.5 py-2.5 rounded-full text-xs font-semibold cursor-pointer flex items-center justify-center"
                                title="Copiar Detalhes"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>

                              {/* Remove/Cancel Booking */}
                              <button
                                onClick={() => {
                                  const confirmMsg = lang === 'pt' 
                                    ? `Deseja mesmo cancelar permanentemente a marcação ID: ${booking.id} do cliente ${booking.customerName}?`
                                    : `Are you sure you want to delete reservation ID: ${booking.id} for ${booking.customerName}?`;
                                  if (window.confirm(confirmMsg)) {
                                    const updated = bookings.filter(b => b.id !== booking.id);
                                    saveBookingsState(updated);
                                  }
                                }}
                                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-400 px-3.5 py-2.5 rounded-full text-xs transition duration-200 cursor-pointer flex items-center justify-center"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* Focus Treatment Detail Selector Modal */}
      <AnimatePresence>
        {selectedFocusArea && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white border border-gray-200 rounded-3xl max-w-4xl w-full my-8 overflow-hidden flex flex-col shadow-2xl relative text-gray-900"
            >
              {/* Modal Header */}
              <div className="bg-gray-50 p-6 md:p-8 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] text-[#cc0000] font-mono uppercase tracking-[0.25em] mb-1 font-bold">
                    <span>{lang === 'pt' ? 'Foco do Tratamento' : 'Treatment Focus'}</span>
                    <span>•</span>
                    <span>{lang === 'pt' ? selectedFocusArea.badgePt : selectedFocusArea.badgeEn}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-light text-gray-900 font-heading tracking-tight">
                    {lang === 'pt' ? selectedFocusArea.titlePt : selectedFocusArea.titleEn}
                  </h2>
                </div>
                
                <button 
                  onClick={() => setSelectedFocusArea(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 flex items-center justify-center transition border border-gray-200 hover:border-brand-red cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body: Levels Options */}
              <div className="p-6 md:p-8 space-y-8 overflow-y-auto max-h-[70vh]">
                <p className="text-xs text-gray-600 leading-relaxed max-w-2xl font-sans">
                  {lang === 'pt' ? selectedFocusArea.descPt : selectedFocusArea.descEn}
                </p>

                <div className="space-y-6">
                  <h3 className="text-[10px] font-bold text-[#cc0000] uppercase tracking-[0.2em] block font-mono border-b border-gray-200 pb-2">
                    {lang === 'pt' ? 'Selecione a Duração & Intensidade Ideal' : 'Select Your Ideal Duration & Intensity'}
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {selectedFocusArea.levels.map((level) => {
                      return (
                        <div 
                          key={level.id}
                          className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:bg-gray-100/50 transition-all duration-300 flex flex-col justify-between text-left group hover:border-[#cc0000]/40 hover:shadow-sm"
                        >
                          <div className="space-y-4">
                            {/* Duration badge and Price */}
                            <div className="flex justify-between items-center">
                              <span className="bg-brand-red/10 border border-brand-red/30 text-brand-red text-[10px] px-2.5 py-0.5 rounded-full font-mono tracking-wider font-extrabold">
                                {level.duration} min
                              </span>
                              <span className="text-lg font-bold text-gray-950 font-sans">
                                {level.price}€
                              </span>
                            </div>

                            {/* Level Name & Description */}
                            <div className="space-y-1.5">
                              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#cc0000] transition duration-200">
                                {lang === 'pt' ? level.namePt : level.nameEn}
                              </h4>
                              <p className="text-[11px] text-gray-600 leading-relaxed min-h-[60px]">
                                {lang === 'pt' ? level.descPt : level.descEn}
                              </p>
                            </div>

                            {/* Expected Outcomes */}
                            <div className="space-y-1.5 pt-3 border-t border-gray-200">
                              <span className="text-[8px] font-bold text-[#cc0000] uppercase tracking-widest block font-mono">
                                {lang === 'pt' ? 'Resultados' : 'Outcomes'}
                              </span>
                              {(lang === 'pt' ? level.resultsPt : level.resultsEn).map((res, idx) => (
                                <div key={idx} className="flex items-start space-x-2">
                                  <span className="text-[#cc0000] text-xs font-bold leading-none mt-0.5">✓</span>
                                  <span className="text-[10px] text-gray-700 font-sans leading-tight">{res}</span>
                                </div>
                              ))}
                            </div>

                            {/* Therapeutic Benefits */}
                            <div className="space-y-1.5 pt-3 border-t border-gray-200">
                              <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block font-mono">
                                {lang === 'pt' ? 'Benefícios' : 'Benefits'}
                              </span>
                              {(lang === 'pt' ? level.benefitsPt : level.benefitsEn).map((ben, idx) => (
                                <div key={idx} className="flex items-start space-x-2">
                                  <span className="text-gray-400 text-xs leading-none">—</span>
                                  <span className="text-[10px] text-gray-600 font-sans leading-tight">{ben}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* CTA Button */}
                          <div className="pt-5 mt-5 border-t border-gray-200">
                            <button
                              onClick={() => {
                                // Find corresponding global therapy from static database matching duration/id
                                const mappedTherapy = THERAPIES.find(t => t.id === level.id) || THERAPIES[0];
                                
                                // Set the state so DOC.pt iframe loads pre-selections
                                setBookingTherapy(mappedTherapy);
                                setSelectedFocusArea(null);
                                setActiveTab('reservar');
                                
                                // Scroll to reserving element
                                setTimeout(() => {
                                  const el = document.getElementById('reservar-page');
                                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }, 150);
                              }}
                              className="w-full bg-[#cc0000] hover:bg-brand-red-hover text-white py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition duration-300 flex items-center justify-center space-x-1 cursor-pointer"
                            >
                              <CalendarIcon className="w-3 h-3" />
                              <span>{lang === 'pt' ? 'Agendar' : 'Book Now'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Old Booking Interactive Modal (Disabled in favor of Dedicated Page) */}
      <AnimatePresence>
        {false && bookingTherapy && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-brand-charcoal border border-brand-border rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
            >
              
              {/* Modal Banner Header */}
              <div className="bg-brand-black p-6 border-b border-brand-border flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs text-brand-gold font-bold uppercase tracking-wider mb-0.5">
                    <span>{bookingTherapy.japaneseName}</span>
                    <span>•</span>
                    <span>{lang === 'pt' ? 'Terapia Premium' : 'Premium Therapy'}</span>
                  </div>
                  <h2 className="text-lg font-black text-white font-heading">
                    {lang === 'pt' ? 'Processo de Reserva' : 'Booking Process'}: {getTherapyName(bookingTherapy)}
                  </h2>
                </div>
                
                <button 
                  onClick={() => {}}
                  className="w-8 h-8 rounded-full bg-brand-gray text-gray-400 hover:text-white flex items-center justify-center transition focus:outline-none border border-brand-border"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Booking Progress Indicator */}
              <div className="bg-brand-gray/60 px-6 py-3 border-b border-brand-border text-xs flex items-center justify-between">
                {[
                  { step: 1, title: lang === 'pt' ? 'Agenda' : 'Schedule' },
                  { step: 2, title: lang === 'pt' ? 'Identificação' : 'Identification' },
                  { step: 3, title: lang === 'pt' ? 'Simulação' : 'Simulation' },
                  { step: 4, title: lang === 'pt' ? 'Confirmado' : 'Confirmed' }
                ].map(item => (
                  <div key={item.step} className="flex items-center space-x-1.5">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${bookingStep >= item.step ? 'bg-brand-red text-white' : 'bg-brand-black text-gray-500 border border-brand-border'}`}>
                      {item.step}
                    </span>
                    <span className={bookingStep >= item.step ? 'text-white font-semibold' : 'text-gray-500'}>
                      {item.title}
                    </span>
                    {item.step < 4 && <ChevronRight className="w-3 h-3 text-brand-border" />}
                  </div>
                ))}
              </div>

              {/* Active Step Content scrollable area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">

                {/* STEP 1: DATE & TIME SELECT */}
                {bookingStep === 1 && (
                  <div className="space-y-6">
                    {/* TREATMENT CHOOSE DROPDOWN */}
                    <div className="bg-brand-black/40 border border-brand-border/60 p-4 rounded-2xl space-y-2">
                      <label className="text-[10px] text-gray-400 font-mono uppercase block tracking-widest" htmlFor="therapy-booking-selector">
                        {lang === 'pt' ? 'Escolha o seu Ritual Tradicional' : 'Select your Traditional Ritual'}
                      </label>
                      <select
                        id="therapy-booking-selector"
                        value={bookingTherapy.id}
                        onChange={(e) => {
                          const therapy = THERAPIES.find(t => t.id === e.target.value);
                          if (therapy) {
                            setBookingTherapy(therapy);
                          }
                        }}
                        className="w-full bg-brand-black border border-brand-border text-white text-xs px-3 py-2.5 rounded-xl focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-sans cursor-pointer"
                      >
                        {THERAPIES.map(t => (
                          <option key={t.id} value={t.id} className="bg-brand-charcoal text-white py-1">
                            {getTherapyName(t)} — {t.duration} min ({t.price}€)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white mb-2 font-heading">{lang === 'pt' ? '1. Selecione o Dia Disponível' : '1. Select Available Day'}</h4>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
                        {datesList.map(item => {
                          const slots = generateAvailableSlots(item.dateString);
                          const isFullyBooked = slots.length === 0;
                          const isLowVacancy = slots.length > 0 && slots.length < 4;
                          
                          let statusLabel = lang === 'pt' ? 'Livre' : 'Free';
                          let statusColor = 'text-green-400 border-green-500/20';
                          if (isFullyBooked) {
                            statusLabel = lang === 'pt' ? 'Cheio' : 'Full';
                            statusColor = 'text-red-500 border-red-500/10 opacity-60';
                          } else if (isLowVacancy) {
                            statusLabel = lang === 'pt' ? 'Vagas' : 'Slots';
                            statusColor = 'text-brand-gold border-brand-gold/25';
                          }

                          return (
                            <button
                              key={item.dateString}
                              type="button"
                              disabled={isFullyBooked}
                              onClick={() => handleSelectDate(item.dateString)}
                              className={`border p-2 rounded-xl flex flex-col items-center justify-between min-h-[75px] transition focus:outline-none ${selectedDate === item.dateString ? 'bg-brand-red/15 border-brand-red text-white ring-1 ring-brand-red' : 'bg-brand-black hover:border-gray-500 border-brand-border text-gray-300'} ${isFullyBooked ? 'cursor-not-allowed border-brand-border/30 bg-transparent' : ''}`}
                            >
                              <span className="text-[9px] uppercase tracking-wider text-gray-400">
                                {lang === 'pt' ? item.weekday.slice(0, 3) : item.weekdayEn.slice(0, 3)}
                              </span>
                              <span className="text-base font-extrabold font-mono mt-0.5">{item.dayNum}</span>
                              <span className="text-[8px] tracking-widest text-[#949494]">
                                {lang === 'pt' ? item.monthName : item.monthNameEn}
                              </span>
                              
                              <span className={`text-[8px] font-bold uppercase tracking-wider border px-1.5 py-0.2 rounded mt-1 bg-brand-black/80 ${statusColor}`}>
                                {statusLabel}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white mb-3 font-heading">
                        {lang === 'pt' ? `2. Selecione o Horário (${generateAvailableSlots(selectedDate).length} vagas livres)` : `2. Select Time (${generateAvailableSlots(selectedDate).length} free slots)`}
                      </h4>
                      
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {generateAvailableSlots(selectedDate).map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 rounded-lg font-mono text-xs font-semibold focus:outline-none border transition ${selectedTime === time ? 'bg-gradient-to-r from-brand-red to-brand-darkred text-white border-brand-red' : 'bg-brand-black text-gray-300 border-brand-border hover:border-gray-500'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>

                      {generateAvailableSlots(selectedDate).length === 0 && (
                        <p className="text-xs text-brand-red mt-2">{lang === 'pt' ? 'Nenhum horário disponível para o dia selecionado. Por favor mude a data acima.' : 'No slots available for the selected day. Please select another date.'}</p>
                      )}
                    </div>

                    {/* Sticky Footer for action inside modal */}
                    <div className="pt-4 border-t border-brand-border flex justify-between items-center bg-brand-charcoal">
                      <span className="text-xs text-gray-400">
                        {lang === 'pt' ? 'Preço do Ritual' : 'Ritual Price'}: <strong className="text-white font-sans text-sm">{bookingTherapy.price}€</strong>
                      </span>
                      <button
                        type="button"
                        disabled={!selectedDate || !selectedTime}
                        onClick={handleConfirmDateTime}
                        className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {lang === 'pt' ? 'Próximo Passo' : 'Next Step'}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: CUSTOMER IDENTIFICATION FORM */}
                {bookingStep === 2 && (
                  <form onSubmit={handleConfirmCustomerDetails} className="space-y-6">
                    <div className="bg-brand-black/35 p-4 rounded-xl border border-brand-border/60 text-xs text-gray-300 flex items-start space-x-2.5">
                      <Info className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <div>
                        {lang === 'pt' ? (
                          <>Você está a agendar o ritual <strong className="text-white">{getTherapyName(bookingTherapy)}</strong> para o dia <strong className="text-white">{selectedDate}</strong> às <strong className="text-white">{selectedTime}</strong>. Por favor insira as suas credenciais reais.</>
                        ) : (
                          <>You are booking the ritual <strong className="text-white">{getTherapyName(bookingTherapy)}</strong> on <strong className="text-white">{selectedDate}</strong> at <strong className="text-white">{selectedTime}</strong>. Please enter your direct contact information.</>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">{lang === 'pt' ? 'Nome Completo' : 'Full Name'}</label>
                        <input 
                          type="text" 
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder={lang === 'pt' ? 'Ex: Manuel Antunes de Sousa' : 'e.g. John Doe'} 
                          className="w-full bg-brand-black border border-brand-border rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                        />
                      </div>

                      {/* Contact Channels Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">{lang === 'pt' ? 'Endereço de E-mail' : 'Email Address'}</label>
                          <input 
                            type="email" 
                            required
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder="Ex: cliente@nipon-terapias.com" 
                            className="w-full bg-brand-black border border-brand-border rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                          />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">{lang === 'pt' ? 'Telemóvel (Formato PT)' : 'Mobile Phone (PT Format)'}</label>
                          <input 
                            type="tel" 
                            required
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder="Ex: 912 345 678" 
                            className="w-full bg-brand-black border border-brand-border rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                          />
                        </div>
                      </div>

                      {/* Special health notes */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">{lang === 'pt' ? 'Observações de Saúde ou Preferências (Opcional)' : 'Health Notes or Preferences (Optional)'}</label>
                        <textarea 
                          rows={3}
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          placeholder={lang === 'pt' ? 'Ex: Lesões nas costas, preferência por terapeuta senhora, grávida, alergia a algum óleo...' : 'e.g. Back injuries, preference for female therapist, pregnant, oil allergies...'} 
                          className="w-full bg-brand-black border border-brand-border rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                        />
                      </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="pt-4 border-t border-brand-border flex justify-between">
                      <button
                        type="button"
                        onClick={() => setBookingStep(1)}
                        className="text-xs font-semibold text-gray-400 hover:text-white hover:underline focus:outline-none"
                      >
                        {lang === 'pt' ? 'Voltar à Agenda' : 'Back to Calendar'}
                      </button>

                      <button
                        type="submit"
                        className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition duration-200"
                      >
                        {lang === 'pt' ? 'Escolher Pagamento' : 'Select Payment'}
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: INTEGRATED SIMULATED PAYMENT (MBWay / Multibanco / Card options) */}
                {bookingStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-2 font-heading">{lang === 'pt' ? 'Escolha o Método de Pagamento Conforme a sua Preferência' : 'Choose Your Preferred Payment Method'}</h4>
                      <p className="text-xs text-gray-400">
                        {lang === 'pt' ? 'O Nipon Spa utiliza encriptação de ponta. Escolha um dos métodos abaixo. Por favor, lembre-se que se trata de uma simulação integrada.' : 'Nipon Spa uses secure high-grade encryption. Choose a service below. Note: this is an integrated checkout simulation.'}
                      </p>
                    </div>

                    {/* Integrated Selector */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'mbway', label: 'MBWay', desc: lang === 'pt' ? 'Telemóvel' : 'Mobile No.' },
                        { id: 'multibanco', label: 'Multibanco', desc: lang === 'pt' ? 'Ent./Ref.' : 'Entity/Ref.' },
                        { id: 'card', label: lang === 'pt' ? 'Cartão de Crédito' : 'Credit Card', desc: 'Visa/Mastercard' }
                      ].map(method => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => {
                            setPaymentMethod(method.id as PaymentMethod);
                            if (method.id === 'multibanco') {
                              setGeneratedRef(generateMockReference(bookingTherapy.price));
                            }
                            setIsProcessingPayment(false);
                          }}
                          className={`border p-4 rounded-xl flex flex-col items-center justify-center text-center transition focus:outline-none ${paymentMethod === method.id ? 'bg-brand-red/10 border-brand-red text-white' : 'bg-brand-black border-brand-border text-gray-400 hover:border-gray-500'}`}
                        >
                          <span className="font-heading font-extrabold text-sm text-white uppercase">{method.label}</span>
                          <span className="text-[9px] text-gray-400 mt-1">{method.desc}</span>
                        </button>
                      ))}
                    </div>

                    {/* TAB PAY 3A: MBWAY PANEL */}
                    {paymentMethod === 'mbway' && (
                      <div className="bg-brand-black/40 border border-brand-border rounded-xl p-5 space-y-4">
                        <div className="text-center max-w-sm mx-auto space-y-2">
                          <span className="text-[10px] font-bold text-blue-400 tracking-widest block uppercase">{lang === 'pt' ? 'Serviço Expresso' : 'Express Service'}</span>
                          <h5 className="font-bold text-sm text-white">{lang === 'pt' ? 'Pagamento Instantâneo via MBWay' : 'Instant Payment via MBWay'}</h5>
                          <p className="text-[11px] text-gray-400">
                            {lang === 'pt' ? (
                              <>Será enviada uma notificação para o telemóvel associado <strong className="text-white">{customerPhone || 'digitado'}</strong> correspondente ao valor de <strong className="text-white">{bookingTherapy.price}€</strong>.</>
                            ) : (
                              <>A notification will be sent to the associated mobile phone <strong className="text-white">{customerPhone || 'entered'}</strong> for the amount of <strong className="text-white">{bookingTherapy.price}€</strong>.</>
                            )}
                          </p>
                        </div>

                        {!isProcessingPayment ? (
                          <div className="pt-2 text-center">
                            <button
                              type="button"
                              onClick={handleTriggerMBWayPay}
                              className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition duration-200"
                            >
                              {lang === 'pt' ? 'Enviar Notificação de Pagamento' : 'Send Payment Notification'}
                            </button>
                          </div>
                        ) : (
                          <div className="bg-brand-charcoal border border-brand-red/20 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-3.5">
                            {/* Simple animated radar circle */}
                            <div className="relative flex items-center justify-center">
                              <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-brand-red/30 opacity-75"></span>
                              <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white text-[11px] font-bold font-mono">
                                {paymentCountdown}s
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-xs text-white font-semibold">{lang === 'pt' ? 'Notificação pendente na app MBWay...' : 'Notification pending in MBWay app...'}</p>
                              <p className="text-[10px] text-gray-400 mt-1">{lang === 'pt' ? 'Por favor aceda à aplicação no telemóvel e autorize o débito para concluir e confirmar o seu agendamento.' : 'Please open the app on your mobile phone and authorize the debit to complete and confirm your booking.'}</p>
                            </div>

                            {/* Simulated approval button for sandbox */}
                            <button
                              type="button"
                              onClick={handleSimulateMBWayApprove}
                              className="bg-brand-gold text-brand-black hover:bg-brand-gold-pale px-4 py-2 rounded-lg text-[10px] font-extrabold uppercase tracking-widest transition duration-150"
                            >
                              {lang === 'pt' ? '✓ Simular Aprovação MBWay' : '✓ Simulate MBWay Approval'}
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB PAY 3B: MULTIBANCO PANEL */}
                    {paymentMethod === 'multibanco' && generatedRef && (
                      <div className="bg-brand-black/40 border border-brand-border rounded-xl p-5 space-y-4">
                        <div className="text-center max-w-sm mx-auto">
                          <h5 className="font-bold text-sm text-white">{lang === 'pt' ? 'Referências para Pagamento' : 'Payment References'}</h5>
                          <p className="text-[11px] text-gray-400 mt-1">
                            {lang === 'pt' ? 'Pode pagar num terminal Caixa Multibanco ou através do Homebanking do seu banco (Pagamento de Serviços).' : 'You can pay at any Multibanco ATM terminal or via your bank\'s Homebanking portal (Payment of Services).'}
                          </p>
                        </div>

                        {/* Interactive invoice box */}
                        <div className="bg-brand-charcoal border border-brand-border rounded-xl p-4 space-y-3 font-mono text-xs max-w-xs mx-auto">
                          <div className="flex justify-between border-b border-brand-border pb-1.5">
                            <span className="text-gray-400">{lang === 'pt' ? 'Entidade' : 'Entity'}:</span>
                            <span className="text-white font-bold">{generatedRef.entity}</span>
                          </div>
                          
                          <div className="flex justify-between border-b border-brand-border pb-1.5 items-center">
                            <span className="text-gray-400">{lang === 'pt' ? 'Referência' : 'Reference'}:</span>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-brand-gold font-bold">{generatedRef.reference}</span>
                              <button 
                                onClick={() => copyRefToClipboard(generatedRef.reference.replace(/\s/g, ''))}
                                className="text-gray-400 hover:text-white p-1"
                                title={lang === 'pt' ? 'Copiar Referência' : 'Copy Reference'}
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex justify-between pb-1">
                            <span className="text-gray-400">{lang === 'pt' ? 'Valor' : 'Amount'}:</span>
                            <span className="text-white font-bold">{generatedRef.value} €</span>
                          </div>
                        </div>

                        <div className="bg-brand-charcoal/60 p-3 rounded-xl border border-brand-border text-[10px] text-gray-400 flex items-start space-x-1.5">
                          <Info className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                          <span>{lang === 'pt' ? <>Nota: O seu horário na agenda tradicional ficará pré-bloqueado durante <strong className="text-white">2 horas</strong>. Após este período sem liquidação, a vaga é automaticamente libertada.</> : <>Note: Your select slot will be pre-blocked on our traditional agenda for <strong className="text-white">2 hours</strong>. After this unpaid timeline, the spot is automatically released.</>}</span>
                        </div>

                        <div className="pt-2 text-center">
                          <button
                            type="button"
                            onClick={finalizeBooking}
                            className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition duration-200"
                          >
                            {lang === 'pt' ? 'Confirmar Pagamento Realizado (Simulado)' : 'Confirm Payment Done (Simulated)'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TAB PAY 3C: CREDIT CARD WITH LIVE INTERACTIVE VISUAL FLIP */}
                    {paymentMethod === 'card' && (
                      <div className="bg-brand-black/40 border border-brand-border rounded-xl p-5 space-y-6">
                        
                        {/* Interactive flipping credit card */}
                        <div className="flex justify-center">
                          <div 
                            className={`w-full max-w-[320px] h-[190px] rounded-2xl relative transition-all duration-500 transform ${isCardFlipped ? 'rotate-y-180' : ''}`}
                            style={{ 
                              perspective: '1000px',
                              transformStyle: 'preserve-3d',
                              transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                            }}
                          >
                            {/* FRONT SIDE */}
                            <div 
                              className="absolute inset-0 bg-gradient-to-br from-[#121111] via-[#1c1112] to-[#2b080b] rounded-2xl p-5 border border-brand-border flex flex-col justify-between shadow-lg"
                              style={{ backfaceVisibility: 'hidden' }}
                            >
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <span className="text-[9px] text-brand-gold uppercase tracking-widest block font-bold">Nipon Spa VIP Card</span>
                                  <div className="w-10 h-7 bg-brand-red/20 rounded-md border border-brand-red/40 relative"></div>
                                </div>
                                <Flower2 className="w-8 h-8 text-brand-red" />
                              </div>

                              <div className="space-y-4">
                                <p className="font-mono text-sm sm:text-base tracking-widest text-white">
                                  {cardNumber || '•••• •••• •••• ••••'}
                                </p>
                                
                                <div className="flex justify-between items-end">
                                  <div>
                                    <span className="text-[7px] text-gray-400 uppercase tracking-wider block">Hóspede</span>
                                    <span className="font-heading text-xs tracking-wide text-gray-200 uppercase truncate max-w-[150px] inline-block font-bold">
                                      {customerName || 'NOME COMPLETO'}
                                    </span>
                                  </div>
                                  
                                  <div>
                                    <span className="text-[7px] text-gray-400 uppercase tracking-wider block">Validade</span>
                                    <span className="font-mono text-[11px] text-white">
                                      {cardExpiry || 'MM/AA'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* BACK SIDE */}
                            <div 
                              className="absolute inset-0 bg-gradient-to-br from-[#0c0505] to-[#140b0c] rounded-2xl border border-brand-border flex flex-col justify-between py-5 shadow-lg"
                              style={{ 
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)'
                              }}
                            >
                              <div className="w-full h-10 bg-black mt-2"></div>
                              <div className="px-5 space-y-4 text-right">
                                <div className="inline-block">
                                  <span className="text-[6px] text-gray-400 uppercase tracking-wider block mb-1">{lang === 'pt' ? 'Assinatura Autorizada' : 'Authorized Signature'}</span>
                                  <div className="bg-white/10 px-3 py-1 rounded border border-white/20 flex items-center justify-end font-mono text-xs italic text-white min-w-[70px]">
                                    {cardCVV || 'CVV'}
                                  </div>
                                </div>
                                <p className="text-[7px] text-gray-500 leading-tight">{lang === 'pt' ? 'Este cartão é estritamente pessoal. O titular beneficia de 10% de desconto adicional na adesão anual.' : 'This credit card is strictly personal. The holder benefits from an additional 10% discount on annual subscriptions.'}</p>
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Traditional form fields with triggers */}
                        <div className="space-y-4 pt-2">
                          {/* Card Number input */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">{lang === 'pt' ? 'Número do Cartão' : 'Card Number'}</label>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-gray-400"><CreditCard className="w-4 h-4" /></span>
                              <input 
                                type="text" 
                                required
                                value={cardNumber}
                                onFocus={() => setIsCardFlipped(false)}
                                onChange={(e) => {
                                  const text = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                                  setCardNumber(text.slice(0, 19));
                                }}
                                placeholder="4532 9845 1124 0930" 
                                className="w-full bg-brand-black border border-brand-border rounded-lg pl-9 p-2.5 text-xs text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {/* Card Expiry */}
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">{lang === 'pt' ? 'Validade (MM/AA)' : 'Expiry (MM/YY)'}</label>
                              <input 
                                type="text" 
                                required
                                value={cardExpiry}
                                onFocus={() => setIsCardFlipped(false)}
                                onChange={(e) => {
                                  const text = e.target.value.replace(
                                    /^([1-9]\/|[2-9])$/g, '0$1/' // add prefix zero
                                  ).replace(
                                    /^(0[1-9]|1[0-2])$/g, '$1/' // add slash after month
                                  ).replace(
                                    /^(0[1-9]|1[0-2])\/([0-9]{2})$/g, '$1/$2' // enforce structure
                                  );
                                  setCardExpiry(text.slice(0, 5));
                                }}
                                placeholder="12/28" 
                                className="w-full bg-brand-black border border-brand-border rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                              />
                            </div>

                            {/* Card CVV */}
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">{lang === 'pt' ? 'Código CVV' : 'CVV Code'}</label>
                              <input 
                                type="password" 
                                required
                                value={cardCVV}
                                onFocus={() => setIsCardFlipped(true)}
                                onBlur={() => setIsCardFlipped(false)}
                                onChange={(e) => {
                                  const text = e.target.value.replace(/\D/g, '');
                                  setCardCVV(text.slice(0, 3));
                                }}
                                placeholder="•••" 
                                className="w-full bg-brand-black border border-brand-border rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                              />
                            </div>
                          </div>

                          <div className="pt-2 text-center">
                            <button
                              type="button"
                              onClick={finalizeBooking}
                              className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded-xl transition duration-200"
                            >
                              {lang === 'pt' ? `Pagar ${bookingTherapy.price}€ de Forma Segura` : `Pay ${bookingTherapy.price}€ Securely`}
                            </button>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="pt-4 border-t border-brand-border flex justify-between">
                      <button
                        type="button"
                        onClick={() => setBookingStep(2)}
                        className="text-xs font-semibold text-gray-400 hover:text-white hover:underline focus:outline-none"
                      >
                        {lang === 'pt' ? 'Voltar aos Dados Pessoais' : 'Back to Personal Info'}
                      </button>
                    </div>

                  </div>
                )}

                {/* STEP 4: BOOKING CONFIRMED SCREEN */}
                {bookingStep === 4 && (
                  <div className="text-center py-6 space-y-6">
                    <div className="relative w-20 h-20 bg-brand-gold/10 border-2 border-brand-gold rounded-full flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-10 h-10 text-brand-gold animate-bounce" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold text-white font-heading px-1">
                        {lang === 'pt' ? 'Agendamento Realizado com Sucesso!' : 'Booking Completed Successfully!'}
                      </h3>
                      <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                        {lang === 'pt' ? (
                          <>Excelente escolha! A sua meditação/ritual está registada de forma fidedigna. Enviámos as instruções detalhadas de preparação para o seu endereço de e-mail <strong className="text-white">{customerEmail}</strong>.</>
                        ) : (
                          <>Excellent choice! Your authentic ritual is securely registered. We have sent prep suggestions to your email address <strong className="text-white">{customerEmail}</strong>.</>
                        )}
                      </p>
                    </div>

                    {/* Styled Voucher Paper Ticket */}
                    <div className="bg-brand-black border border-brand-border rounded-2xl p-5 text-left font-mono text-xs max-w-md mx-auto space-y-4">
                      <div className="text-center border-b border-brand-border pb-3">
                        <span className="text-brand-red font-bold uppercase tracking-widest block text-[10px]">
                          {lang === 'pt' ? 'Passe de Confirmação' : 'Confirmation Voucher'}
                        </span>
                        <span className="text-[9px] text-gray-400">
                          {lang === 'pt' ? 'Apresente este talão à entrada' : 'Present this voucher upon entry'}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">{lang === 'pt' ? 'Tratamento' : 'Treatment'}:</span>
                          <span className="text-white font-bold">{getTherapyName(bookingTherapy)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{lang === 'pt' ? 'Hóspede' : 'Guest'}:</span>
                          <span className="text-white font-bold">{customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{lang === 'pt' ? 'Dia e Hora' : 'Date & Time'}:</span>
                          <span className="text-brand-gold font-bold">
                            {selectedDate} {lang === 'pt' ? 'às' : 'at'} {selectedTime}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{lang === 'pt' ? 'Estado do Pagamento' : 'Payment Status'}:</span>
                          <span className="text-green-400 font-bold">
                            {lang === 'pt' ? '✓ LIQUIDADO' : '✓ SETTLED'}
                          </span>
                        </div>
                      </div>

                      <div className="text-center border-t border-brand-border pt-3">
                        <span className="text-[10px] text-brand-gold tracking-widest uppercase">Omotenashi • Nipon Spa</span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('bookings');
                        }}
                        className="bg-brand-charcoal text-white hover:text-white hover:border-brand-gold border border-brand-border px-5 py-2.5 rounded-lg text-xs font-semibold transition"
                      >
                        {lang === 'pt' ? 'Visualizar Minhas Reservas' : 'View My Bookings'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {}}
                        className="bg-brand-red text-white hover:bg-brand-red-hover px-5 py-2.5 rounded-lg text-xs font-semibold transition"
                      >
                        {lang === 'pt' ? 'Voltar ao Menu' : 'Back to Menu'}
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Aesthetic Sophisticated Footer */}
      <footer className="bg-brand-charcoal border-t border-brand-border/95 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Column 1: Editorial Description */}
            <div className="space-y-4">
              <NiponLogo layout="vertical" circleSize={48} inverse={true} className="items-start" />
              <p className="text-xs text-gray-400 leading-relaxed font-sans mt-2">
                {lang === 'pt'
                  ? 'Uma autêntica fusão entre o silêncio budista do Japão imperial e a reabilitação física contemporânea. Dedicação estrita à hospitalidade pura.'
                  : 'An authentic fusion between the Buddhist silence of imperial Japan and contemporary physical rehabilitation. Strict dedication to pure hospitality.'
                }
              </p>
              
              <div className="pt-2 text-brand-gold text-[10px] uppercase tracking-widest font-heading font-medium">
                ★ 5.0 ({lang === 'pt' ? 'Google Maps Lisboa' : 'Google Maps Lisbon'})
              </div>
            </div>

            {/* Column 2: Contacts */}
            <div>
              <h5 className="text-white font-bold font-heading uppercase tracking-widest text-xs mb-4">
                {lang === 'pt' ? 'Central de Reservas' : 'Booking Center'}
              </h5>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-brand-red shrink-0" />
                  <a href="tel:+351917448484" className="hover:text-white font-mono">917 448 484</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-brand-red shrink-0" />
                  <a href="mailto:nipon@nipon-terapias.com" className="hover:text-white font-mono underline truncate font-sans">nipon@nipon-terapias.com</a>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-brand-red shrink-0" />
                  <span className="text-gray-300">Rua Prista Monteiro, 20 Loja B, 1600-253 Lisboa</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Hours & Traditional note */}
            <div className="space-y-4">
              <h5 className="text-white font-bold font-heading uppercase tracking-widest text-xs mb-4">
                {lang === 'pt' ? 'Protocolo de Apoio' : 'Guest Support Protocol'}
              </h5>
              <div className="text-xs text-gray-400 leading-relaxed font-sans space-y-2">
                {lang === 'pt' ? (
                  <>
                    <p className="text-gray-300 font-semibold uppercase tracking-wider text-[10px] text-brand-gold">Horário de Funcionamento</p>
                    <ul className="space-y-0.5 font-mono text-[11px]">
                      <li>Segunda a Sexta: <span className="text-white font-bold">11:00h às 20:00h</span></li>
                      <li>Sábados: <span className="text-white font-bold">10:00h às 17:00h</span></li>
                      <li>Domingos: <span className="text-brand-red font-bold">Encerrado</span></li>
                    </ul>
                    <p className="pt-1 text-[11px]">Recomenda-se a chegada 10 minutos antes do início do tratamento.</p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-300 font-semibold uppercase tracking-wider text-[10px] text-brand-gold">Opening Hours</p>
                    <ul className="space-y-0.5 font-mono text-[11px]">
                      <li>Mon to Fri: <span className="text-white font-bold">11:00 to 20:00</span></li>
                      <li>Saturdays: <span className="text-white font-bold">10:00 to 17:00</span></li>
                      <li>Sundays: <span className="text-brand-red font-bold">Closed</span></li>
                      </ul>
                    <p className="pt-1 text-[11px]">We highly recommend arriving 10 minutes prior to your booking.</p>
                  </>
                )}
              </div>
              
              <div className="text-[10px] text-brand-gold/60 font-mono">
                © {new Date().getFullYear()} Nipon Spa. {lang === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
              </div>
            </div>

          </div>

          {/* Bottom border brand label */}
          <div className="border-t border-brand-border/40 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <span className="hover:text-gray-300 cursor-pointer">{lang === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}</span>
              <span>•</span>
              <span className="hover:text-gray-300 cursor-pointer">{lang === 'pt' ? 'Termos de Reserva' : 'Booking Terms'}</span>
              <span>•</span>
              <a 
                href="https://www.livroreclamacoes.pt/Inicio/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gray-300 cursor-pointer"
              >
                {lang === 'pt' ? 'Livro de Reclamações' : 'Complaints Book'}
              </a>
              <span>•</span>
              <span onClick={() => { setActiveTab('staff-portal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-red font-bold cursor-pointer text-brand-gold">{lang === 'pt' ? 'Área do Staff' : 'Staff Portal'}</span>
            </div>
            
            <p className="font-mono text-[10px] uppercase">
              {lang === 'pt' ? 'Estilo Tradicional Shinto Premium' : 'Traditional Shinto Premium Style'}
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
