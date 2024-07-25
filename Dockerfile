FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Docker file for nginx server to serve react app build files (SPA routing)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# This is required to make nginx serve index.html for all routes
COPY nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]