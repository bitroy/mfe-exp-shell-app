FROM nginx:stable-alpine

# Copy the content you want to serve
COPY dist /usr/share/nginx/html

# Copy the default config template (this will be processed at runtime with envsubst)
COPY default.conf.template /etc/nginx/conf.d/default.conf.template

# Ensure index.html is copied for envsubst processing
COPY public/index.html /usr/share/nginx/html/index.html.template

# Expose port 80
EXPOSE 80

# Use envsubst to replace environment variables in the Nginx config at startup
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && envsubst < /usr/share/nginx/html/index.html.template > /usr/share/nginx/html/index.html && nginx -g 'daemon off;'"]
