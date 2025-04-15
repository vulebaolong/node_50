const articleSwagger = {
   "/article/": {
      get: {
         tags: ["Article"],
         security: [{ anhlongmaidinhAuth: [] }],
         parameters: [
            { name: "page", in: "query", description: "Nếu không truyền thì mặc định là 1" },
            { name: "pageSize", in: "query", description: "Nếu không truyền thì mặc định là 3" },
            { name: "x-api-key", in: "header", description: "api key" },
         ],
         responses: {
            200: { description: "oke" },
         },
      },
   },
   "/article/{id}": {
      get: {
         tags: ["Article"],
         security: [{ anhlongmaidinhAuth: [] }],
         parameters: [
            { name: "id", in: "path", description: "id article" },
         ],
         responses: {
            200: { description: "oke" },
         },
      }
   }
};

export default articleSwagger;
