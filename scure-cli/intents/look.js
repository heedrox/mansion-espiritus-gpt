import { getArgument, overwriteDataFrom, sendResponse } from '../lib/common.js';
import { commands } from 'scure'

const { scureLook } = commands

export const look = scure => (conv, args) => {
  const itemName = getArgument(args, 'arg');

  const scureResponse = scureLook(itemName, conv.data, scure);

  overwriteDataFrom(scureResponse, conv);
  return sendResponse(conv, scure, scureResponse);
};

