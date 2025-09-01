// arquivo: startChat.js

// URL da API base para iniciar/continuar o chat
const BASE_CHAT_URL = "https://viewer.yqt2oi.easypanel.host/api/v1/typebots/julia-whatsapp/startChat";

/**
 * Interage com o Typebot, iniciando ou continuando uma sessão.
 *
 * @param {Object} [data={}] - Dados para enviar no corpo da requisição.
 *   - Para iniciar: Pode ser um objeto vazio ou com variáveis de preenchimento inicial.
 *   - Para continuar: Deve conter a resposta do usuário, geralmente como `{ answer: "valor_da_resposta" }`.
 * @param {string} [sessionId=null] - O ID da sessão obtido na resposta anterior.
 *   Se fornecido, a requisição continua a conversa.
 * @returns {Promise<Object|undefined>} O JSON completo da resposta da API ou undefined em caso de erro.
 */
async function interactWithChat(data = {}, sessionId = null) {
  let requestUrl = BASE_CHAT_URL;
  let requestBody = data;

  if (sessionId) {
    // Se temos um sessionId, estamos continuando o chat.
    // Anexa o sessionId à URL para identificar a sessão.
    requestUrl = `${BASE_CHAT_URL}?sessionId=${sessionId}`;
    // O corpo da requisição agora conteria a resposta do usuário.
    // Ex: { answer: "Minha Escolha" } ou { answer: "Meu Texto" }
  }

  try {
    console.log(`\n--- Enviando Requisição ---`);
    console.log(`URL: ${requestUrl}`);
    console.log(`Método: POST`);
    console.log(`Corpo: ${JSON.stringify(requestBody, null, 2)}`); // Imprime o corpo formatado

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Origin": "https://viewer.yqt2oi.easypanel.host"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      // Tenta ler o corpo do erro se a resposta não for OK
      const errorDetails = await response.text();
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}. Detalhes: ${errorDetails}`);
    }

    const jsonResponse = await response.json();
    console.log("\n--- Resposta da API Completa ---");
    console.log(JSON.stringify(jsonResponse, null, 2)); // Imprime a resposta completa formatada

    console.log("\n--- Detalhes Importantes (Expandidos) ---");
    console.log("Session ID:", jsonResponse.sessionId);
    console.log("Result ID:", jsonResponse.resultId);
    console.log("Typebot ID:", jsonResponse.typebot.id);
    console.log("Publicado em:", jsonResponse.typebot.publishedAt);

    // Expande e exibe o conteúdo das mensagens
    if (jsonResponse.messages && jsonResponse.messages.length > 0) {
      console.log("\n---> Mensagens Recebidas:");
      jsonResponse.messages.forEach((msg, index) => {
        console.log(`  Mensagem ${index + 1} (ID: ${msg.id}, Tipo: ${msg.type}):`);
        if (msg.type === 'text' && msg.content && msg.content.richText) {
          const textContent = msg.content.richText.map(block =>
            block.children.map(child => child.text).join('')
          ).join('\n    ');
          console.log(`    Conteúdo de Texto: "${textContent}"`);
        } else if (msg.type === 'image' && msg.content && msg.content.url) {
          console.log(`    URL da Imagem: "${msg.content.url}"`);
          console.log(`    Alt da Imagem: "${msg.content.alt || 'N/A'}"`);
        } else {
          console.log(`    Conteúdo (Objeto Original): ${JSON.stringify(msg.content, null, 2)}`);
        }
      });
    }

    // Expande e exibe os detalhes do input esperado
    if (jsonResponse.input) {
      console.log("\n---> Próxima Interação (Input Esperado):");
      console.log(`  Tipo: ${jsonResponse.input.type}`);
      console.log(`  ID do Input: ${jsonResponse.input.id}`);

      if (jsonResponse.input.type === 'choice input' && jsonResponse.input.items && jsonResponse.input.items.length > 0) {
        console.log("  Opções de Escolha Disponíveis:");
        jsonResponse.input.items.forEach((item, index) => {
          // CORREÇÃO AQUI: Usar item.content para o texto e valor
          const displayText = item.content || 'N/A';
          const valueToSend = item.content || 'N/A'; // No Typebot, o content geralmente é o valor a ser enviado para choices simples.
          console.log(`    Opção ${index + 1}:`);
          console.log(`      Texto Exibido: "${displayText}"`);
          console.log(`      Valor a Enviar: "${valueToSend}"`);
          if (item.id) {
            console.log(`      ID da Opção: "${item.id}"`);
          }
        });
      } else if (jsonResponse.input.placeholder) {
          console.log(`  Placeholder do Input: "${jsonResponse.input.placeholder}"`);
      } else {
          console.log(`  Detalhes do Input (Objeto Original): ${JSON.stringify(jsonResponse.input, null, 2)}`);
      }
    } else {
      console.log("\n---> Não há input esperado do usuário. O chat pode ter terminado ou está em um estado de processamento.");
    }

    console.log("\n--- Sugestão para os Próximos Passos ---");
    if (jsonResponse.input && jsonResponse.input.type === 'choice input' && jsonResponse.input.items && jsonResponse.input.items.length > 0) {
      const firstOptionContent = jsonResponse.input.items[0].content || 'N/A';
      console.log("O bot está esperando uma escolha. Para continuar a conversa, você deve chamar 'interactWithChat'");
      console.log(`com o 'sessionId' atual e o 'value' de uma das opções como 'answer' no corpo da requisição.`);
      console.log(`Exemplo (escolhendo a primeira opção):`);
      console.log(`  await interactWithChat({ answer: "${firstOptionContent}" }, '${jsonResponse.sessionId}');`);
    } else if (jsonResponse.input && jsonResponse.input.type === 'text input') {
        console.log("O bot está esperando uma entrada de texto. Para continuar a conversa, você deve chamar 'interactWithChat'");
        console.log(`com o 'sessionId' atual e a resposta de texto como 'answer' no corpo da requisição.`);
        console.log(`Exemplo:`);
        console.log(`  await interactWithChat({ answer: "Minha resposta de texto aqui" }, '${jsonResponse.sessionId}');`);
    } else {
        console.log("Não há input direto do usuário esperado neste momento. Revise a lógica do Typebot ou aguarde mais ações.");
    }

    return jsonResponse;

  } catch (error) {
    console.error("Erro na interação com o chat:", error);
    return undefined;
  }
}

// --- Como Usar (Exemplo de Fluxo) ---
(async () => {
  console.log("--- Iniciando a sessão de chat (Primeira Requisição) ---");
  const firstResponse = await interactWithChat({});

  if (firstResponse && firstResponse.sessionId && firstResponse.input) {
    const currentSessionId = firstResponse.sessionId;
    const inputType = firstResponse.input.type;

    if (inputType === 'choice input' && firstResponse.input.items.length > 0) {
      // CORREÇÃO AQUI: Usar item.content para o valor a ser enviado
      const chosenValue = firstResponse.input.items[0].content; 
      const chosenText = firstResponse.input.items[0].content; // O que foi exibido e escolhido

      console.log(`\n--- Continuando o chat: Escolhendo "${chosenText}" ---`);
      // AQUI o body deve ser { answer: chosenValue }
      const secondResponse = await interactWithChat({ answer: chosenValue }, currentSessionId);

      // Você pode encadear mais interações aqui se o secondResponse também tiver um input
      // if (secondResponse && secondResponse.sessionId && secondResponse.input) {
      //   // Faça algo com a segunda resposta...
      // }

    } else if (inputType === 'text input') {
      const textAnswer = "Olá Typebot, esta é uma resposta de texto!";
      console.log(`\n--- Continuando o chat: Enviando texto "${textAnswer}" ---`);
      const secondResponse = await interactWithChat({ answer: textAnswer }, currentSessionId);
    }
  } else {
    console.log("\nNão foi possível obter uma resposta válida ou sessionId para continuar o chat.");
  }
})();