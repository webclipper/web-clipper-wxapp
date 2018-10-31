FROM node:10.9.0-alpine as build

COPY . /source/
WORKDIR /source

RUN yarn && yarn test && yarn build