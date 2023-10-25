FROM node:16-alpine3.18

ENV NODE_ENV production

WORKDIR /connector/

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./tsconfig.json ./
COPY ./entrypoint.sh ./
COPY ./src ./src
COPY ./logo.png ./logo.png
COPY .git/ .git/

RUN set;
RUN set -e; apk add --no-cache git; npm --no-git-tag-version --allow-same-version version $(git describe --tags); 
RUN rm -rf .git;
RUN set -e; addgroup -g 1111 connector; adduser -S -u 1111 -G connector connector

RUN set -e; apk add --no-cache git python3 make g++; yarn config set --home enableTelemetry 0; chmod 755 /connector/entrypoint.sh; cd /connector/; yarn install --frozen-lockfile; yarn run build

USER connector

ENTRYPOINT ["/connector/entrypoint.sh"]