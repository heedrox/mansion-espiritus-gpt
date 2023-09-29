import { look, pickup, use, walk } from '../intents/index.js';
import { dsl } from 'scure'

const { Commands } = dsl

const INTENT_COMMANDS_MAP = new Map([
  [walk, Commands.WALK],
  [look, Commands.LOOK],
  [pickup, Commands.PICKUP],
  [use, Commands.USE],
]);

const byCommand = command => intent => INTENT_COMMANDS_MAP.get(intent) === command;
export const getCommandForIntent = intent => INTENT_COMMANDS_MAP.get(intent);
export const getIntentForCommand = command => [...INTENT_COMMANDS_MAP.keys()].find(byCommand(command));
