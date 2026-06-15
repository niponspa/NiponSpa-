import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Filter, Eye, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: number;
  category: 'zen' | 'water' | 'therapy' | 'omotenashi';
  titlePt: string;
  titleEn: string;
  descPt: string;
  descEn: string;
  imgUrl: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    category: 'zen',
    titlePt: 'Ofuro Traditional de Madeira',
    titleEn: 'Traditional Wooden Ofuro Bath',
    descPt: 'Banheira artesanal de imersão feita para relaxamento profundo com infusões aromáticas e óleos essenciais de cedro.',
    descEn: 'Artisanal soaking tub designed for deep relaxation with aromatic cedar infusions and essential oils.',
    imgUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    category: 'therapy',
    titlePt: 'Tatami Clássico & Presso-acupuntura',
    titleEn: 'Classic Tatami & Pressure Point Therapy',
    descPt: 'Sala de terapia revestida de tatami tradicional para aplicação de Shiatsu e técnicas ancestrais de alongamento.',
    descEn: 'Traditional tatami-lined therapy room for Shiatsu and ancestral stretching techniques.',
    imgUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    category: 'omotenashi',
    titlePt: 'Acolhimento Matcha de Boas-vindas',
    titleEn: 'Matcha Welcome Greeting',
    descPt: 'Cerimónia tradicional onde servimos o Matcha orgânico preparado com Chasen de bambu antes do início de cada ritual.',
    descEn: 'Traditional ceremony serving organic Matcha prepared with bamboo Chasen before starting each ritual.',
    imgUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    category: 'water',
    titlePt: 'Templo de Banho & Cristais de Sal',
    titleEn: 'Bath Temple & Salt Crystals',
    descPt: 'Alinhamento térmico com sais sagrados de banho e vapor de lavanda para desintoxicação física e mental.',
    descEn: 'Thermal alignment with sacred bath salts and lavender steam for physical and mental detoxification.',
    imgUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    category: 'zen',
    titlePt: 'Sala de Meditação e Incenso',
    titleEn: 'Incense & Meditation Inner Sanctuary',
    descPt: 'Ambiente climatizado e decorado com incenso natural japonês, ideal para acalmar as ondas cerebrais antes da terapia.',
    descEn: 'Climatized space styled with natural Japanese incense, ideal to transition the brain into restoration before therapies.',
    imgUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    category: 'therapy',
    titlePt: 'Alinhamento Aromático com Hinoki',
    titleEn: 'Aromatic Hinoki Alignment',
    descPt: 'Aplicação síncrona de óleos biológicos quentes de Hinoki japonês, proporcionando alívio a tensões miofasciais crónicas.',
    descEn: 'Synchronous application of warm bio Hinoki wood oil, providing fast relief for chronic myofascial tension.',
    imgUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 7,
    category: 'omotenashi',
    titlePt: 'Pequenos Detalhes de Conforto',
    titleEn: 'Small Comfort Details',
    descPt: 'Símbolos sutis do respeito japonês e do silêncio contemplativo que curam o espírito sem palavras.',
    descEn: 'Subtle symbols of Japanese respect and contemplative silence, healing the spirit without words.',
    imgUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 8,
    category: 'water',
    titlePt: 'Ritual de Imersão em Furo de Pedra',
    titleEn: 'Stone Bath Immersion Ritual',
    descPt: 'Imersão purificadora em pedra natural basáltica esculpida, mantida em temperatura terapêutica constante de 39°C.',
    descEn: 'Purifying immersion in carved natural basaltic stone, maintained at a therapeutic temperature of 39°C.',
    imgUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80'
  }
];

interface GalleryViewProps {
  lang: 'pt' | 'en';
}

