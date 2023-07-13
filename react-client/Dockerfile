FROM node:18.16.1

WORKDIR /dockerpoc

COPY package.json ./

RUN npm install


COPY . .


EXPOSE 8086


CMD ["npm", "start"]
