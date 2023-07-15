# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install the Node.js dependencies
RUN yarn install

# Copy the entire frontend directory to the container
COPY . .

# Build the React application
RUN yarn build

# Expose the port that the React app is running on
EXPOSE 3000

# Serve the React app using a web server
CMD ["yarn", "start"]
