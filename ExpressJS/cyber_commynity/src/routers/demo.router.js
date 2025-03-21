import express from 'express';

const demoRouter = express.Router()

//  http://localhost:3069/demo/check-server
demoRouter.get(`/`, (request, response, next) => {
   response.json(`hello word`);
});
demoRouter.get(`/check-server`, (request, response, next) => {
   response.json(`check-server`);
});

export default demoRouter;