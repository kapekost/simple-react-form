const { v4: uuid } = require("uuid");
const moment = require("moment");
const generate_uuid = () => {
  return uuid();
};
const getDate = () => {
  return moment().toISOString();
};

// The question object should be split into a new Class
// main object structure:
// id - the question id
// order - the order it should appear
// type - the type of the question
// payload - any data needed based on the type, to help rendering
// mandatory - the ones that can never be left empty
// - we use email to link to answers
const getSeedingQuestions = () => {
  return [
    {
      id: `Q-${generate_uuid()}`,
      order: 0,
      type: "email",
      title: "Your email address?",
      mandatory: true,
    },
    {
      id: `Q-${generate_uuid()}`,
      order: 1,
      type: "select",
      title: "What's your favourite pet?",
      payload: { options: ["dog", "cat", "dinosaur"] },
    },
    {
      id: `Q-${generate_uuid()}`,
      order: 2,
      type: "textarea",
      title: "Comments",
    },
  ];
};
module.exports = {
  getSeedingQuestions,
  generate_uuid,
  getDate,
};
