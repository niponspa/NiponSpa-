/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Therapy, Review } from './types';

export const THERAPIES: Therapy[] = [
  // 1. Protocolos Personalizados
  {
    id: 'protocol-30',
    name: 'Alívio Rápido - Protocolo Personalizado',
    nameEn: 'Quick Relief - Personalized Protocol',
    japaneseName: '速攻緩和',
    description: 'Tratamento express com foco na descompressão rápida da sua zona de principal desconforto (ex: costas, pescoço ou pernas). Ideal para agendas preenchidas ou alívio instantâneo.',
    descriptionEn: 'Express session focusing on rapid decompression of your main area of discomfort (e.g., back, neck, or legs). Ideal for busy agendas.',
    duration: 30,
    price: 45,
    benefits: [
      'Revitalização e bem-estar para o seu dia a dia',
      'Desativação de pontos de gatilho de stress agudo',
      'Atuação ultra-focada na zona de maior queixa'
    ],
    benefitsEn: [
      'Revitalization and well-being for your day-to-day',
      'Deactivation of acute stress trigger points',
      'Ultra-focused relief on your primary area of concern'
    ],
    results: [
      'Costas leves e sem peso acumulado',
      'Alívio instantâneo da rigidez no pescoço',
      'Aumento imediato de vitalidade física'
    ],
    resultsEn: [
      'Light back free of heavy stiffness',
      'Instant relief of neck tension',
      'Immediate boost in physical vitality'
    ],
    category: 'personalized'
  },
  {
    id: 'protocol-60',
    name: 'Equilíbrio Profundo - Protocolo Personalizado',
    nameEn: 'Deep Balance - Personalized Protocol',
    japaneseName: '深い調和',
    description: 'A nossa terapia de equilíbrio por excelência. Uma massagem de assinatura adaptada rigorosamente às suas necessidades do dia, combinando acupressão oriental e fluidez corporal.',
    descriptionEn: 'Our signature balance therapy. A bespoke treatment tailored strictly to your needs of the day, blending Eastern acupressure and therapeutic flow.',
    duration: 60,
    price: 75,
    benefits: [
      'Harmonia profunda entre o corpo e a mente',
      'Realinhamento do fluxo de energia vital (Ki)',
      'Acalmia profunda do sistema cognitivo e nervoso'
    ],
    benefitsEn: [
      'Deep harmony between body and mind',
      'Realigns the flow of vital energy (Ki)',
      'Soothes the central nervous and cognitive system'
    ],
    results: [
      'Relaxamento muscular e mental profundo',
      'Descompressão de tensões generalizadas',
      'Qualidade de sono incrivelmente restaurada'
    ],
    resultsEn: [
      'Deep physical and mental relaxation',
      'Decompression of generalized body tension',
      'Incredibly restored sleep quality'
    ],
    category: 'personalized'
  },
  {
    id: 'protocol-90',
    name: 'Experiência Completa - Protocolo Personalizado',
    nameEn: 'Complete Experience - Personalized Protocol',
    japaneseName: '完全体験',
    description: 'O teto máximo da personalização de bem-estar. Inicia com um escalda-pés reconfortante e segue para um tratamento de corpo inteiro integrando pedras quentes e alongamento terapêutico.',
    descriptionEn: 'The absolute pinnacle of personalized wellness. Begins with a soothing foot bath and merges into a full-body journey with hot volcanic stones.',
    duration: 90,
    price: 110,
    benefits: [
      'Renovação profunda e relaxamento em todos os sentidos',
      'Combinação terapêutica de calor vulcânico e toques reflexos',
      'Inclui esfoliação plantar expressa com sais térmicos'
    ],
    benefitsEn: [
      'Profound renewal and relaxation in all senses',
      'Therapeutic fusion of volcanic warmth and reflex touch',
      'Includes express foot scrub with therapeutic thermal salts'
    ],
    results: [
      'Sensação de renascer físico e espiritual absoluto',
      'Nutrição muscular térmica profunda de tecidos moles',
      'Desconexão total do stress quotidiano'
    ],
    resultsEn: [
      'Absolute physical and spiritual rebirth',
      'Deep thermal muscle nourishment of soft tissues',
      'Complete disconnection from daily stress'
    ],
    category: 'personalized'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Cláudia Vasconcelos',
    rating: 5,
    comment: 'Uma autêntica viagem ao Japão sem sair de Lisboa! O tratamento Claridade de Sakura deixou a minha pele divinal, com um brilho de porcelana incrível. O espaço cheira a madeira de Hinoki quente e os terapeutas cuidam de nós com um acolhimentoOmotenashi autêntico. Divinal!',
    date: '2026-06-02',
    serviceReceived: 'Claridade de Sakura & Hidratação de Lótus'
  },
  {
    id: 'rev-2',
    author: 'António Silva',
    rating: 5,
    comment: 'Estava com contraturas muito severas nas costas devido ao stress de escritório. Optei pelo Shiatsu Clínico e admito que as dores no pescoço e lombar desapareceram totalmente. Muito focado no resultado físico real.',
    date: '2026-05-28',
    serviceReceived: 'Shiatsu Clínico & Alívio de Dores'
  },
  {
    id: 'rev-3',
    author: 'Yuki Sato',
    rating: 5,
    comment: 'Fidelidade absoluta aos onsens sagrados de Quioto! A qualidade das pedras terapêuticas e a essência natural de Hinoki são de excelência. Um trabalho extraordinário de relaxamento muscular que atinge o equilíbrio profundo.',
    date: '2026-05-15',
    serviceReceived: 'Ritual Onsen de Pedras Vulcânicas'
  },
  {
    id: 'rev-4',
    author: 'Beatriz Costa',
    rating: 5,
    comment: 'Fiz a massagem Kobi-Bihada Modeladora recomendada para diminuir a retenção de líquidos e o resultado é imediato. Sinto as pernas extremamente leves e desinchadas. Além de estético, o toque corporal é ultrarrelaxante!',
    date: '2026-04-30',
    serviceReceived: 'Kobi-Bihada Modeladora & Drenagem'
  }
];

export function generateAvailableSlots(dateString: string): string[] {
  // Parse YYYY-MM-DD safely to avoid local timezone shifts
  const parts = dateString.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const d = new Date(year, month, day);
  const dayOfWeek = d.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  
  if (dayOfWeek === 0) {
    // Sunday is Closed
    return [];
  }
  
  let slots: string[] = [];
  if (dayOfWeek === 6) {
    // Saturday: 10:00 - 17:00
    slots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  } else {
    // Monday to Friday: 11:00 - 20:00
    slots = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  }

  const charSum = dateString.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return slots.filter((_, index) => {
    return (charSum + index * 17) % 4 !== 0;
  });
}

export function generateMockReference(price: number) {
  const code = Math.floor(100000000 + Math.random() * 900000000);
  const refString = code.toString().replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
  return {
    entity: '21249',
    reference: refString,
    value: price.toFixed(2)
  };
}
