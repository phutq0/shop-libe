FROM nginx:1.23.4-alpine
COPY /build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]