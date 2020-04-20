FROM node:alpine
WORKDIR /code
COPY . .
RUN npm install
EXPOSE 3000
CMD npm start