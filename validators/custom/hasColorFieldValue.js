import { emptyError } from "../../errors/validators/errors.js";
import { splitCamelCase } from "../../utils/aggregate.js";

export const hasColorFieldValue =
  (action) =>
  (_, { req, location }) => {
    const { colorField } = req.params;
    const inputColorValue = req[location][colorField];
    const formattedField = splitCamelCase(colorField);

    if (!inputColorValue)
      throw new Error(`Select a ${formattedField} ${action}.`);
    if (inputColorValue.trim() === "")
      throw new Error(`${formattedField} ${emptyError}`);

    return true;
  };
