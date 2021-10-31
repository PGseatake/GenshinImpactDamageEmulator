FROM node:lts-alpine
ENV CHOKIDAR_USEPOLLING=true NUXT_TELEMETRY_DISABLED=1
RUN apk update && apk add git
