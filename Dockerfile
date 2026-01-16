# client/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY . .


RUN npm install

# Install Vite globally
RUN npm install -g vite

EXPOSE 7689

CMD ["npm", "run", "dev", "--", "--host"]
