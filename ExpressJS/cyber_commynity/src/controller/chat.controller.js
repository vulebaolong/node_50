import { responseSuccess } from "../common/helpers/reponse.helper";
import { chatService } from "../services/chat.service";

export const chatController = {
   create: async function (req, res, next) {
      try {
         const result = await chatService.create(req);
         const response = responseSuccess(result, `Create chat successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   findAll: async function (req, res, next) {
      try {
         const result = await chatService.findAll(req);
         const response = responseSuccess(result, `Get all chats successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   findOne: async function (req, res, next) {
      try {
         const result = await chatService.findOne(req);
         const response = responseSuccess(result, `Get chat #${req.params.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   update: async function (req, res, next) {
      try {
         const result = await chatService.update(req);
         const response = responseSuccess(result, `Update chat #${req.params.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   remove: async function (req, res, next) {
      try {
         const result = await chatService.remove(req);
         const response = responseSuccess(result, `Remove chat #${req.params.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   }
};