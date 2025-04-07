const checkPermission = (req, res, next) => {
   try {
      // 1 - endpoint người dùng gọi
      const routerPath = req.route.path;
      const baseUrl = req.baseUrl
      const endpoint = `${baseUrl}${routerPath}`

      const method = req.method
      console.log({ endpoint, method });

      // 2 - endpoint trong db

      next()
   } catch (error) {
      next(error);
   }
};

export default checkPermission;
