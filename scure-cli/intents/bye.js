const { sendResponse } = require('../lib/common');

const { scureBye } = require('scure').commands;

const bye = scure => (conv) => {
  const response = scureBye(conv.data, scure);
  conv.data = null;
  return {
    sentence: response.sentence,
    isEnd: true
  }
};

exports.bye = bye;
