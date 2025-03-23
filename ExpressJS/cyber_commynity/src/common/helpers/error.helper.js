import { responseError } from "./reponse.helper";

export const handleError = (err, req, res, next) => {
     //   (new Error())
     console.log(err);
     const response = responseError(err.message, err.statusCode, err.stack);
     res.status(response.statusCode).json(response);
};
