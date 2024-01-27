FROM node:21-alpine as build-stage

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# Production-Stage
FROM nginx:alpine

COPY --from=build-stage /app/dist /app

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
