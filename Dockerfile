FROM library/node:14
WORKDIR /app
COPY package.json ./
RUN yarn
COPY ./ ./
RUN yarn build

FROM fholzer/nginx-brotli:v1.19.1
COPY --from=0 /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf