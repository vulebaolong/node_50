import { Server } from "socket.io";

const createRoomId = (userIdSender, userIdRecipient) => {
   // quy tắc sắp xếp cần phải tuân thủ hạn chế thay đổi
   const roomId = [userIdSender, userIdRecipient].sort((a, b) => a - b).join("_");
   // console.log({ roomId });
   return `chat_${roomId}`;
};

const initSocket = (httpServer) => {
   const io = new Server(httpServer, {
      /* options */
   });

   io.on("connection", (socket) => {
      console.log(`socket id`, socket.id);

      // emit: bắn sự kiện cho FE
      // on: lắng nghe sự kiện tự FE bắn cho BE

      socket.on("JOIN_ROOM", (payload) => {
         console.log("JOIN_ROOM", { payload });
         const { userIdSender, userIdRecipient } = payload;

         const roomId = createRoomId(userIdSender, userIdRecipient);

         socket.join(roomId);
      });

      socket.on("SEND_MESSAGE", (payload) => {
         console.log("SEND_MESSAGE", { payload });
         const { message, userIdSender, userIdRecipient } = payload;

         const roomId = createRoomId(userIdSender, userIdRecipient);

         const createdAt = new Date();

         io.to(roomId).emit("RECEIVE_MESSAGE", {
            roomId: roomId,
            payload: {
               message: message,
               userIdSender: userIdSender,
               userIdRecipient: userIdRecipient,
               createdAt: createdAt,
            },
         });

         // lưu db
      });
   });
};

export default initSocket;
