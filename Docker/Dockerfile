FROM php:7.2.13-apache
ADD ./apache2.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite \
	&& service apache2 restart
