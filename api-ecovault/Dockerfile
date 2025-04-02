ARG NODE_IMAGE=node:20-alpine3.19
ARG PORT=80

FROM ${NODE_IMAGE} as build

RUN mkdir -p /src/app/

COPY . /src/app/
COPY package.json /src/app/

WORKDIR /src/app/

RUN npm ci
RUN npm run build
