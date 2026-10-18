import express from "express";
import {
  getIndexPage,
  respondWithMissingResource,
} from "../controllers/indexController.js";

export const indexRouter = express.Router();

indexRouter.get("/", getIndexPage);

indexRouter.use(respondWithMissingResource);
