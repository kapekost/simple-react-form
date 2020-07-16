const RequestHandlers = require("./requestHandlers");

module.exports = class ServerRoutes {
  constructor(server, restify) {
    this.requestHandlers = new RequestHandlers();
    this.baseURL = "/api";
    this.restify = restify;
    this.server = server;
  }

  attachBaseRoutes() {
    this.server.get(
      this.baseURL + "/questions",
      this.restify.plugins.conditionalHandler([
        {
          version: ["1.0.0", "2.0.0"],
          handler: this.requestHandlers.getQuestions,
        },
      ])
    );
    this.server.post(
      this.baseURL + "/answers",
      this.restify.plugins.conditionalHandler([
        {
          version: ["1.0.0", "2.0.0"],
          handler: this.requestHandlers.setAnswers,
        },
      ])
    );
    this.server.get(
      this.baseURL + "/answers",
      this.restify.plugins.conditionalHandler([
        {
          version: ["1.0.0", "2.0.0"],
          handler: this.requestHandlers.getAnswers,
        },
      ])
    );
  }
};
