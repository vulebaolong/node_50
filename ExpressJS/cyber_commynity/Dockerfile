# alpine: phiên bản node rút gọn
FROM node:22.9.0-alpine

# thiết lập đường dẫn
WORKDIR /home/app

# copy package để cài node_modules
# ignore node_modules ở ngoài source gốc
COPY package*.json ./

# 5p => 5p  * 60s * 1000ms = 300.000ms
RUN npm install --timeout=300000

# copy hết source
COPY . .

# RUN: chạy nhiều lần trong lúc đang build
RUN npx prisma generate

CMD ["npm", "run", "start"]
# CMD: câu lệnh chạy 1 lần, và thường dùng để chốt, để cuối cùng