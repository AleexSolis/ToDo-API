#Copy and build taxaroo types
FROM node:14.18

WORKDIR /usr/src/api
COPY . .

RUN npm install
RUN npm run build

CMD npm run start:prod

EXPOSE 3000