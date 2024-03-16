// --- DOCKER --- //

// 3 parts - CLI, Engine, registry
// Engine or deamon is the main part...CLI is used to interact with deamon
// Registry (eg dockerhub, AWS registry) similar to github but it store images, not source code

// IMAGES //

// - Images are similar to CD (a copy of software).
// - It is a snapshot of filesystem, codebase,dependencies, networks, and system
// - We can get images from docker hub
// - images don't consists as a single image, it is composed of layers. on docker pull command all the layers are downloaded

// CONTAINERS //

// - System in which we install software present in cd is containers

// Difference between docker and VM
// VM is very heavy. it runs a whole os upon host os
// docker runs a application on top of system (no new os), it interacts with host OS sometimes with API and copies the result into containers

// COMMANDS //
// docs - API References
// (press tab to see available options)

// - docker 
// - docker pull imageName - downloads the image if not present locally
// - docker pull imageName:version
// - docker image ls - lists all the available images
// - docker ps - lists all running containers
// - docker ps -a - lists all containers
// - docker run --name "name" -d imageName // -d for detached mode, current terminal will not be used by container // returns container id
// - docker attach containerID // attach terminal to container
// - docker stop containerName // stops container
// - docker rm containerName // removes container
// - docker logs containerName/id // logs everything
// - docker volume -options
// - docker network -options
// - docker -e "environmentVariale=value" // useful while spinning db


// PORT MAPPING //

// Every container listens to a port. We can interact with the container with that port

// Containers are like very light weighted VMs. if outside world want to interact with this closed environment within our computer.
// assume 2 containers of postgres is running and deafult port of postgres is 5432. 
// now 2 versions of postgres is listening to same port. So here port mapping is required

// docker run --name "name" -p newHostPort:defaultPort -d imageName
// docker run --name "myPostgres -p 4000:5432 -d postgres


// CONNECTING 2 CONTAINERS

// usecase - db is running in 1st container and application is running in another
// NOTE : both container must use same network
// we can set network while creating container
// here we have to write commands for both container in CLI
// Not a good way

// DOCKER COMPOSE

// .yaml file
//  indentation is important
// container here is called services
// all services in docker compose file shares same network automatically
// ctrl+space shows awailable options in vs code

// CREATING IMAGE
// 
// Docker File---

// FROM node:20  // base image
// WORKDIR /usr/app  // container is a mini computer so specify path
// COPY . .   // copy all files present to working directory of container

// note: never put node_modules inside image. run npm install in the container. use dockerignore file

// RUN npm install
// EXPOSE 3000

// all above is used to create image

// CMD["node","index.js"]  // Difference between CMD and RUN is CMD will execute when container is running

// Each line in docker file is a layer. docker builts layerwise and cache it after first build.
// if any layer changes between 2 builds then all the layers below the changed layer will be rebuild.
// We can optimize build time and build size


// docker build . -t test_app  // here -t is tag and . is current directory


// ENVIRONMENT VARIBLES

// Don't put it in dockerfile
// pass them while running image
// OR pass the .env file while running image 


// MORE COMMANDS

// - docker exec <container> command - used to execute commands inside container
// - docker exec <container> ls /path
// - docker exec -it <container> /bin/bash - opens shell - -it means interactive mode that gives complete access


// LAYERS IN DOCKER

// In Docker, layers are a fundamental part of the image architecture that allows Docker to be efficient, fast, and portable.
// A Docker image is essentially built up from a series of layers, each representing a set of differences from the previous layer.

// How layers are made - 
// Base Layer: The starting point of an image, typically an operating system (OS) like Ubuntu, Alpine, or any other base image specified in a Dockerfile.
// Instruction Layers: Each command in a Dockerfile creates a new layer in the image. These include instructions like RUN, COPY, which modify the filesystem by installing packages, copying files from the host to the container, or making other changes. Each of these modifications creates a new layer on top of the base layer.
// Reusable & Shareable: Layers are cached and reusable across different images, which makes building and sharing images more efficient. If multiple images are built from the same base image or share common instructions, they can reuse the same layers, reducing storage space and speeding up image downloads and builds.
// Immutable: Once a layer is created, it cannot be changed. If a change is made, Docker creates a new layer that captures the difference. This immutability is key to Docker's reliability and performance, as unchanged layers can be shared across images and containers.

// Points:
// 1) During rebuild if one layer is changed then all the layers fater that will be rebuild again
// 2) So try to put the things that changes frequently as low as possible
// 3) If we put the things that changes frequently on top then all the layers below it will rebuild even if it is not changed  


// OPTIMIZED DOCKER FILE

// FROM node:20

// WORKDIR /usr/src/app

// COPY package* .
// COPY ./prisma .
    
// RUN npm install
// RUN npx prisma generate

// COPY . .

// EXPOSE 3000

// CMD ["node", "dist/index.js", ]