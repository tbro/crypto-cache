from node:8-alpine

RUN apk add --no-cache tini
RUN apk add --no-cache --virtual .buildDepends python make g++ git

ENV PATH="/home/node/crypto-cache/bin:${PATH}"
ENV NODE_ENV="production"

RUN mkdir -p /home/node/crypto-cache && \
    chown node:node /home/node/crypto-cache

WORKDIR /home/node/crypto-cache
COPY --chown=node:node package.json .
RUN npm install
ADD --chown=node:node . .

RUN apk del .buildDepends

USER node

ENTRYPOINT ["/sbin/tini", "--"]
