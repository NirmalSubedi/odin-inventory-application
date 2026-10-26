const knownFields = ["fruitColor", "peelColor"];
const unknownFieldError = "must be fruitColor or peelColor";

export const isValidColorField = (field) => {
  if (!knownFields.includes(field))
    throw new Error(`Color field ${unknownFieldError}`);

  return true;
};
