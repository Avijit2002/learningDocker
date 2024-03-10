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

// docker build . -t test_app  // here -t is tag and . is current directory

// docker run --env-file <env_file_name> <imageName>
