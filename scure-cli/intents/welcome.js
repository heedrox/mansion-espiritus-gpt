import { sendResponse } from '../lib/common.js';
import { commands } from 'scure'

const { scureWelcome } = commands

export const welcome = scure => (conv) => {
  const response = scureWelcome(conv.data, scure);

  return sendResponse(conv, scure, response);
};
