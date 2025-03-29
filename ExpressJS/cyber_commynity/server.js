import express from "express";
import pool from "./src/common/mysql2/pool.mysql2";
import sequelize, { models } from "./src/common/sequelize/connect.sequelize";
import { DataTypes } from "sequelize";
import rootRouter from "./src/routers/root.router";
import { handleError } from "./src/common/helpers/error.helper";
import logger from "./src/common/winston/init.winston";
import logApi from "./src/common/morgan/init.morgan";

const app = express();

// middleware
app.use(express.json());
app.use(logApi())

app.use(rootRouter);
app.use(handleError);

app.listen(3069, () => {
   logger.info(`Server online at http://localhost:3069`, { tag: "SERVER" });
});
