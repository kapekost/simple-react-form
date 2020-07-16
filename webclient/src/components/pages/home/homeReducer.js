import { GET_ANSWERS_SUCCESS, API_ERROR } from "../../../actions/api";

export default (
  state = {
    answersList: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_ANSWERS_SUCCESS:
      let answers = action.payload.answers.map((answerdata) => {
        let reformattedAnswers = {};
        /**
         * comment: {qid: "Q-36c7a761-0844-4a9b-8e15-243c8f7787b9", value: "dsad", type: "comment"}
          email: {qid: "Q-eb888d2b-f9e1-4f53-b9fc-d66867f1ffd2", value: "kapekost@gmail.com", type: "email"}
          petSelection: {qid: "Q-12c429d9-bc8d-4b6e-aa83-9de2df750da2", value: "cat", type: "petSelection"}
          _id: "1a7166ed405e828138aa6dc816bd0145"
          _id: "kapekost@gmail.com"
        */
        //using the email as key, not a good idea, works for now, should be a proper answer object and map for emails
        reformattedAnswers.user = answerdata._id;
        reformattedAnswers.answers = {};
        Object.values(answerdata.data).forEach((answer) => {
          if (!answer.type) return;
          reformattedAnswers.answers[answer.type] = answer.value;
        });

        return reformattedAnswers;
      });
      return { ...state, answersList: answers };
    case API_ERROR:
      return { ...state, error: action.payload };
    case "RESET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
