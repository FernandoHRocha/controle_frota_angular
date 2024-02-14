FROM node:21.6.1-alpine as node
RUN npm install -g json-server
COPY test.json /tmp
ENTRYPOINT ["json-server", "--port", "3001", "--host", "0.0.0.0"]
EXPOSE 3001
CMD ["/tmp/test.json"]