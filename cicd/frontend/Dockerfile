FROM nginx:alpine

COPY assets/ /usr/share/nginx/html/

# EXPOSE 4200

RUN sed -i 's/80;/4200;/g' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]