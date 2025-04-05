import express from "express";
import rootRouter from "./src/routers/root.router";
import { handleError } from "./src/common/helpers/error.helper";
import logger from "./src/common/winston/init.winston";
import logApi from "./src/common/morgan/init.morgan";
import cors from "cors";

const app = express();

// middleware
app.use(express.json());
app.use(logApi());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://google.com"],
  })
);

app.use(rootRouter);
app.use(handleError);

app.listen(3069, () => {
  logger.info(`Server online at http://localhost:3069`, { tag: "SERVER" });
});
