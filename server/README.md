# NODEJS REST API

## public static served files under /public

served from `/public` directory

## API requests served under /api

the api runs in modules under `/src`

- `index` starts the API server
  - wraps parsers for the requests
  - connects modules (e.g. storage)
  - handles versions
  - attaches the RequestRoutes for the API
- `requestHandler`
  - default version, or can be inherited to split versions per request
  - responsible to connect to the storage module and serve the request. Any logic should be processed here, or detached to another module loaded here
- `serverRoutes` handles the routing based on version to the corresponding handler
- `storage` is the module to wrap any storage service being used

# Development

you can create and run an image based on the docker file

```
docker-compose up
```

should trigger nodemon and auto reload on any local file change

default port for the server is `8080`
`.env` files are being used with local run, and docker-compose
