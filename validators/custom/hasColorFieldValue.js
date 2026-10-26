import { splitCamelCase } from "../../utils/aggregate.js";

const emptyError = "must not be empty.";

export const hasColorFieldValue = (_, { req, location }) => {
  const { colorField } = req.params;
  const inputColorValue = req[location][colorField];
  const formattedField = splitCamelCase(colorField);

  if (!inputColorValue) throw new Error(`Select a ${formattedField} to add.`);
  if (inputColorValue.trim() === "")
    throw new Error(`${formattedField} ${emptyError}`);

  return true;
};
