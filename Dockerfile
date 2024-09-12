# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# COPY .env /src/app/.env
# # Copy Drizzle migration files (if necessary, adjust the path)
COPY drizzle ./drizzle/

# # # Generate any Drizzle configuration (if needed)
# RUN npx drizzle-kit generate 
# Build the TypeScript code
RUN npm run build

# Expose the port your app will run on
EXPOSE 3000



# Command to run the application in production
CMD ["npm", "start"]


