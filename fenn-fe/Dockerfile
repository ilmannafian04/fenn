FROM node:15.7-alpine3.10 as builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN ["yarn", "install", "--frozen-lockfile"]
COPY . .
RUN ["yarn", "build"]

FROM nginx:1.19-alpine

RUN ["rm", "-rf", "/usr/share/nginx/html"]
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
