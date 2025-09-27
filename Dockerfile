FROM nginx:stable-alpine

COPY default.conf /etc/nginx/conf.d/default.conf

COPY dist /usr/share/nginx/html

RUN mv /usr/share/nginx/html/index.html /usr/share/nginx/html/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
