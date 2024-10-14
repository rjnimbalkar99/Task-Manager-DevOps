#Use a base image of node js
From node:latest

#Create a working directory in container for the project.
WORKDIR  /app

# Copy the package.json file first to leverage Docker's caching
COPY package.json ./

#Install nodejs dependancies
RUN npm install

#Copy the current directory content to working directory of container.
COPY . /app

#Expose the port to outside world.
EXPOSE 8080

#Command to run the application.
CMD ["npx","http-server", ".", "8080"]
