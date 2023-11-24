FROM node:alpine AS builder

WORKDIR /app

COPY . /app

WORKDIR /app/web

RUN npm ci && npm run build

WORKDIR /app/server

RUN npm ci && npm run build

FROM node:alpine

ENV NODE_ENV=production

COPY --from=builder /app/server/package.json /app/package.json
COPY --from=builder /app/server/package-lock.json /app/package-lock.json
COPY --from=builder /app/server/dist /app/dist
COPY --from=builder /app/server/db /app/db
COPY --from=builder /app/server/public /app/public

WORKDIR /app
RUN npm ci --production
EXPOSE 3000
ENTRYPOINT [ "node", "dist/index.js" ]

