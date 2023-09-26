const { sendResponse } = require('../lib/common');
const { scureHelp } = require('scure').commands;

const helpWithoutMap = scure => (conv) => {
  const response = scureHelp(conv.data, scure);

  return sendResponse(conv, scure, response);
};

// eslint-disable-next-line no-confusing-arrow
const help = scure => conv => helpWithoutMap(scure)(conv);

exports.help = help;
