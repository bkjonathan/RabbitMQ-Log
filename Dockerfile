FROM node:16-alpine
WORKDIR /app
COPY info /app/info
COPY logger /app/logger
COPY warning-errors-message /app/warning-errors-message
EXPOSE 3000
RUN npm install -g ts-node

RUN cd info && yarn install
RUN cd logger && yarn install
RUN cd warning-errors-message && yarn install

#CMD ["sh", "-c", "(cd info && node app.js)"]
CMD ["node","info/app.js"]
CMD ["node","warning-errors-message/app.js"]
CMD ["ts-node","logger/src/index.ts"]