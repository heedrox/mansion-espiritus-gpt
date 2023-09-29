import { fallback, timeOver } from '../intents/index.js';
import { commands } from 'scure'
import { isTimeOver } from './common.js';

const { scureInitializeState } = commands

const isBeginning = (scure, conv) => conv.data.numCommands < scure.getInit().welcome.length;
const getIntentToUse = (scure, conv, args, intentFunction) => {
  if (isBeginning(scure, conv)) {
    return fallback;
  } else if (isTimeOver(conv.data, scure)) {
    return timeOver;
  } 
  return intentFunction;
};

export const intentProcessor = scure => intentFunction => (conv, args) => {
  // eslint-disable-next-line no-console
  conv.data = scureInitializeState(scure, conv.data);
  const intentToUse = getIntentToUse(scure, conv, args, intentFunction);
  return intentToUse(scure)(conv, args);
};


