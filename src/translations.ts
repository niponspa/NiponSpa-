/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationSet {
  // Navigation
  navHome: string;
  navTreatments: string;
  navBookRitual: string;
  navReviews: string;
  navAbout: string;
  navBlog: string;
  navMyAccount: string;

  // Hero
  heroTag: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroJapaneseSubtitle: string;
  heroDescription: string;
  btnBookNow: string;
  btnViewTreatments: string;
  heroBadgeLocation: string;
  heroBadgeReviews: string;

  // Filters & Catalog
  all: string;
  massage: string;
  ritual: string;
  wellness: string;
  special: string;
  treatmentTitle: string;
  treatmentSubtitle: string;
  durationLabel: string;
  benefitsLabel: string;
  btnBookThis: string;
  priceTag: string;

  // Split Promotional Board
  promoTitle: string;
  promoBadge: string;
  promoDesc1: string;
  promoDesc2: string;
  promoStat1: string;
  promoStat1Sub: string;
  promoStat2: string;
  promoStat2Sub: string;
  promoBtn: string;

  // Reviews
  reviewsTitle: string;
  reviewsSubtitle: string;
  reviewsFormTitle: string;
  reviewsFormDesc: string;
  reviewsFormName: string;
  reviewsFormTreatment: string;
  reviewsFormRating: string;
  reviewsFormMessage: string;
  reviewsFormMessagePlaceholder: string;
  reviewsFormSubmit: string;
  reviewsSuccess: string;
  reviewsTreatmentReceived: string;

  // My Account
  accountTitle: string;
  accountSubtitle: string;
  accountNoBookings: string;
  accountBookNow: string;
  statusPending: string;
  statusConfirmed: string;
  btnReschedule: string;
  btnCancel: string;
  cancelConfirmation: string;
  rescheduleAlert: string;
  paymentDetails: string;
  minLabel: string;

  // Modal Common & Steps
  modalStep1: string;
  modalStep2: string;
  modalStep3: string;
  modalStep4: string;
  modalDate: string;
  modalTime: string;
  modalNext: string;
  modalBack: string;

  // Modal Step 1: Schedule
  selectDay: string;
  selectHour: string;
  noSlots: string;
  lowVacancy: string;
  fullyBooked: string;

  // Modal Step 2: Info
  infoTitle: string;
  infoDesc: string;
  labelName: string;
  labelEmail: string;
  labelPhone: string;
  labelNotes: string;
  placeholderNotes: string;

  // Modal Step 3: Payment
  payTitle: string;
  payDesc: string;
  btnSimulatePay: string;
  multibancoEntity: string;
  multibancoRef: string;
  multibancoLimit: string;
  mbwayPhone: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardFlippedDesc: string;
  btnConfirmPayment: string;

  // Modal Step 4: Success
  successTitle: string;
  successDesc: string;
  successInstruction: string;
  successDetailsTitle: string;
  successGreeting: string;
  btnViewBookings: string;

  // Footer
  footerDesc: string;
  footerRights: string;
}

