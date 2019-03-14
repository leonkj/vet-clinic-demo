FROM node:10.10-alpine

RUN mkdir -p /usr/src/client

WORKDIR /usr/src/client

# Prevent the reinstallation of node modules at every changes in the source code
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install

COPY . ./

CMD yarn start
