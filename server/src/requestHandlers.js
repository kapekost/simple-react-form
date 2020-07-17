const Storage = require("./storage");

module.exports = class RequestHandlers {
  constructor() {
    this.storage = new Storage();
  }
  getQuestions = (req, res, next) => {
    this.storage
      .getQuestions()
      .then((questions) => {
        res.send(200, { questions });
        next();
      })
      .catch((err) => {
        res.send(501, err);
        next(err);
      });
  };
  getAnswers = (req, res, next) => {
    this.storage
      .getAnswers()
      .then((answers) => {
        res.send(200, { answers });
      })
      .catch((err) => {
        res.send(501, err);
        next(err);
      });
  };
  setAnswers = (req, res, next) => {
    console.log(req.body);
    this.storage.setAnswers({ ...req.body });
    res.send(200);
    next();
  };
};
