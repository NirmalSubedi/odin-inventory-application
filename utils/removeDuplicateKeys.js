export const removeDuplicateKeys = (acc, object) => {
  for (let key in object) {
    acc[key] ??= new Set();
    acc[key].add(object[key]);
  }
  return acc;
};
