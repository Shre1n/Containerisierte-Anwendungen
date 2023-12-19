FROM node:21-alpine as cache

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

FROM cache as compiler

WORKDIR /app

COPY --from=cache /app/node_modules ./node_modules

COPY server.ts .
COPY tsconfig.json .
COPY package.json .
COPY package-lock.json .

RUN ./node_modules/.bin/tsc

FROM compiler as runtime
WORKDIR /app
COPY --from=cache /app/node_modules ./node_modules
COPY --from=compiler /app/*.js .
COPY --from=compiler /app/*.json .

EXPOSE 8080

CMD ["node", "Skript.js"]