export const TRANSLATIONS: Record<'pt' | 'en', TranslationSet> = {
  pt: {
    navHome: "Início",
    navTreatments: "Tratamentos",
    navBookRitual: "Reservar",
    navReviews: "Avaliações",
    navAbout: "Sobre nós",
    navBlog: "Blog",
    navMyAccount: "As Minhas Reservas",

    heroTag: "Estética do Cuidado & Banho em Lisboa",
    heroHeadline1: "A Sabedoria Ancestral",
    heroHeadline2: "Do Cuidado Japonês",
    heroJapaneseSubtitle: "一期一会 • O Caminho da Paz Interior Japonesa",
    heroDescription: "Mergulhe numa experiência sensorial única onde a tradição milenar do Japão se encontra com o relaxamento sumptuoso. Alinhe o seu Ki e alcance o repouso absoluto.",
    btnBookNow: "Agendar Agora",
    btnViewTreatments: "Ver Tratamentos",
    heroBadgeLocation: "Lisboa • Rua Prista Monteiro, 20 Loja B",
    heroBadgeReviews: "★ 5.0 Google Reviews",

    all: "Todos",
    massage: "Massagens",
    ritual: "Rituais de Banho",
    wellness: "Saúde & Mente",
    special: "Rituais de Assinatura",
    treatmentTitle: "Rituais de Cura Japonesa",
    treatmentSubtitle: "Selecione o tratamento ideal para realinhar a sua energia vital e aliviar as pressões do dia-a-dia.",
    durationLabel: "Duração",
    benefitsLabel: "Benefícios Clínicos & Espirituais",
    btnBookThis: "Agendar Ritual",
    priceTag: "Preço",

    promoTitle: "O Ritual Sagrado Espera Por Si",
    promoBadge: "Tradição em Lisboa",
    promoDesc1: "No Nipon Spa, recriamos os rituais purificadores dos templos zen mais reservados e tradicionais do Japão rústico. Cada detalhe, desde o aroma acolhedor da madeira de hinoki à delicadeza do chá matcha biológico servido no final, é milimetricamente planeado para a sua renovação corporal plena.",
    promoDesc2: "Os nossos terapeutas possuem formação em linhagens tradicionais de massagem oriental, garantindo uma aplicação cirúrgica de pressões e técnicas de alongamento restaurador.",
    promoStat1: "100%",
    promoStat1Sub: "Tradicional Nipónico",
    promoStat2: "+5000",
    promoStat2Sub: "Ki Alinhados",
    promoBtn: "Reservar uma Experiência",

    reviewsTitle: "Vozes da Harmonia",
    reviewsSubtitle: "Descubra os depoimentos reais de quem já experimentou o verdadeiro acolhimento Omotenashi em Lisboa.",
    reviewsFormTitle: "Deixe a sua Avaliação",
    reviewsFormDesc: "O seu feedback é fundamental para mantermos a excelência espiritual nipónica. Partilhe a sua experiência real!",
    reviewsFormName: "O seu Nome",
    reviewsFormTreatment: "Tratamento Realizado",
    reviewsFormRating: "Classificação",
    reviewsFormMessage: "A sua Mensagem",
    reviewsFormMessagePlaceholder: "Escreva sobre a simpatia do terapeuta, o conforto da sala, de como se sentiu...",
    reviewsFormSubmit: "Publicar Avaliação",
    reviewsSuccess: "Avaliação enviada com extremo sucesso! Arigato gozaimasu pela sua partilha sincera.",
    reviewsTreatmentReceived: "Tratamento submetido",

    accountTitle: "As Minhas Reservas",
    accountSubtitle: "Acompanhe as suas próximas visitas e rituais agendados no Nipon Spa.",
    accountNoBookings: "Não tem rituais agendados de momento.",
    accountBookNow: "Fazer uma Reserva Agora",
    statusPending: "Pendente de Liquidação",
    statusConfirmed: "Tratamento Confirmado",
    btnReschedule: "Reagendar",
    btnCancel: "Cancelar Sessão",
    cancelConfirmation: "Tem a certeza que deseja cancelar a marcação de forma permanente?",
    rescheduleAlert: "Para reagendar a sua sessão com segurança, por favor contacte a nossa recepção de Lisboa diretamente através do número 21 715 7010.",
    paymentDetails: "Detalhes de Pagamento",
    minLabel: "min",

    modalStep1: "Data & Hora",
    modalStep2: "Seus Dados",
    modalStep3: "Liquidação",
    modalStep4: "Confirmação",
    modalDate: "Data",
    modalTime: "Hora",
    modalNext: "Próximo Passo",
    modalBack: "Voltar",

    selectDay: "1. Selecione o Dia Ideal",
    selectHour: "2. Escolha o Horário Disponível",
    noSlots: "Sem horários livres neste dia",
    lowVacancy: "Poucas vagas",
    fullyBooked: "Completo",

    infoTitle: "Suas Credenciais Seguras",
    infoDesc: "Insira as suas informações de contacto para que possamos enviar os detalhes da sua reserva e as recomendações de preparação para o ritual.",
    labelName: "Nome Completo",
    labelEmail: "Endereço de E-mail",
    labelPhone: "Contacto Telefónico",
    labelNotes: "Notas Especiais ou Preferências de Saúde",
    placeholderNotes: "Indique alergias, focos de dor muscular para o terapeuta, gravidez, ou preferências de pressão...",

    payTitle: "Método de Liquidação",
    payDesc: "Complete o agendamento de forma segura. O seu horário ficará reservado provisoriamente mediante verificação de sinal do método selecionado.",
    btnSimulatePay: "✓ Simular Aprovação de Pagamento",
    multibancoEntity: "Entidade",
    multibancoRef: "Referência",
    multibancoLimit: "O seu horário ficará pré-bloqueado durante 2 horas. Após este período sem pagamento, a vaga é libertada.",
    mbwayPhone: "Contacto MBWay",
    cardName: "Nome Impresso",
    cardNumber: "Número do Cartão",
    cardExpiry: "Validade",
    cardCvv: "CVV",
    cardFlippedDesc: "Código de Segurança Traseiro",
    btnConfirmPayment: "Confirmar & Pagar Ritual",

    successTitle: "Reserva Confirmada com Sucesso!",
    successDesc: "Tudo pronto para o seu momento de paz profunda. O Nipon Spa congratula-se em acolhê-lo.",
    successInstruction: "Enviámos um comprovativo detalhado e orientações para o seu e-mail.",
    successDetailsTitle: "Informação do Ritual",
    successGreeting: "Omotenashi • Nipon Spa",
    btnViewBookings: "Visualizar Minhas Reservas",

    footerDesc: "A fusão perfeita entre a medicina oriental milenar e rituais japoneses tradicionais de relaxamento no coração de Lisboa. Um refúgio dedicado ao reequilíbrio físico e espiritual.",
    footerRights: "Nipon Spa. Todos os direitos reservados."
  },
  en: {
    navHome: "Home",
    navTreatments: "Treatments",
    navBookRitual: "Reserve",
    navReviews: "Reviews",
    navAbout: "About Us",
    navBlog: "Blog",
    navMyAccount: "My Account",

    heroTag: "Aesthetics of Wellness & Bath in Lisbon",
    heroHeadline1: "Ancestral Wisdom",
    heroHeadline2: "Of Japanese Care",
    heroJapaneseSubtitle: "Ichi-go ichi-e • The Way of Inner Japanese Peace",
    heroDescription: "Immerse yourself in a unique sensory experience where the ancient tradition of Japan meets sumptuous relaxation. Realign your Ki and achieve absolute rest.",
    btnBookNow: "Book Now",
    btnViewTreatments: "View Treatments",
    heroBadgeLocation: "Lisbon • Rua Prista Monteiro, 20 Loja B",
    heroBadgeReviews: "★ 5.0 Google Reviews",

    all: "All",
    massage: "Massages",
    ritual: "Bath Rituals",
    wellness: "Health & Mind",
    special: "Signature Rituals",
    treatmentTitle: "Japanese Healing Rituals",
    treatmentSubtitle: "Select the ideal treatment to realign your vital energy and soothe daily pressures.",
    durationLabel: "Duration",
    benefitsLabel: "Clinical & Spiritual Benefits",
    btnBookThis: "Book Ritual",
    priceTag: "Price",

    promoTitle: "The Sacred Ritual Awaits You",
    promoBadge: "Tradition in Lisbon",
    promoDesc1: "At Nipon Spa, we recreate the purifying rituals of the most reserved and traditional zen temples of rustic Japan. Every detail, from the welcoming scent of hinoki wood to the delicacy of the organic matcha tea served at the end, is carefully tailored for your full body renewal.",
    promoDesc2: "Our therapists are certified in traditional lineages of oriental massage, guaranteeing a precise physical application of pressure and restorative stretching techniques.",
    promoStat1: "100%",
    promoStat1Sub: "Traditional Japanese",
    promoStat2: "+5000",
    promoStat2Sub: "Aligned Ki",
    promoBtn: "Book an Experience",

    reviewsTitle: "Voices of Harmony",
    reviewsSubtitle: "Discover verified reviews from those who have experienced true Omotenashi hospitality in Lisbon.",
    reviewsFormTitle: "Leave your Review",
    reviewsFormDesc: "Your feedback is essential for us to maintain Japanese spiritual excellence. Share your real experience!",
    reviewsFormName: "Your Name",
    reviewsFormTreatment: "Treatment Received",
    reviewsFormRating: "Rating",
    reviewsFormMessage: "Your Message",
    reviewsFormMessagePlaceholder: "Write about the therapist's friendliness, room comfort, how you felt...",
    reviewsFormSubmit: "Publish Review",
    reviewsSuccess: "Review submitted with great success! Arigato gozaimasu for your honest sharing.",
    reviewsTreatmentReceived: "Submitted treatment",

    accountTitle: "My Bookings",
    accountSubtitle: "Track your upcoming visits and scheduled rituals at Nipon Spa.",
    accountNoBookings: "You have no scheduled rituals at the moment.",
    accountBookNow: "Make a Booking Now",
    statusPending: "Pending Payment",
    statusConfirmed: "Treatment Confirmed",
    btnReschedule: "Reschedule",
    btnCancel: "Cancel Session",
    cancelConfirmation: "Are you sure you want to permanently cancel this appointment?",
    rescheduleAlert: "To securely reschedule your session, please contact our Lisbon reception directly at (+351) 21 715 7010.",
    paymentDetails: "Payment Details",
    minLabel: "min",

    modalStep1: "Date & Time",
    modalStep2: "Your Info",
    modalStep3: "Payment",
    modalStep4: "Confirmation",
    modalDate: "Date",
    modalTime: "Time",
    modalNext: "Next Step",
    modalBack: "Back",

    selectDay: "1. Select the Ideal Day",
    selectHour: "2. Choose an Available Slot",
    noSlots: "No open slots on this day",
    lowVacancy: "Low vacancy",
    fullyBooked: "Fully booked",

    infoTitle: "Your Secure Credentials",
    infoDesc: "Enter your contact details so we can send your booking details and recommendations to prepare for your ritual.",
    labelName: "Full Name",
    labelEmail: "Email Address",
    labelPhone: "Phone Contact",
    labelNotes: "Special Notes or Health Preferences",
    placeholderNotes: "Indicate allergies, main muscle discomfort areas, pregnancy, or pressure preferences...",

    payTitle: "Payment Method",
    payDesc: "Complete your booking securely. Your slot will be held provisionally pending verification of the selected method.",
    btnSimulatePay: "✓ Simulate Payment Approval",
    multibancoEntity: "Entity",
    multibancoRef: "Reference",
    multibancoLimit: "Your slot will be pre-blocked for 2 hours. Without validation within this period, the slot is released.",
    mbwayPhone: "MBWay Contact",
    cardName: "Cardholder Name",
    cardNumber: "Card Number",
    cardExpiry: "Expiry Date",
    cardCvv: "CVV",
    cardFlippedDesc: "Rear Security Code",
    btnConfirmPayment: "Confirm & Pay Ritual",

    successTitle: "Booking Confirmed Successfully!",
    successDesc: "Everything is set for your moment of deep peace. Nipon Spa is delighted to welcome you.",
    successInstruction: "We have sent a detailed receipt and guidelines to your email.",
    successDetailsTitle: "Ritual Information",
    successGreeting: "Omotenashi • Nipon Spa",
    btnViewBookings: "View My Bookings",

    footerDesc: "The perfect fusion of ancient Eastern medicine and traditional Japanese relaxation rituals in the heart of Lisbon. A sanctuary dedicated to spiritual and physical realignment.",
    footerRights: "Nipon Spa. All rights reserved."
  }
};
