const numeralize = x =>
  x.replace(/\buno\b/g, '1')
    .replace(/\bdos\b/g, '2')
    .replace(/\btres\b/g, '3')
    .replace(/\bcuatro\b/g, '4')
    .replace(/\bcinco\b/g, '5')
    .replace(/\bseis\b/g, '6')
    .replace(/\bsiete\b/g, '7')
    .replace(/\bocho\b/g, '8')
    .replace(/\bnueve\b/g, '9')
    .replace(/\bcero\b/g, '0')
    .replace(/\D/g, '');

export const answerArconCode = (data, scure, userAnswer) => {
  if (typeof userAnswer === 'undefined') return '';
  const cleanAnswer = numeralize(userAnswer);
  const sentence = cleanAnswer === '6143' ? 'arcon-wrong-back' : 'arcon-wrong';
  return scure.sentences.get(sentence);
};
