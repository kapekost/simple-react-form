# Simple form submission in ReactJS, NodeJS and Mongo DB with Docker

2 Tabs Single page application

Page one

- Basic form to submit data to the database.
- saved by email as index key

Page two

- A list of previously answered questions grouped by a respondents email address
  The questions can be anything you wish to ask.

## Development

```
docker-compose up
```

this should bring up 3 containers,

- NodeJS service
- ReactJS client
- mongodb server

- node server on http://localhost:8080
- react development server on http://localhost:3000/public

The docker-compose

- will create the volumes needed for the database storage
- expose ports for mongodb and use a docker-network to allow the node service connection.
- expose ports for debugging
- allow you to use React Dev Server
- allow you to use Nodemon for nodejs dev

### alternatively, `without Docker`, you can start the projects within their directory with common node / yarn
[REQUIRES mongo DB default installation and root password as shown below]

```
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=m0ng0passw
```

in each project

```
yarn install
yarn start
```

- navigate with the browser to http://localhost:8080/public/index.html

## Production build

### with Docker

```
docker-compose -f docker-compose.production.yml build --force-rm
docker-compose -f docker-compose.production.yml up
```

- navigate with the browser to http://localhost:8080/public/index.html
