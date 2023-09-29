import { getArgumentList, overwriteDataFrom, sendResponse } from '../lib/common.js';
import { commands } from 'scure'

const { scureUse } = commands

export const use = scure => (conv, args) => {
  const items = getArgumentList(args, 'arg');

  const scureResponse = scureUse(items, conv.data, scure);

  overwriteDataFrom(scureResponse, conv);

  return sendResponse(conv, scure, scureResponse);
};
