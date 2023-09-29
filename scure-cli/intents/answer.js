import { getArgument, overwriteDataFrom, sendResponse } from '../lib/common.js';
import { commands } from 'scure'

const { scureAnswer } = commands

export const answer = scure => (conv, args) => {
  const userAnswer = getArgument(args, 'arg');

  const scureResponse = scureAnswer(userAnswer, conv.data, scure);

  overwriteDataFrom(scureResponse, conv);

  return sendResponse(conv, scure, scureResponse);
};
