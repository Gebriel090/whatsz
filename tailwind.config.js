/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whatsappGreen: "#005e54", // Cor do cabeçalho do WhatsApp
        whatsappBubbleHost: "#ffffff", // Cor da bolha do bot
        whatsappBubbleGuest: "#D9FDD2", // Cor da bolha do usuário
        whatsappButton: "#128c7e", // Cor do botão de ação
        whatsappButtonHover: "#0e6c62",
        whatsappBorder: "#E2D5BF", // Cor da borda do input
        whatsappInfoBg: "#d5f4f0", // Cor do fundo da mensagem de informação
        whatsappInfoText: "#53676b", // Cor do texto da mensagem de informação
      },
      borderRadius: {
        "5rem": "5rem", // Para usar no Tailwind
      },
    },
  },
  plugins: [],
};
