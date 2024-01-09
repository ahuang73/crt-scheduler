# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies for both frontend and backend
RUN npm install

# Copy the content of the local src directory to the working directory
COPY src .

# Expose the port on which your backend will run
EXPOSE 3000

# Define the command to run your backend application
CMD ["npm", "start"]