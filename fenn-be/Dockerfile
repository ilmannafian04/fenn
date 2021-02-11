FROM rust:1.49-alpine3.12 as builder

WORKDIR /app
COPY . .
RUN ["apk", "add", "--no-cache", "musl-dev", "postgresql-dev"]
RUN ["cargo", "build", "--release"]

FROM alpine:3.12

COPY --from=builder /app/target/release/fenn-be /bin/fenn-be
ENTRYPOINT [ "fenn-be" ]
