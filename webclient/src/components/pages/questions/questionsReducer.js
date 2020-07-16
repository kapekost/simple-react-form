import {
  GET_QUESTIONS_SUCCESS,
  SUBMIT_ANSWERS_SUCCESS,
  API_ERROR,
} from "../../../actions/api";

export default (
  state = {
    questions: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_QUESTIONS_SUCCESS:
      return { ...state, questions: action.payload.questions };
    case SUBMIT_ANSWERS_SUCCESS:
      return { ...state };
    case API_ERROR:
      return { ...state, error: action.payload };
    case "RESET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
