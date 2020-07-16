const Storage = require("./storage");

module.exports = class RequestHandlers {
  constructor() {
    this.storage = new Storage();
  }
  async getQuestions(req, res, next) {
    try {
      const questions = await this.storage.getQuestions();
      res.send(200, { questions });
    } catch (err) {
      res.send(501, err);
    }
    next();
  }
  async getAnswers(req, res, next) {
    try {
      const answers = await this.storage.getAnswers();
      res.send(200, { answers });
    } catch (err) {
      res.send(501, err);
    }
    next();
  }
  setAnswers(req, res, next) {
    console.log(req.body);
    this.storage.setAnswers({ ...req.body });
    res.send(200);
    next();
  }
};
