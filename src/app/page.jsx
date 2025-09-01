

"use client"; // Esta diretiva é essencial para usar hooks como useState, useEffect, useRouter.
"use client"; // Esta diretiva é essencial para usar hooks como useState, useEffect, useRouter.

import React, { useState, useEffect, useRef, useCallback } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatMessage from "../components/ChatMessage";
// REMOVA esta linha: import ChoiceButtons from "../components/ChoiceButtons";
import PaymentModal from "../components/PaymentModal";
import { useRouter } from "next/navigation"; // CORRETO para o App Router!

const botScript = [
  { type: "text", content: "Oii meu amor 😈" },
  {
    type: "text",
    content: "Tou prontinha pra me <b>mostrar todinha pra você🔞🔥</b>",
  },
  {
    type: "image",
    content: "https://i.ibb.co/xtq7C0wB/previa.png",
  },
  {
    type: "text",
    content:
      "infelizmente preciso colocar censura aqui... Mas vc pode me chamar no zap",
  },
  {
    type: "text",
    content:
      "Tudo só por 19,90 bb, vc não vai se arrepender, <b>prometo</b> 😘",
  },
  {
    type: "button",
    content: "CHAME AQUI",
    link: "https://wa.me/5531999074577",
    isBot: true,
    showCheckmark: true,
  },
];

// REMOVA este bloco, ele não será mais usado
// const choiceInputData = {
//   id: "t0bydyooi23owckn5vlq6ihn",
//   type: "choice input",
//   items: [
//     {
//       id: "nzfs480yoywhf5uq0ev8xymr",
//       outgoingEdgeId: "g1os0aydtee8w49o0ke22f18",
//       content: "CHAME AQUI",
//     },
//   ],
// };

const HomePage = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [botStatus, setBotStatus] = useState("Online");
  // REMOVA esta linha: const [showChoiceButtons, setShowChoiceButtons] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const chatViewRef = useRef(null);
  const audioNotificationRef = useRef(null);

  const router = useRouter();

  const scrollToBottom = useCallback(() => {
    if (chatViewRef.current) {
      chatViewRef.current.scrollTo({
        top: chatViewRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  // Função para adicionar mensagem do bot com indicador de digitação
  const addBotMessage = useCallback(async (msg) => {
    setIsBotTyping(true);
    setBotStatus(msg.type === "audio" ? "gravando audio..." : "digitando...");

    // Adiciona o indicador de digitação
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { type: "typing", isBot: true, id: "bot-typing-indicator" },
    ]);

    // Simula um tempo de digitação fixo (por exemplo, 1.5 segundos)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Remove o indicador de digitação e adiciona a mensagem real
    setChatMessages((prevMessages) => {
      const updatedMessages = prevMessages.filter(
        (m) => m.id !== "bot-typing-indicator"
      );
      return [...updatedMessages, { ...msg, isBot: true, showCheckmark: true }];
    });

    setIsBotTyping(false);
    setBotStatus("Online");

    // Toca o áudio de notificação se houver
    if (audioNotificationRef.current) {
      audioNotificationRef.current.play().catch((e) => {
        console.error("Erro ao tocar áudio:", e);
        if (e.name === "NotAllowedError" || e.name === "AbortError") {
          console.warn(
            "A reprodução automática de áudio foi bloqueada pelo navegador. " +
              "Interaja com a página (clique, role) para habilitar o som."
          );
        }
      });
    }
  }, []);

  const addUserMessage = useCallback((content) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { type: "text", content, isBot: false },
    ]);
  }, []);

  // Lógica para iniciar o fluxo do bot com atraso fixo de 4 segundos entre cada mensagem.
  const startBotFlow = useCallback(async () => {
    setChatMessages([]);
    // REMOVA esta linha: setShowChoiceButtons(false);

    // Mensagem informativa inicial
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { type: "info", content: "Esta é uma conta comercial" },
    ]);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Pequeno atraso inicial após a info

    // Itera por todas as mensagens no script do bot
    for (const msg of botScript) {
      await addBotMessage(msg); // Exibe a mensagem do bot

      // Atraso de 4 segundos APÓS cada mensagem do bot, exceto o botão final
      if (msg.type !== "button") {
        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
    }

    // REMOVA esta linha: setShowChoiceButtons(true);
  }, [addBotMessage]);

  // REMOVA esta função, ela não será mais usada
  // const handleUserChoice = useCallback(
  //   (selectedContent) => {
  //     addUserMessage(selectedContent);
  //     setShowChoiceButtons(false);
  //     window.open("https://wa.me/5531999074577", "_blank");
  //   },
  //   [addUserMessage]
  // );

  const handleCallClick = useCallback(() => {
    setShowPaymentModal(true);
  }, []);

  const handleVideoClick = useCallback(() => {
    setShowPaymentModal(true);
  }, []);

  // Efeitos para iniciar o fluxo do bot e rolar para o final do chat
  useEffect(() => {
    startBotFlow();
  }, [startBotFlow]);

  useEffect(() => {
    // A dependência `showChoiceButtons` pode ser removida pois não será mais usada.
    // O `scrollToBottom` ainda funcionará porque a adição de mensagens (incluindo o botão)
    // ao `chatMessages` já dispara essa atualização.
    scrollToBottom();
  }, [chatMessages, scrollToBottom]);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 relative">
      <ChatHeader
        status={isBotTyping ? botStatus : "Online"}
        onCallClick={handleCallClick}
        onVideoClick={handleVideoClick}
      />
      <div
        className="flex-grow overflow-y-auto p-4 chat-background pt-14 pb-20"
        ref={chatViewRef}
      >
        {chatMessages.map((msg, index) => (
          <ChatMessage
            key={msg.id || index}
            message={msg}
            isBot={msg.isBot}
            showCheckmark={msg.showCheckmark}
          />
        ))}
      </div>

      {/* REMOVA este bloco, ele não será mais usado */}
      {/* {showChoiceButtons && (
        <ChoiceButtons
          choices={choiceInputData.items}
          onSelectChoice={handleUserChoice}
        />
      )} */}

      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} />
      )}

      <audio
        ref={audioNotificationRef}
        src="https://cdn.jsdelivr.net/gh/packtypebot/free-template-packtypebot/audio.mp3"
        preload="auto"
      />
    </div>
  );
};

export default HomePage;