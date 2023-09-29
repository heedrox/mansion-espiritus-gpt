import { sendResponse } from '../lib/common.js';
import { commands } from 'scure'

const { scureInventory } = commands

export const inventory = scure => (conv) => {
  const scureResponse = scureInventory(conv.data, scure);

  return sendResponse(conv, scure, scureResponse);
};

