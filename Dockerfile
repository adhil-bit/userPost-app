# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /userPost-app/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Define environment variable
ENV NODE_ENV production

# Run the application
CMD ["node", "app.js"]
