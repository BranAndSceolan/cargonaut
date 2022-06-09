# Cargonaut

In this project, we will create a browser-app that enables people to offer and accept rides.

Other than Uber, we put a lot of emphasis on not only the transport of passengers but also cargo of all types.

## Structure
Go to [docu](docu) for non-code elements of the project.

[src](src) contains the code, while [config](config) adds some values needed for docker.

## Build

### locally:
``npm start`

(starts only the docker, not the database)

### in docker-compose
``sudo docker-compose up -d``

(starts server and database)