export default function GalleryView({ lang }: GalleryViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'zen' | 'water' | 'therapy' | 'omotenashi'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const filterLabels = {
    all: lang === 'pt' ? 'Todos os Espaços' : 'All Spaces',
    zen: lang === 'pt' ? 'Espaço Zen & Conforto' : 'Zen & Comfort',
    water: lang === 'pt' ? 'Rituais de Água' : 'Water Rituals',
    therapy: lang === 'pt' ? 'Terapias & Shiatsu' : 'Therapies & Shiatsu',
    omotenashi: lang === 'pt' ? 'Detalhes Omotenashi' : 'Omotenashi Details'
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    const nextIndex = (selectedPhotoIndex + 1) % filteredItems.length;
    setSelectedPhotoIndex(nextIndex);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    const prevIndex = (selectedPhotoIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedPhotoIndex(prevIndex);
  };

  return (
    <div className="space-y-12 animate-fade-in py-6">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-brand-red font-mono font-bold text-xs uppercase tracking-widest block">
          {lang === 'pt' ? 'A Atmosfera Sagrada' : 'Our Sacred Atmosphere'}
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white font-heading tracking-tight leading-none">
          {lang === 'pt' ? 'Galeria Japonesa Nipon' : 'Nipon Japanese Gallery'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
          {lang === 'pt'
            ? 'Faça uma viagem visual antes de agendar a sua imersão. Descubra as texturas orgânicas de madeira Hinoki, as bacias de pedra natural e os rituais purificadores dedicados ao relaxamento puro.'
            : 'Take an atmospheric preview journey before reserving your physical alignment. Discover cedarwood organic textures, original stone basins, and sacred silent spaces dedicated to pure restoration.'}
        </p>
        <div className="flex justify-center pt-2">
          <span className="h-[2px] w-12 bg-brand-red inline-block"></span>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto px-4">
        {(Object.keys(filterLabels) as Array<'all' | 'zen' | 'water' | 'therapy' | 'omotenashi'>).map((categoryKey) => {
          const isActive = activeFilter === categoryKey;
          return (
            <button
              key={categoryKey}
              onClick={() => {
                setActiveFilter(categoryKey);
                setSelectedPhotoIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase border transition duration-300 cursor-pointer ${
                isActive
                  ? 'bg-brand-red/10 border-[#cc0000] text-white font-extrabold shadow-sm'
                  : 'bg-brand-charcoal border-brand-border text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              {filterLabels[categoryKey]}
            </button>
          );
        })}
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const title = lang === 'pt' ? item.titlePt : item.titleEn;
            const desc = lang === 'pt' ? item.descPt : item.descEn;
            
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className="bg-brand-charcoal border border-brand-border/80 hover:border-brand-red/40 rounded-3xl overflow-hidden group cursor-pointer transition flex flex-col justify-between"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-black">
                  <img
                    src={item.imgUrl}
                    alt={title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 duration-700 ease-in-out"
                  />
                  {/* Subtle Japanese Theme Accent Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-60 group-hover:opacity-75 transition duration-500"></div>
                  
                  {/* Zoom Icon Action Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center transform scale-90 group-hover:scale-100 transition duration-300">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="absolute top-3 left-3 bg-brand-black/70 backdrop-blur-md text-[9px] font-mono font-bold uppercase tracking-widest text-[#d4af37] px-2.5 py-1 rounded-sm border border-brand-border duration-300">
                    {item.category === 'zen' ? 'Zen Space' : item.category === 'water' ? 'Hydrology' : item.category === 'therapy' ? 'Shiatsu' : 'Omotenashi'}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-5 text-left space-y-2 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold font-heading text-white tracking-tight group-hover:text-brand-red transition duration-300">
                      {title}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-sans line-clamp-2 mt-1 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                  
                  <div className="border-t border-brand-border/40 pt-3 flex items-center justify-between text-gray-500 font-mono text-[9px]">
                    <span className="uppercase text-[8px] tracking-widest">Nipon Spa Tradicional</span>
                    <Sparkles className="w-3 h-3 text-brand-red group-hover:animate-pulse" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Interactive Lightbox Slider Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && filteredItems[selectedPhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-black/98 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 md:p-8"
          >
            {/* Top Bar controls */}
            <div className="flex items-center justify-between max-w-7xl w-full mx-auto pb-4 border-b border-brand-border/40">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse"></span>
                <span className="text-xs uppercase font-mono tracking-widest text-gray-400">
                  {lang === 'pt' ? 'Visualização Imersiva Ouro' : 'Gold Immersive Lightroom'}
                </span>
                <span className="text-[10px] bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-2 py-0.5 rounded font-mono">
                  {selectedPhotoIndex + 1} / {filteredItems.length}
                </span>
              </div>
              
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-brand-border cursor-pointer transition duration-305"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle Main Content Slider */}
            <div className="flex-grow flex items-center justify-between max-w-7xl w-full mx-auto relative px-2 py-4">
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                className="absolute xl:relative left-4 xl:left-0 z-10 w-12 h-12 rounded-full bg-brand-charcoal/80 hover:bg-brand-red/90 text-white flex items-center justify-center border border-brand-border hover:border-transparent transition cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Slider Image frame */}
              <div className="flex-grow max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh] flex items-center justify-center px-4 md:px-12">
                <motion.img
                  key={filteredItems[selectedPhotoIndex].id}
                  src={filteredItems[selectedPhotoIndex].imgUrl}
                  alt={lang === 'pt' ? filteredItems[selectedPhotoIndex].titlePt : filteredItems[selectedPhotoIndex].titleEn}
                  referrerPolicy="no-referrer"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-brand-border"
                />
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute xl:relative right-4 xl:right-0 z-10 w-12 h-12 rounded-full bg-brand-charcoal/80 hover:bg-brand-red/90 text-white flex items-center justify-center border border-brand-border hover:border-transparent transition cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption detail & call to action */}
            <div className="max-w-4xl w-full mx-auto border-t border-brand-border/40 pt-6 text-center space-y-3">
              <h2 className="text-lg sm:text-2xl font-bold font-heading text-white">
                {lang === 'pt' ? filteredItems[selectedPhotoIndex].titlePt : filteredItems[selectedPhotoIndex].titleEn}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed">
                {lang === 'pt' ? filteredItems[selectedPhotoIndex].descPt : filteredItems[selectedPhotoIndex].descEn}
              </p>
              
              <div className="pt-2">
                <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest select-none">
                  一期一会 • O Caminho da Calma Interior Japonesa
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
