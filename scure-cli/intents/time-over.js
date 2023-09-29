import { commands } from 'scure'

const { scureTimeover } = commands

export const timeOver = scure => (conv) => {
  const response = scureTimeover(conv.data, scure);
  conv.close(response.sentence);
};
