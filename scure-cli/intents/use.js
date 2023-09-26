const { getArgumentList } = require('../lib/common');
const { scureUse } = require('scure').commands;
const { overwriteDataFrom, sendResponse } = require('../lib/common');

const use = scure => (conv, args) => {
  const items = getArgumentList(args, 'arg');

  const scureResponse = scureUse(items, conv.data, scure);

  overwriteDataFrom(scureResponse, conv);

  return sendResponse(conv, scure, scureResponse);
};

exports.use = use;
