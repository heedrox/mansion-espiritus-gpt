import { getArgument, overwriteDataFrom, sendResponse } from '../lib/common.js';
import { commands } from 'scure'

const { scurePickup } = commands


export const pickup = scure => (conv, args) => {
  const itemName = getArgument(args, 'arg');

  const scureResponse = scurePickup(itemName, conv.data, scure);

  overwriteDataFrom(scureResponse, conv);
  return sendResponse(conv, scure, scureResponse);
};

