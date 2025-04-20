import express from "express";
import demoRouter from "./demo.router";
import articleRouter from "./article.router";
import authRouter from "./auth.router";
import roleRouter from "./role.router";
import permissionRouter from "./permission.router";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../common/swagger/init.swagger";
import userRouter from "./user.router";
import chatRouter from "./chat.router";
import schema from "../common/graphql/schema.graphql";
import root from "../common/graphql/root.graphql";
import { createHandler } from "graphql-http/lib/use/express";
import ruru from "../common/graphql/ruru/init.ruru";

const rootRouter = express.Router();

rootRouter.get("/ruru", ruru);
rootRouter.all(
   "/graphql",
   createHandler({
      schema: schema,
      rootValue: root,
      context: (req) => {
         const accssToken = req.headers?.authorization?.split(" ")[1];
         return { accessToken: accssToken };
      },
   })
);

rootRouter.use("/api-docs", swaggerUi.serve);
rootRouter.get("/api-docs", swaggerUi.setup(swaggerDocument, { swaggerOptions: { persistAuthorization: true } }));

rootRouter.use(`/demo`, demoRouter);
rootRouter.use(`/article`, articleRouter);
rootRouter.use(`/auth`, authRouter);
rootRouter.use(`/role`, roleRouter);
rootRouter.use(`/permission`, permissionRouter);
rootRouter.use(`/user`, userRouter);
rootRouter.use(`/chat`, chatRouter);

export default rootRouter;
