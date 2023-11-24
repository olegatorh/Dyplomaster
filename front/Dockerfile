# Use the Node.js base image (you can specify the version as needed)
FROM node:21.1.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install && npm install -g expo-cli@5.4.4


# Copy the rest of your application code to the container
COPY . .

# Expose the required port (if your application listens on a specific port)

# Define the command to run your Node.js application
CMD ["npm", "start"]
