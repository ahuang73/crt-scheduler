# Use an official Node.js runtime as a parent image
FROM node:lts-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install

RUN npm install esbuild-wasm

RUN npm install -g concurrently
ENTRYPOINT [ "./entrypoint.sh" ]

COPY .env ./
# Copy the SSL key file
COPY SSL/ SSL/

COPY . .

# Copy the source code
COPY src ./src

COPY server ./server

# Expose the port on which your backend will run
EXPOSE 3000 5173


# Build your frontend (if necessary)
RUN npm run build

# Define the command to run your backend application
CMD ["npm", "run", "start-both"]