# Use Node for build stage
FROM node:20-alpine

WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build Angular app (for production)

# Expose port 80
EXPOSE 7689

# Start Nginx
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "7689"]
