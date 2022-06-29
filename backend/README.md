# Cargonaut

In this project, we will create a browser-app that enables people to offer and accept rides.

Other than Uber, we put a lot of emphasis on not only the transport of passengers but also cargo of all types.

## Structure
Go to [docu](../docu) for non-code elements of the project.

[src](src) contains the code, while [config](config) adds some values needed for docker.

There are different options for config. You can choose them by naming them as NODE_ENV Value.

If you want to use the configurations in docker_dev.json, write NODE_ENV=docker_dev while starting the application.

Use docker_prod for production. (uses authentication **!!!NOT YET SAFE, BECAUSE NO HTTPS IS USED!!!**)

Use docker_dev for development. (no authentication)

Use test for chai tests. (Keep in mind: the chai tests ignore authentication!)

#

## enter the backend directory
``cd backend``

## make sure all dependencies are installed
``npm install``

## build and execute (blocking the terminal, but giving you some extra information)
### development
``NODE_ENV=docker_dev docker-compose up --build``
### production
``NODE_ENV=docker_prod docker-compose up --build``

## build and execute (not blocking the terminal)
### development
``NODE_ENV=docker_dev docker-compose up --build --detach``
### production
``NODE_ENV=docker_prod docker-compose up --build --detach``

## start chai tests
make sure the containers were already build at least once
in backend directory and start the database using

``docker start cargonaut_mongo``

Start server in test mode using

``NODE_ENV=test npm run test``
