import express from "express";
import demoRouter from "./demo.router";
import articleRouter from "./article.router";
import authRouter from "./auth.router";
import roleRouter from "./role.router";
import permissionRouter from "./permission.router";

const rootRouter = express.Router();

rootRouter.use(`/demo`, demoRouter);
rootRouter.use(`/article`, articleRouter);
rootRouter.use(`/auth`, authRouter);
rootRouter.use(`/role`, roleRouter);
rootRouter.use(`/permission`, permissionRouter);

export default rootRouter;
