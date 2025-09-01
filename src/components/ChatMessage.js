// components/ChatMessage.js
import React from "react";
import Image from "next/image"; // Importar o componente Image do Next.js

const ChatMessage = ({ message, isBot, showCheckmark, isLoading }) => {
  const hostAvatarUrl = "https://i.ibb.co/HLWP814v/foto-perfil2.png";
  // Definindo a cor azul do WhatsApp para o checkmark
  const whatsappBlueCheckmark = "#34B7F1";

  if (message.type === "info") {
    return (
      <div className="info-container bg-whatsappInfoBg text-whatsappInfoText mx-auto my-8 p-3 rounded-xl flex items-center gap-1 max-w-sm text-sm text-center">
        <div className="flex-shrink-0">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4b5e63"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
            ></path>
          </svg>
        </div>
        <p className="m-0">{message.content}</p>
      </div>
    );
  }

  // Se a mensagem for do tipo 'typing' e for do bot
  if (message.type === "typing" && isBot) {
    return (
      <div className="message-bubble-wrapper flex mb-2 w-full max-w-xl mx-auto host-message justify-start">
        <div className="avatar w-9 h-9 rounded-full overflow-hidden mr-2 flex-shrink-0 self-start">
          <Image
            src={hostAvatarUrl}
            alt="Host Avatar"
            width={56}
            height={56}
            objectFit="cover"
          />
        </div>
        <div className="message-content relative p-3 rounded-md bg-[white] text-gray-800 rounded-tl-none max-w-[90%] break-words flex items-end">
          {/* Indicador de digitação animado */}
          <div className="typing-indicator flex space-x-1">
            <span className="dot animate-bounce1 w-2 h-2 bg-gray-400 rounded-full"></span>
            <span className="dot animate-bounce2 w-2 h-2 bg-gray-400 rounded-full"></span>
            <span className="dot animate-bounce3 w-2 h-2 bg-gray-400 rounded-full"></span>
          </div>
        </div>
      </div>
    );
  }

  // Renderização da mensagem do tipo botão
  if (message.type === "button") {
    return (
      <div
        className={`message-bubble-wrapper flex mb-2 w-full max-w-xl mx-auto ${
          isBot ? "host-message justify-start" : "guest-message justify-end"
        }`}
      >
        {isBot && (
          <div className="avatar w-9 h-9 rounded-full overflow-hidden mr-2 flex-shrink-0 self-start">
            <Image
              src={hostAvatarUrl}
              alt="Host Avatar"
              width={56}
              height={56}
              objectFit="cover"
            />
          </div>
        )}
        <div
          className={`message-content relative p-1 rounded-md max-w-[90%] break-words text-left ${
            isBot
              ? " text-gray-800 rounded-tl-none"
              : "bg-whatsappBubbleGuest text-gray-900 rounded-tr-none"
          }`}
        >
          <a
            href={message.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors duration-200"
            style={{ textDecoration: "none" }} // Para remover o sublinhado padrão de links
          >
            {message.content}
          </a>
          {/* Checkmark para mensagem de botão do bot */}
          {isBot && showCheckmark && (
            <svg
              className="message-check-icon absolute bottom-0 right-1 h-4 w-4 z-10"
              viewBox="0 0 38.626 24.684"
            >
              <g
                id="Grupo_1_button"
                data-name="Grupo 1"
                transform="translate(-708.9 -601.383)"
              >
                <path
                  id="Caminho_6_button"
                  data-name="Caminho 6"
                  d="M728.035,623.468l1.382,1.482,17.929-20.334"
                  transform="translate(-1.937 -1.117)"
                  fill="none"
                  stroke={whatsappBlueCheckmark}
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
                <path
                  id="Caminho_7_button"
                  data-name="Caminho 7"
                  d="M712.017,616.07l7.088,8.039,17.757-20.14"
                  transform="translate(-1 -0.469)"
                  fill="none"
                  stroke={whatsappBlueCheckmark}
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
              </g>
            </svg>
          )}
        </div>
      </div>
    );
  }

  // Renderização padrão para mensagens de texto e imagem
  return (
    <div
      className={`message-bubble-wrapper flex mb-2 w-full max-w-xl mx-auto
    ${isBot ? "host-message justify-start" : "guest-message justify-end"}`}
    >
      {isBot && (
        <div className="avatar w-9 h-9 rounded-full overflow-hidden mr-2 flex-shrink-0 self-start">
          <Image
            src={hostAvatarUrl}
            alt="Host Avatar"
            width={56}
            height={56}
            objectFit="cover"
          />
        </div>
      )}
      <div
        className={`message-content relative p-3 rounded-md max-w-[90%] break-words text-left ${
          isBot
            ? "bg-[white] text-gray-800 rounded-tl-none"
            : "bg-whatsappBubbleGuest text-gray-900 rounded-tr-none"
        }`}
      >
        {message.type === "text" && (
          <div dangerouslySetInnerHTML={{ __html: message.content }} />
        )}
        {message.type === "image" && (
          <Image
            src={message.content}
            alt="Content"
            width={250}
            height={250}
            layout="responsive"
            objectFit="contain"
            className="rounded-md"
          />
        )}
        {/* Lógica para o loading ou checkmark */}

        {/* Checkmark para MENSAGENS DO USUÁRIO */}
        {!isBot &&
          (isLoading ? (
            <div className="loading-spinner absolute bottom-0 right-1 h-4 w-4 z-10 flex items-center justify-center">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-500"></div>
            </div>
          ) : (
            showCheckmark && (
              <svg
                className="message-check-icon absolute bottom-0 right-1 h-4 w-4 z-10"
                viewBox="0 0 38.626 24.684"
              >
                <g
                  id="Grupo_1_user"
                  data-name="Grupo 1"
                  transform="translate(-708.9 -601.383)"
                >
                  <path
                    id="Caminho_6_user"
                    data-name="Caminho 6"
                    d="M728.035,623.468l1.382,1.482,17.929-20.334"
                    transform="translate(-1.937 -1.117)"
                    fill="none"
                    stroke={whatsappBlueCheckmark}
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                  <path
                    id="Caminho_7_user"
                    data-name="Caminho 7"
                    d="M712.017,616.07l7.088,8.039,17.757-20.14"
                    transform="translate(-1 -0.469)"
                    fill="none"
                    stroke={whatsappBlueCheckmark}
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                </g>
              </svg>
            )
          ))}

        {/* NOVO: Checkmark para MENSAGENS DO BOT (texto e imagem) */}
        {isBot && showCheckmark && (
          <svg
            className="message-check-icon absolute bottom-0 right-1 h-4 w-4 z-10"
            viewBox="0 0 38.626 24.684"
          >
            <g
              id="Grupo_1_bot"
              data-name="Grupo 1"
              transform="translate(-708.9 -601.383)"
            >
              <path
                id="Caminho_6_bot"
                data-name="Caminho 6"
                d="M728.035,623.468l1.382,1.482,17.929-20.334"
                transform="translate(-1.937 -1.117)"
                fill="none"
                stroke={whatsappBlueCheckmark}
                strokeLinecap="round"
                strokeWidth="3"
              ></path>
              <path
                id="Caminho_7_bot"
                data-name="Caminho 7"
                d="M712.017,616.07l7.088,8.039,17.757-20.14"
                transform="translate(-1 -0.469)"
                fill="none"
                stroke={whatsappBlueCheckmark}
                strokeLinecap="round"
                strokeWidth="3"
              ></path>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
