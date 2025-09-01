"use client";

import Image from "next/image";
import React, { useState } from "react"; // 'useEffect' e 'useRouter' removidos, pois não são mais necessários
import { CopyToClipboard } from "react-copy-to-clipboard";
import { QrCodePix } from "qrcode-pix";

const PaymentModal = ({ onClose }) => {
  const [showPixDetails, setShowPixDetails] = useState(false);
  const [pixCode, setPixCode] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  // 'paymentConfirmed' e 'setPaymentConfirmed' foram removidos
  const [error, setError] = useState(null);

  // 'router' e 'useRouter' foram removidos

  const pixKey = "31984282794";
  const amount = 19.0;
  const recipientName = "Gabriel Jesus";
  const city = "Belo Horizonte";

  const txid = Math.random().toString(36).substring(2, 15);

  const generatePix = async () => {
    try {
      const qrCodePix = QrCodePix({
        version: "01",
        key: pixKey,
        name: recipientName,
        city: city,
        message: "Pagamento para chamada",
        txid: txid,
        value: amount,
      });

      const payload = qrCodePix.payload(); // código copia e cola
      setPixCode(payload);

      const qrCodeImage = await qrCodePix.base64(); // QR code em base64 (imagem)
      setQrCodeDataUrl(qrCodeImage);

      setShowPixDetails(true);
    } catch (err) {
      console.error("Erro ao gerar Pix:", err);
      setError("Não foi possível gerar os detalhes do Pix. Tente novamente.");
    }
  };

  // O useEffect para 'paymentConfirmed' foi removido, pois a funcionalidade de confirmação foi retirada.

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  // 'handleConfirmPayment' foi removido

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-4 text-center">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Erro: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Removido o '!paymentConfirmed' da condição */}
        {!showPixDetails && (
          <>
            <div className="flex items-center justify-center mb-4">
              <span className="text-gray-700 block mr-2">
                Se vc quiser conversar em chamada comigo, vai ter que pagar 20
                reais...
              </span>
              <Image
                width={20}
                height={20}
                alt="emoji"
                src="https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/1fae3.svg"
              />
            </div>

            <button
              className="bg-whatsappButton text-red-600 py-2 px-4 bg-gray-300 hover:bg-red-100 rounded-md hover:bg-whatsappButtonHover transition-colors duration-200 w-full mb-2"
              onClick={generatePix}
              disabled={!!error}
            >
              Pagar Agora
            </button>
            <button
              className=" text-gray-800 py-2 px-4 rounded-md  transition-colors duration-200 w-full"
              onClick={onClose}
            >
              Cancelar
            </button>
          </>
        )}

        {/* Removido o '!paymentConfirmed' da condição */}
        {showPixDetails && (
          <>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Pague com Pix para continuar
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Escaneie o QR Code ou copie o código abaixo no seu aplicativo
              bancário.
            </p>

            {qrCodeDataUrl ? (
              <div className="flex justify-center mb-4">
                <Image
                  src={qrCodeDataUrl}
                  alt="QR Code Pix"
                  width={200}
                  height={200}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center h-[200px] w-[200px] bg-gray-100 rounded-lg mx-auto mb-4">
                <span className="text-gray-500">Gerando QR Code...</span>
              </div>
            )}

            {/* Código Pix agora em uma linha, mais clean */}
            <div className="mb-4">
              <input
                type="text"
                value={pixCode}
                readOnly
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <CopyToClipboard text={pixCode} onCopy={handleCopy}>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 w-full mb-2">
                {isCopied ? "Copiado!" : "Copiar Código Pix"}
              </button>
            </CopyToClipboard>

            {/* Botão "Já Paguei / Confirmar Pagamento" foi removido */}

            <button
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200 w-full"
              onClick={onClose}
            >
              Voltar
            </button>
          </>
        )}

        {/* O bloco de "Pagamento Confirmado" foi removido */}
      </div>
    </div>
  );
};

export default PaymentModal;
