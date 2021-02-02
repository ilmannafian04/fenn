FROM node:15.7-alpine3.10 as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN ["npm", "ci"]
COPY . .
RUN ["npm", "run", "build"]

FROM nginx:1.19-alpine

COPY --from=builder /app/dist /app
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
