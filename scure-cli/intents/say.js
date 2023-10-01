import { getArgument } from '../lib/common.js';

export const say = scure => (conv, args) => {
  const text = getArgument(args, 'arg');

  return {
    sentence: text,
    isEnd: false
  }
};
