const { MongoClient } = require("mongodb");
const { generate_uuid, getDate, getSeedingQuestions } = require("./utils");
const md5 = require("blueimp-md5");

module.exports = class Storage {
  constructor() {
    const {
      MONGO_HOST,
      MONGO_PORT,
      MONGO_INITDB_DATABASE,
      MONGO_INITDB_ROOT_PASSWORD,
      MONGO_INITDB_ROOT_USERNAME,
    } = process.env;
    this.config = {
      MONGO_INITDB_DATABASE,
      MONGO_URI: `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}?retryWrites=true&w=majority`,
    };
    this.client = new MongoClient(this.config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connect to the MongoDB cluster
    this.client
      .connect()
      .then(() => {
        this.db = this.client.db(this.config.MONGO_INITDB_DATABASE);
        console.log("mongo client connected");
        this.initData(); // for data initialisation
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Get all the questions
   * @returns {Array}
   */
  getQuestions() {
    return this.db.collection("questions").find().toArray();
  }
  /**
   * Get all the Answers
   * @returns {Array} Answers
   */
  getAnswers() {
    //maybe better to hash the email, and use it as index
    return this.db
      .collection("answers")
      .aggregate([
        { $group: { _id: "$email.value", data: { $first: "$$ROOT" } } },
      ])
      .toArray();
  }
  /**
   * Stores the Array of answers
   * use the md5 of the emails to create the unique identifier
   * @param {Array} data
   */
  setAnswers(data) {
    const id = md5(data.email.value);
    //ideally we want to create here a schema and not allow other datatypes
    return this.db
      .collection("answers")
      .updateOne({ _id: id }, { $set: { ...data } }, { upsert: true });
  }
  //get The collections, and call seeding if nothing is found
  initData() {
    this.db.listCollections().toArray((err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("collections", info.length);
      if (info.length === 0) {
        this.seedData();
      }
    });
  }
  seedData() {
    console.log("seeding data");
    this.db.collection("questions").insertMany(getSeedingQuestions());
  }
};
