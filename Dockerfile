# Use official PHP with Apache
FROM php:8.2-apache

# Install required PHP extensions
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    && docker-php-ext-install curl \
    && apt-get clean

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy all website files
COPY . /var/www/html/

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
