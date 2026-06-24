/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogPost {
  id: string;
  titlePt: string;
  titleEn: string;
  excerptPt: string;
  excerptEn: string;
  contentPt: string[];
  contentEn: string[];
  categoryPt: string;
  categoryEn: string;
  date: string;
  readTimePt: string;
  readTimeEn: string;
  image: string;
  kanjiSymbol: string;
  japaneseTitle: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'matcha-ritual',
    titlePt: 'O Ritual do Chá Matcha: Mais do que uma Bebida, um Caminho para a Calma Interior',
    titleEn: 'The Matcha Ritual: More Than a Drink, a Pathway to Inner Calm',
    excerptPt: 'Descubra a ciência e a espiritualidade por trás da preparação do chá matcha e como essa tradição ajuda a focar a mente e harmonizar a alma.',
    excerptEn: 'Discover the science and spirituality behind matcha tea preparation, and how this tradition focuses the mind and harmonizes the soul.',
    categoryPt: 'Tradição',
    categoryEn: 'Tradition',
    date: '2026-06-10',
    readTimePt: '5 min de leitura',
    readTimeEn: '5 min read',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',
    kanjiSymbol: '茶',
    japaneseTitle: '茶の湯',
    contentPt: [
      'A cerimónia do chá japonesa, conhecida como Chanoyu ou Chado ("O Caminho do Chá"), é uma das expressões culturais mais refinadas do Japão tradicional. Longe de ser apenas um simples lanche ou formalidade social, cada gesto é projetado para cultivar a atenção plena total (mindfulness) e a conexão espiritual.',
      'No final de cada tratamento no Nipon Spa, servimos uma taça de chá matcha biológico preparado com o tradicional batedor de bambu (Chasen). Este ritual não é puramente estético; possui razões profundas ligadas à transição pós-terapêutica do hóspede.',
      'Diferente do café, que desencadeia picos rápidos de adrenalina e ansiedade, o matcha contém uma concentração excecional de L-teanina. Este aminoácido único atravessa a barreira hematoencefálica e estimula a produção de ondas cerebrais alfa, induzindo um estado de alerta focado e relaxamento corporal profundo.',
      'Para usufruir perfeitamente deste momento no nosso templo ou em sua casa:',
      '1. Purifique a mente: Segure a taça morna (Chawan) com as duas mãos, sentindo a textura rústica e o calor que emana.',
      '2. Sinta o aroma: O vapor inicial traz notas de terra húmida e folhas frescas, acalmando o batimento cardíaco.',
      '3. Beba lentamente: Deixe que o sabor complexo (umami) preencha o paladar, concentrando os seus pensamentos unicamente na sensação presente.',
      'É assim que fechamos o ciclo de cura no Nipon Spa: garantindo que a serenidade atingida na marquesa estenda-se a cada uma das suas células na hora de regressar ao mundo exterior.'
    ],
    contentEn: [
      'The Japanese tea ceremony, known as Chanoyu or Chado ("The Way of Tea"), is one of the most refined cultural expressions of traditional Japan. Far from being a simple beverage or social custom, every gesture is designed to cultivate complete mindfulness and spiritual connection.',
      'At the close of every treatment at Nipon Spa, we serve a bowl of organic matcha tea whisked with the traditional bamboo tool (Chasen). This ritual is not purely aesthetic; it has profound purposes connected to the guest’s post-therapeutic transition.',
      'Unlike coffee, which prompts sharp adrenaline spikes and anxiety, matcha contains an exceptional concentration of L-theanine. This unique amino acid crosses the blood-brain barrier and stimulates alpha brainwave production, inducing focused alertness and deep physical relaxation.',
      'To enjoy this moment perfectly in our temple or at home:',
      '1. Purify your mind: Hold the warm bowl (Chawan) with both hands, feeling its rustic texture and the warmth it radiates.',
      '2. Savor the aroma: The steam carries notes of damp earth and fresh leaves, calming your heart rate.',
      '3. Drink slowly: Let the complex umami flavor coat your palate, centering your thoughts solely on the present sensation.',
      'This is how we close the healing cycle at Nipon Spa: ensuring the serenity achieved on the therapy bed spreads to your cells as you return to the busy outer world.'
    ]
  },
  {
    id: 'omotenashi-philosophy',
    titlePt: 'A Filosofia de Omotenashi: A Arte Japonesa da Hospitalidade Altruísta',
    titleEn: 'The Philosophy of Omotenashi: The Japanese Art of Selfless Hospitality',
    excerptPt: 'A palavra que define a alma da nossa recepção e rituais. Aprenda como a antecipação discreta de necessidades cria conexões inesquecíveis.',
    excerptEn: 'The word that defines the soul of our reception and rituals. Learn how subtle anticipation of your needs breeds unforgettable connections.',
    categoryPt: 'Filosofia',
    categoryEn: 'Philosophy',
    date: '2026-05-28',
    readTimePt: '4 min de leitura',
    readTimeEn: '4 min read',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    kanjiSymbol: '誠',
    japaneseTitle: 'おもてなし',
    contentPt: [
      'Omotenashi traduz-se vagamente como "hospitalidade japonesa", mas o seu significado real é imensamente mais profundo. Representa o ato de cuidar do hóspede de forma totalmente altruísta, sem esperar nada em troca, antecipando as suas necessidades antes mesmo que ele perceba que as tem.',
      'Originária da Cerimónia do Chá de Sen no Rikyu, a filosofia assenta na ausência completa de pretensão. O anfitrião não ostenta o seu serviço; ele cria um ambiente impercetível e fluído de conforto total.',
      'No Nipon Spa, traduzimos esta dedicação milenar em pequenas ações:',
      '• O tom de voz equilibrado das nossas equipas, respeitando a sua busca pelo silêncio.',
      '• A temperatura milimetricamente controlada das salas e das macas antes de se deitar.',
      '• A personalização das toalhas com aromas que acalmam os seus recetores nasais específicos.',
      'A nossa máxima orientadora é o conceito "Ichi-go ichi-e" (uma oportunidade, um encontro). No Nipon, sabemos que a hora que passa connosco hoje é única e irrepetível. Por isso, toda a nossa presença foca-se em tornar a sua sessão um divisor de águas na sua semana.'
    ],
    contentEn: [
      'Omotenashi is roughly translated as "Japanese hospitality," but its real meaning runs immensely deeper. It represents the act of caring for a guest in a completely selfless way, without expecting anything in return, anticipating needs before they even notice them.',
      'Originating from Sen no Rikyu’s traditional Tea Ceremony, the philosophy rests on the absolute absence of pretension. Popularized as quiet elegance, the host doesn’t show off their service; instead, they craft an imperceptible, fluid environment of total comfort.',
      'At Nipon Spa, we translate this ancient dedication into quiet details:',
      '• The balanced, soft voice tone of our staff, respecting your request for absolute silence.',
      '• Chronometrically warmed therapy beds and custom soundscapes adjusted before you lie down.',
      '• Towels infused with single-source botanical oils that soothe your nervous systems based on your personal needs.',
      'Our guiding maxim is the concept of "Ichi-go ichi-e" (one encounter, one lifetime opportunity). At Nipon, we recognize that the hour you spend with us today is irreplaceable. Thus, our whole attention is centered on making your session a peaceful milestone in your week.'
    ]
  }
];
