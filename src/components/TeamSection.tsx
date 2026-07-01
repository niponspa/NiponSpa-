import React from 'react';
import { Award, Flower2, Users, HeartPulse, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface TeamSectionProps {
  lang: string;
}

export default function TeamSection({ lang }: TeamSectionProps) {
  const team = [
    {
      name: "Karina Seito",
      rolePt: "Gestão",
      roleEn: "Management",
      descPt: "Em abril de 2026, veio do Japão para assumir a liderança do Nipon Spa e dar início ao rebranding da marca, terapeuta formada no Japão. Irmã da fundadora Vanessa Nascimento, tem como missão preservar o legado construído ao longo de mais de 22 anos, unindo a tradição japonesa à inovação. Lidera a estratégia e o desenvolvimento do Nipon Spa, preparando a marca para uma nova geração, sem perder a autenticidade e a essência que a tornaram uma referência em Lisboa.",
      descEn: "In April 2026, she arrived from Japan to take over the leadership of Nipon Spa and initiate the brand's rebranding, as a Japanese-trained therapist. Sister of the founder Vanessa Nascimento, her mission is to preserve the legacy built over 22 years, merging Japanese tradition with innovation. She leads the strategy and development of Nipon Spa, preparing the brand for a new generation while preserving the authenticity and essence that made it a reference in Lisbon.",
      badgePt: "Gestão & Estratégia",
      badgeEn: "Management & Strategy",
      kanji: "経営",
      icon: Award,
      borderColor: "border-brand-gold/30"
    },
    {
      name: "Arissa Matsumoto",
      rolePt: "Especialista em Cultura Omotenashi",
      roleEn: "Omotenashi Culture Specialist",
      descPt: "Nascida no Japão, Arissa Matsumoto representa a terceira geração de uma família dedicada às terapias japonesas. Cresceu entre terapeutas e participou desde cedo no desenvolvimento do Nipon Spa. Aos 17 anos regressou ao Japão para aprofundar as suas raízes e vivenciar a cultura Omotenashi, trazendo para Lisboa a verdadeira essência do acolhimento e da tradição japonesa.",
      descEn: "Born in Japan, Arissa Matsumoto represents the third generation of a family dedicated to Japanese therapies. She grew up among therapists and participated from an early age in the development of Nipon Spa. At 17, she returned to Japan to deepen her roots and experience the Omotenashi culture, bringing the true essence of welcoming and Japanese tradition to Lisbon.",
      badgePt: "Tradição & Linhagem",
      badgeEn: "Tradition & Lineage",
      kanji: "有沙",
      icon: Flower2,
      borderColor: "border-brand-red/30"
    },
    {
      name: "Christiane Angelim",
      rolePt: "Diretora Comercial e Gestora de Relacionamento",
      roleEn: "Commercial Director & Relationship Manager",
      descPt: "Lidera a estratégia comercial e o relacionamento com os clientes do Nipon Spa. Coordena a equipa comercial, acompanha a jornada do cliente e desenvolve ações de fidelização, garantindo um atendimento próximo, profissional e centrado nas necessidades de cada pessoa.",
      descEn: "Leads the commercial strategy and customer relationships at Nipon Spa. Coordinates the sales team, guides the client journey, and develops loyalty initiatives, ensuring a close, professional service centered on each person's needs.",
      badgePt: "Relacionamento & Atendimento",
      badgeEn: "Relationship & Care",
      kanji: "信頼",
      icon: Users,
      borderColor: "border-brand-border"
    },
    {
      name: "Ana Faria Ferreira",
      rolePt: "Consultora de Relacionamento com o Cliente",
      roleEn: "Customer Relationship Consultant",
      descPt: "Ana Faria Ferreira integra a equipa comercial do Nipon Spa, acompanhando clientes que já conhecem a nossa casa. Shiatsuterapeuta há mais de 18 anos e amante das tradições japonesas, através de um contacto personalizado, promove a continuidade dos cuidados de bem-estar, reforçando uma relação de confiança e proximidade com cada cliente.",
      descEn: "Ana Faria Ferreira is part of the commercial team at Nipon Spa, assisting clients who already know our house. A Shiatsu therapist for over 18 years and a lover of Japanese traditions, she promotes the continuity of well-being care through personalized contact, strengthening a relationship of trust and closeness with each client.",
      badgePt: "Fidelização & Shiatsu",
      badgeEn: "Loyalty & Shiatsu",
      kanji: "和風",
      icon: HeartPulse,
      borderColor: "border-brand-border"
    },
    {
      name: "Carlos Manuel Henriques Barata",
      rolePt: "Secretariado Clínico",
      roleEn: "Clinical Secretary",
      descPt: "Carlos integra a equipa administrativa do Nipon Spa, sendo responsável pela gestão dos processos clínicos e administrativos que suportam o funcionamento da clínica. Com organização, rigor e atenção ao detalhe, assegura que todas as operações internas decorram de forma eficiente, contribuindo para a excelência dos serviços prestados.",
      descEn: "Carlos is part of the administrative team at Nipon Spa, responsible for managing the clinical and administrative processes that support the clinic's operations. With organization, rigor, and attention to detail, he ensures that all internal processes run efficiently, contributing to the excellence of the services provided.",
      badgePt: "Organização & Apoio",
      badgeEn: "Organization & Support",
      kanji: "秩序",
      icon: ShieldCheck,
      borderColor: "border-brand-border"
    },
    {
      name: "Berenice Carola",
      rolePt: "Terapeuta",
      roleEn: "Therapist",
      descPt: "Com mais de cinco anos de experiência na área do bem-estar, é especializada em Linfoterapia, tratamentos de estética corporal e massoterapias. Desenvolve protocolos personalizados, aliando conhecimento técnico e dedicação para proporcionar tratamentos eficazes e uma experiência de excelência.",
      descEn: "With over five years of experience in the well-being industry, she specializes in Lymphotherapy, body aesthetics, and massage therapies. She designs customized protocols, combining technical expertise with dedication to deliver effective treatments and an exceptional experience.",
      badgePt: "Terapias Manuais",
      badgeEn: "Manual Therapies",
      kanji: "癒し",
      icon: Sparkles,
      borderColor: "border-brand-border"
    }
  ];

  return (
    <div className="space-y-12 py-6">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-brand-red font-mono font-bold text-xs uppercase tracking-[0.2em] block">
          {lang === 'pt' ? 'Mestria & Dedicação' : 'Mastery & Dedication'}
        </span>
        <h2 className="text-3xl md:text-4xl font-light font-heading text-white tracking-tight">
          {lang === 'pt' ? 'A Nossa Equipa de Especialistas' : 'Our Team of Specialists'}
        </h2>
        <div className="w-12 h-0.5 bg-brand-red/60 mx-auto mt-2"></div>
        <p className="text-xs sm:text-sm text-gray-400 font-sans max-w-xl mx-auto leading-relaxed">
          {lang === 'pt' 
            ? 'Conheça os profissionais dedicados a manter vivo o legado do Nipon Spa, aliando tradição secular japonesa à inovação e acolhimento de excelência.'
            : 'Meet the dedicated professionals keeping the legacy of Nipon Spa alive, merging secular Japanese tradition with innovation and premium care.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {team.map((member, idx) => {
          const IconComponent = member.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-brand-charcoal border ${member.borderColor} rounded-2xl p-6 sm:p-8 space-y-4 hover:border-brand-red/30 hover:bg-brand-charcoal/90 transition duration-300 relative overflow-hidden group flex flex-col justify-between`}
            >
              {/* Background watermark of Japanese Kanji */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.06] transition duration-500">
                <span className="text-8xl font-black font-serif text-white tracking-widest">{member.kanji}</span>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-brand-black border border-brand-border/60 px-2.5 py-0.5 rounded-full text-brand-gold uppercase tracking-wider font-mono font-bold inline-block">
                      {lang === 'pt' ? member.badgePt : member.badgeEn}
                    </span>
                    <h3 className="text-xl font-medium font-heading text-white tracking-tight mt-1">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-brand-gold uppercase tracking-[0.08em] font-medium">
                      {lang === 'pt' ? member.rolePt : member.roleEn}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-brand-black border border-brand-border/80 flex items-center justify-center text-brand-red">
                    <IconComponent className="w-4 h-4 text-brand-red" />
                  </div>
                </div>

                <p className="text-xs text-gray-400 font-sans leading-relaxed font-light text-justify">
                  {lang === 'pt' ? member.descPt : member.descEn}
                </p>
              </div>

              <div className="border-t border-brand-border/40 pt-4 flex items-center justify-between text-gray-500 text-[9px] font-mono uppercase tracking-widest mt-4">
                <span>NIPON SPA TEAM</span>
                <span className="text-brand-red/60 font-serif">✦</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
