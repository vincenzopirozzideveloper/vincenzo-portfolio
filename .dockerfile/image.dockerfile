FROM debian:12-slim

ENV DEBIAN_FRONTEND=noninteractive
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN set -eux; \
    apt-get update && \
    apt-get install -y --no-install-recommends \
      apt-transport-https \
      ca-certificates \
      curl \
      wget \
      gnupg \
      lsb-release \
      build-essential \
      apache2 \
      ssl-cert \
      openssh-client \
      git \
      vim \
      nano \
      tmux && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    npm install -g @anthropic-ai/claude-code @google/gemini-cli && \
    curl https://cursor.com/install -fsS | bash && \
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc && \
    source ~/.bashrc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV PATH="/root/.local/bin:${PATH}"

RUN a2enmod rewrite ssl

RUN echo '<VirtualHost *:80>' > /etc/apache2/sites-available/000-default.conf && \
    echo '    ServerAdmin webmaster@localhost' >> /etc/apache2/sites-available/000-default.conf && \
    echo '    DocumentRoot /var/www/app/build' >> /etc/apache2/sites-available/000-default.conf && \
    echo '    <Directory "/var/www/app/build">' >> /etc/apache2/sites-available/000-default.conf && \
    echo '        Options -Indexes' >> /etc/apache2/sites-available/000-default.conf && \
    echo '        AllowOverride All' >> /etc/apache2/sites-available/000-default.conf && \
    echo '        Require all granted' >> /etc/apache2/sites-available/000-default.conf && \
    echo '        RewriteEngine On' >> /etc/apache2/sites-available/000-default.conf && \
    echo '        RewriteCond %{REQUEST_FILENAME} !-f' >> /etc/apache2/sites-available/000-default.conf && \
    echo '        RewriteCond %{REQUEST_FILENAME} !-d' >> /etc/apache2/sites-available/000-default.conf && \
    echo '        RewriteRule ^ index.html [L]' >> /etc/apache2/sites-available/000-default.conf && \
    echo '    </Directory>' >> /etc/apache2/sites-available/000-default.conf && \
    echo '    ErrorLog ${APACHE_LOG_DIR}/error.log' >> /etc/apache2/sites-available/000-default.conf && \
    echo '    CustomLog ${APACHE_LOG_DIR}/access.log combined' >> /etc/apache2/sites-available/000-default.conf && \
    echo '</VirtualHost>' >> /etc/apache2/sites-available/000-default.conf

RUN a2ensite default-ssl && \
    echo '<IfModule mod_ssl.c>' > /etc/apache2/sites-available/default-ssl.conf && \
    echo '<VirtualHost _default_:443>' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '    ServerAdmin webmaster@localhost' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '    DocumentRoot /var/www/app/build' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '    <Directory "/var/www/app/build">' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '        Options -Indexes' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '        AllowOverride All' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '        Require all granted' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '        RewriteEngine On' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '        RewriteCond %{REQUEST_FILENAME} !-f' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '        RewriteCond %{REQUEST_FILENAME} !-d' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '        RewriteRule ^ index.html [L]' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '    </Directory>' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '    ErrorLog ${APACHE_LOG_DIR}/error.log' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '    CustomLog ${APACHE_LOG_DIR}/access.log combined' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '    SSLEngine on' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '    SSLCertificateFile /etc/ssl/certs/ssl-cert-snakeoil.pem' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '    SSLCertificateKeyFile /etc/ssl/private/ssl-cert-snakeoil.key' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '</VirtualHost>' >> /etc/apache2/sites-available/default-ssl.conf && \
    echo '</IfModule>' >> /etc/apache2/sites-available/default-ssl.conf

EXPOSE 80
EXPOSE 443

VOLUME /var/www/app
WORKDIR /var/www/app

CMD ["apachectl", "-D", "FOREGROUND"]
