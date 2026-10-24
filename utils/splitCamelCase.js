import { SPLIT_CAMELCASE_DELIMITER } from "../config.js";

export const splitCamelCase = (camelCase) => {
  const result = [];

  let wordStart = 0;
  for (let i = 0, n = camelCase.length; i < n; ++i) {
    const char = camelCase[i];
    if (char.toUpperCase() !== char) continue;

    result.push(camelCase.slice(wordStart, i));
    wordStart = i;
  }
  result.push(camelCase.slice(wordStart));

  return result.join(SPLIT_CAMELCASE_DELIMITER);
};
