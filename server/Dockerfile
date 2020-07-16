FROM node:13.12.0-alpine
WORKDIR /app


ENV NODE_ENV="development"
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install -g nodemon
RUN yarn install  --frozen-lockfile
COPY . ./

CMD ["nodemon", "./src/index", "--inspect-port=\"12345\"","--inspect"]