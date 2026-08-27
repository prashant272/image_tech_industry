FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose the port your backend runs on (assuming 5000 based on .env)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
