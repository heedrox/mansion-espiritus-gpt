import { sendResponse } from '../lib/common.js';
import { commands } from 'scure'

const { scureHelp } = commands

const helpWithoutMap = scure => (conv) => {
  const response = scureHelp(conv.data, scure);

  return sendResponse(conv, scure, response);
};

// eslint-disable-next-line no-confusing-arrow
export const help = scure => conv => helpWithoutMap(scure)(conv);
