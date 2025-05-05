import articleSwagger from "./article.swagger";
import authSSwagger from "./auth.swagger";
import userSwagger from "./user.swagger";

const swaggerDocument = {
   openapi: "3.1.1",
   info: {
      title: "Cyber Community API",
      version: "1.0.0",
   },
   servers: [
      {
         url: "https://cybercommunity.vercel.app",
         description: "Production Server",
      },
   ],
   components: {
      securitySchemes: {
         anhlongmaidinhAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
         },
      },
   },
   paths: {
      ...articleSwagger,
      ...authSSwagger,
      ...userSwagger,
   },
};

export default swaggerDocument;
