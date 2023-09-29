import { lib } from 'scure'
import { getCommandForIntent, getIntentForCommand } from './intent-command-mapper.js';
import { getArgument  } from '../lib/common.js';
import { commands } from 'scure'

const { getCommandSyn } = lib
const { scureAnswer } = commands


export const checkForSyns = originalIntent => scure => (conv, args) => {
  const argument = getArgument(args, 'arg');
  const command = getCommandForIntent(originalIntent);
  const commandToReplace = getCommandSyn(command, argument, conv.data, scure);
  const updatedIntent = commandToReplace ? getIntentForCommand(commandToReplace) : originalIntent;
  return updatedIntent(scure)(conv, args);
};

