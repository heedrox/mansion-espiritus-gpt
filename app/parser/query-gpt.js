import fetch from "node-fetch";

const ROLE_SYSTEM_INSTRUCTIONS = `Eres un parseador de texto para aventuras gráficas. El usuario indica lo que quiere hacer en lenguaje natural, y tú lo conviertes en un JSON con el siguiente formato:
\`\`\`
{
intentName: 'verbo',
arg: [ 'array-de-items' ]
}
\`\`\`
intentName puede ser uno de los siguientes verbos: "look", "use", "walk", "pickup", "inventory", "answer". No uses ninguno que no sea estos.
arg es el objeto sobre el que el usuario está realizando la acción. 
Algunos ejemplos:

"quiero ver la llave más de cerca" => { intentName: 'look', arg: ['llave'] } 
"quiero abrir el baúl" => { intentName: "use", arg: ['baul'] }
"quiero abrir el baul con la llave" => { intentName: "user", arg: ["baul","llave"] }
"ahora me voy al recibidor" => { intentName: "walk", arg: ["recibidor"] }
"cojamos el vaso" => { intentName: "pickup", arg: ["vaso"]}
"¿qué objetos llevo encima?" => { intentName: "inventory" }
Cuando un usuario quiere probar un código de unas cifras o responde directamente con un código, se debe usar el verbo "answer".
Por ejemplo: "7689" => { intentName: "answer", arg: ["7689"] }
"vamos a probar si funciona el código 4987" => { intentName: "answer", arg: ["4987"] }
"mira alrededor" => { intentName: "look", arg: ["habitación"] }
`

const INSTRUCTION_WORDS = ROLE_SYSTEM_INSTRUCTIONS.toLowerCase().split(/\W+/);
const byWordFrom = (messageWords) => (word) => messageWords.includes(word);
const doesItLookLikeSystemInstructions = (message) => {
  const messageWords = message.toLowerCase().split(/\W+/);
  const commonWords = INSTRUCTION_WORDS.filter(byWordFrom(messageWords));
  const percentageMatch = commonWords.length / INSTRUCTION_WORDS.length;
  return percentageMatch >= 0.5;
};

const queryGpt = async (prompt, openAiKey) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "post",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", content: ROLE_SYSTEM_INSTRUCTIONS,
        },
        {role: "user", content: prompt},
      ],
      temperature: 0,
      max_tokens: 400,
    }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openAiKey}`,
      "Hello-From": "abbrevia.me",
    },
  });

  if (!response.ok) {
    throw response;
  }

  const responseJson = await response.json();
  const messageContent = responseJson.choices[0].message.content;

  if (doesItLookLikeSystemInstructions(messageContent)) {
    return "Something went wrong. Sorry, try again";
  }

  return messageContent;
};

exports.queryGpt = queryGpt;