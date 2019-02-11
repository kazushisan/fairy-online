FROM alpine:latest

ADD https://php.codecasts.rocks/php-alpine.rsa.pub /etc/apk/keys/php-alpine.rsa.pub
RUN apk --update add ca-certificates
RUN echo "@php https://php.codecasts.rocks/v3.8/php-7.2" >> /etc/apk/repositories

RUN apk update && apk upgrade

RUN apk --no-cache add apache2 php@php \
	php-mbstring@php \
	php-json@php \
	php-phar@php \
	php-apache2@php \
	php-openssl@php \
	php-zlib@php

ADD ./apache2.conf /etc/apache2/httpd.conf
ADD ./userdir.conf /etc/apache2/conf.d/userdir.conf
ADD ./installcomposer.sh /installcomposer.sh

RUN ln -s /usr/bin/php7 /usr/bin/php && \
	sh /installcomposer.sh && \
	adduser -D fairyski && \
	mkdir /run/apache2 && \
	touch /var/www/logs/access.log

EXPOSE 80