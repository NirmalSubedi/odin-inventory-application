import { INTERNAL_SERVER_ERROR } from "../config.js";

export const requestLogger = (req, res, next) => {
  const requestStartTime = performance.now();
  const timeOfRequest = new Date().toUTCString();

  res.once("close", () => {
    const responseDuration =
      (performance.now() - requestStartTime).toFixed(4) + "ms";

    console.log(
      `${timeOfRequest} - ${req.method} ${req.originalUrl} ${res.statusCode} - ${responseDuration}`,
    );

    if (req.body) console.log(req.body);
  });

  next();
};

export const errorHandler = (error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || INTERNAL_SERVER_ERROR).send(error.message);
};
