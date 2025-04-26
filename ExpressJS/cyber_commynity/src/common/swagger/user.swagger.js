const userSwagger = {
   "/user/avatar-local": {
      post: {
         tags: ["User"],
         security: [{ anhlongmaidinhAuth: [] }],
         requestBody: {
            content: {
               "multipart/form-data": {
                  schema: {
                     type: "object",
                     properties: {
                        title: { type: "string" },
                        file: { type: "string", format: "binary" },
                        avatar: { type: "string", format: "binary" },
                        files: { type: "array", items: { type: "string", format: "binary" } },
                     }
                  }
               }
            }
         },
         responses: {
            200: { description: "oke" },
         },
      }
   },
};

export default userSwagger;
