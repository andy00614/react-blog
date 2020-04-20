FROM node:alpine
WORKDIR /code
COPY package.json .
RUN npm install
EXPOSE 80
CMD npm run dev