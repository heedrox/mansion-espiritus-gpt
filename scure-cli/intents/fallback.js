import { commands } from 'scure'

const { scureFallback } = commands

export const fallback = scure => (conv) => {
  /* if (conv.getRawInput() === 'activateft') {
    conv.data.testFT = true;
    conv.ask('ok. ¿y ahora qué?');
    return;
  } */
  const response = scureFallback(conv.data, scure);
  conv.ask(response.sentence);
  return response;
};

