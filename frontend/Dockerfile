FROM node:14-alpine as node
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginxn
COPY --from=node app/dist/frontend /usr/share/nginx/html