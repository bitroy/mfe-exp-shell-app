FROM nginx:stable-alpine

COPY default.conf /etc/nginx/conf.d/default.conf

COPY dist /usr/share/nginx/html

RUN mv /usr/share/nginx/html/index.html /usr/share/nginx/html/index.html.template

EXPOSE 80
CMD ["/bin/sh", "-c", \
  "envsubst '$REMOTE_TODO_APP_URL' < /usr/share/nginx/html/index.html.template > /usr/share/nginx/html/index.html \
   && nginx -g 'daemon off;'"]
