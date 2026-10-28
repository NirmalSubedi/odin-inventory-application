import { unknownColorFieldError } from "../../errors/validators/errors.js";

const knownFields = ["fruitColor", "peelColor"];

export const isValidColorField = (field) => {
  if (!knownFields.includes(field))
    throw new Error(`Color field ${unknownColorFieldError}`);

  return true;
};
