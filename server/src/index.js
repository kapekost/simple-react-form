var path = require("path");
const restify = require("restify");

const corsMiddleware = require("restify-cors-middleware");
if (process.env.NODE_ENV) {
  require("dotenv").config({
    path: `./.env.${process.env.NODE_ENV}`,
  });
  console.log("env ", process.env.NODE_ENV);
} else {
  console.log("env local");
  require("dotenv").config({
    path: `./.env.local`,
  });
}
const ServerRoutes = require("./serverRoutes");
const server_version = "1.0.0";
const server = restify.createServer({
  name: "react-server",
  version: server_version,
});

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ["*"],
  allowHeaders: ["authorization"],
  exposeHeaders: ["x-api-version"],
});

server.pre(cors.preflight);
server.use(cors.actual);

//default the version if it's missing from the client
server.pre((req, res, next) => {
  res.setHeader("Content-Type", "application/json");

  if (!req.headers["x-api-version"]) {
    req.headers["x-api-version"] = "1.0.0";
  }
  next();
});

server.pre(restify.pre.userAgentConnection());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const serverRoutes = new ServerRoutes(server, restify);

serverRoutes.attachBaseRoutes();
server.get(
  "/public/*",
  restify.plugins.serveStatic({
    directory: path.resolve(__dirname, "../"),
    default: "index.html",
  })
);

server.get(
  "/docs/*",
  restify.plugins.serveStatic({
    directory: path.resolve(__dirname, "../docs"),
    default: "index.html",
  })
);

server.listen(process.env.PORT || 8080, () => {
  console.log("%s listening at %s", server.name, server.url);
});
