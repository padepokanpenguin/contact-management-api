import express from "express";
import { publicRouter } from "../routes/public-api";
import { errMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../routes/api";

export const app = express();
app.use(express.json());

app.use(publicRouter)
app.use(apiRouter)
app.use(errMiddleware)

