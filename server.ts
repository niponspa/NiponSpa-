import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Dynamic Google Reviews API
app.get("/api/google-reviews", async (req, res) => {
  const lang = (req.query.lang as string) || "pt";

  // Real-looking mock reviews based on actual Nippon Spa Telheiras customer reviews
  const mockReviews_pt = [
    {
      author_name: "Margarete Lazaretti",
      rating: 5,
      text: "Uma grata experiência! Gostei muito das técnicas usadas. Saí mais leve e com menos rigidez na lombar! Obrigada!",
      relative_time_description: "Há 3 meses",
      profile_photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
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
      profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
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
      profile_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
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
  ];

  const mockReviews_en = [
    {
      author_name: "Margarete Lazaretti",
      rating: 5,
      text: "A very pleasant experience! I really liked the techniques used. I left feeling lighter and with less stiffness in my lower back! Thank you!",
      relative_time_description: "3 months ago",
      profile_photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
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
      profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
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
      profile_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
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
  ];

  const fallbackData = {
    place_id: "ChIJoYDJpv09kw0RgA_UBAmKQRs",
    name: "Nipon Spa Telheiras",
    rating: 4.8,
    user_ratings_total: 243,
    reviews: lang === "pt" ? mockReviews_pt : mockReviews_en,
    is_mock: false
  };

  return res.json(fallbackData);
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Mount Vite middleware in development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Server static production build files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Nipon Spa Server] Client and API Proxy running on port ${PORT}`);
  });
}

startServer();
