const { scureInventory } = require('scure').commands;
const { sendResponse } = require('../lib/common');

const inventory = scure => (conv) => {
  const scureResponse = scureInventory(conv.data, scure);

  return sendResponse(conv, scure, scureResponse);
};

exports.inventory = inventory;
