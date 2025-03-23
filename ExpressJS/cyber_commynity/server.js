import express from "express";
import pool from "./src/common/mysql2/pool.mysql2";
import sequelize, { models } from "./src/common/sequelize/connect.sequelize";
import { DataTypes } from "sequelize";
import rootRouter from "./src/routers/root.router";
import { handleError } from "./src/common/helpers/error.helper";

const app = express();

app.use(express.json());

app.use(rootRouter)
app.use(handleError)

app.listen(3069, () => {
   console.log(`Server online at http://localhost:3069`);
});