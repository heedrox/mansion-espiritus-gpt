const { scureAnswer } = require('scure').commands;
const { overwriteDataFrom, sendResponse, getArgument } = require('../lib/common');

const answer = scure => (conv, args) => {
  const userAnswer = getArgument(args, 'arg');

  const scureResponse = scureAnswer(userAnswer, conv.data, scure);

  overwriteDataFrom(scureResponse, conv);

  return sendResponse(conv, scure, scureResponse);
};

exports.answer = answer;
