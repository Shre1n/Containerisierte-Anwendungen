FROM node:21-alpine as build-stage

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# Production-Stage
FROM nginx:alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
