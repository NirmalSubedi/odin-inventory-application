import { NOT_FOUND } from "../config.js";

export class NotFoundError extends Error {
  constructor(message, options) {
    super(message, options);
    this.statusCode = NOT_FOUND;
    this.name = this.constructor.name;
  }
}
