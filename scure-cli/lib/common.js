const forceItemsToBeArray = (items) => {
  if (items && typeof items === 'object' && typeof items.length === 'number') return items;
  return [items];
};

const substitute = (sentence, args) => {
  const replacer = (s1, s2) => s1.replace(`{${s2}}`, args[s2]);
  return Object.keys(args).reduce(replacer, sentence);
};

export const getArgument = (args, argName) => {
  const value = args[argName];
  if (!value) return null;
  if (typeof value === 'object' && typeof value.length === 'number') return value[0];
  return value;
};

export const getArgumentList = (args, argName) => forceItemsToBeArray(args[argName]);

export const isEmptyArg = (arg) => {
  if (!arg) return true;
  if (typeof arg.length !== 'undefined' && arg.length === 0) return true;
  if (JSON.stringify(arg).trim() === '[]') return true;
  if (JSON.stringify(arg).trim() === '{}') return true;
  if (arg.trim && (arg.trim() === '')) return true;
  return false;
};

export const overwriteDataFrom = (scureResponse, conv) => {
  if (scureResponse.data) {
    conv.data = scureResponse.data;
  }
};

export const isTimeOver = (data, scure) => {
  const startTime = new Date(JSON.parse(data.startTime || JSON.stringify(new Date())));
  const currentTime = new Date();
  return (currentTime.getTime() - startTime.getTime()) > (scure.data.init.totalMinutes * 60 * 1000);
};

export const cleanData = (conv) => {
  conv.data.numCommands = 0;
  conv.data.roomId = null;
  conv.data.startTime = null;
  conv.data.inventory = [];
  conv.data.picked = [];
  return conv;
};

export const baseChars = str => str.toLowerCase().replace(/[áäàÀÁÂÃÄÅ]/g, 'a')
  .replace(/[èéèÈÉÊË]/g, 'e')
  .replace(/[íìIÎ]/g, 'i')
  .replace(/[óòÓÔ]/g, 'o')
  .replace(/[úùüÙ]/g, 'u')
  .replace(/[çÇ]/g, 'c')
  .replace(/[ñÑ]/g, 'n')
  .replace(/[-\\?]/g, '');

const shouldNotIncludeQuestion = sentence =>
  (sentence.lastIndexOf('?') >= sentence.length - 10) || (sentence.indexOf('<speak>') >= 0);

const getFinalSentence = (scure, conv, finalSentence) => {
  const timeLeft = scure.getLeftTimeFrom(conv.data.startTime);
  const remainingTime =
    scure.sentences.get('ending-remaining-time', { timeLeft });
  return substitute(finalSentence.description, { remainingTime });
};

const speak = (sentence, conv) => {
  if ((sentence.indexOf("<audio") >= 0) && (sentence.indexOf("<speak") === -1)) {
    conv.ask(`<speak>${sentence}</speak>`);
  } else {
    conv.ask(`${sentence}`);
  }
};

export const sendResponse = (conv, scure, scureResponse) => {
  const finalSentence = scureResponse.sentence;
  if (finalSentence.isEndingScene) {
    const finalWords = getFinalSentence(scure, conv, finalSentence);
    return {
      sentence: finalWords,
      isEnd: true
    }
  } else if (shouldNotIncludeQuestion(finalSentence)) {
    return {
      sentence: finalSentence,
      isEnd: false
    }
  } else {
    const finalQuestion = scure.sentences.get('final-question');
    return {
      sentence: `${finalSentence} ${finalQuestion}`,
      isEnd: false
    }
  }
};
