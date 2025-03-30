const protect = (req, res, next) => {
   try {
      const [type, token] = req.headers.authorization?.split(" ");
      if(!token) throw new 

      console.log(token);
   } catch (error) {
      next(error);
   }
};

export default protect;
