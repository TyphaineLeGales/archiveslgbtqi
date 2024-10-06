FROM docker.io/library/alpine:3.20 AS base

FROM base AS builder

COPY docker/docker-entrypoint.sh /tmp/bin/entrypoint.sh
RUN chmod 0755 /tmp/bin/*

FROM base

EXPOSE 3000/tcp

COPY --from=builder /tmp/bin/entrypoint.sh /usr/local/bin/entrypoint.sh

ENV HOME=/var/www

WORKDIR /var/www

COPY .next/ .next
COPY node_modules/ node_modules

RUN apk add --no-cache --update-cache --upgrade \
        bash \
        libc6-compat \
        npm

CMD [ "entrypoint.sh" ]