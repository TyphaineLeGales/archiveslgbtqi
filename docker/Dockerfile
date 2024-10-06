FROM docker.io/library/alpine:3.20 AS base

FROM base AS builder

RUN apk add --no-cache --update-cache --upgrade \
      bash \
      libc6-compat \
      npm

WORKDIR /var/www
COPY .next/ .next
COPY node_modules/ node_modules

RUN tar cfz /application.tar.gz .next node_modules

COPY docker/docker-entrypoint.sh /tmp/bin/entrypoint.sh
RUN chmod 0755 /tmp/bin/*

FROM base

EXPOSE 3000/tcp

COPY --from=builder /application.tar.gz /application.tar.gz
COPY --from=builder /tmp/bin/entrypoint.sh /usr/local/bin/entrypoint.sh

VOLUME /install
WORKDIR /var/www
ENV HOME=/var/www

RUN apk add --no-cache --update-cache --upgrade \
        bash \
        libc6-compat \
        npm && \
    chmod 0777 /var/www

CMD [ "entrypoint.sh" ]