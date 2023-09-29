import { commands } from 'scure'

const { scureBye } = commands

export const bye = scure => (conv) => {
  const response = scureBye(conv.data, scure);
  conv.data = null;
  return {
    sentence: response.sentence,
    isEnd: true
  }
};

