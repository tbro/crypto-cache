from node:8-alpine

RUN apk add --no-cache tini
RUN apk add --no-cache --virtual .buildDepends python make g++ git

ENV PATH="/home/node/crypto-cache/bin:${PATH}"
ENV NODE_ENV="production"
ENV PORT=${PORT:-5000}

RUN mkdir -p /home/node/crypto-cache && \
    chown node:node /home/node/crypto-cache

WORKDIR /home/node/crypto-cache
COPY --chown=node:node package.json .
ADD --chown=node:node . .
RUN npm install --silent && \
  chown -R node:node /home/node/crypto-cache

RUN apk del .buildDepends

EXPOSE $PORT
USER node

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]

