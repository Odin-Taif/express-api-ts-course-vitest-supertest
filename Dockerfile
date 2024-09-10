# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /src/app

# Copy package.json and package-lock.json
COPY package*.json ./


# prisma set up 
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app will run on
EXPOSE 3000




# Command to run the application in production
CMD ["npm", "start", "scripts/docker-start.sh"]


