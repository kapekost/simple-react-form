import { GET_ANSWERS } from "../actions/home";
import { GET_QUESTIONS, SUBMIT_ANSWERS } from "../actions/questions";
import { apiRequest } from "../actions/api";
import { config } from "../utils";

const SERVER_URL = config.SERVER_URL;

export const appMiddleware = () => (next) => (action) => {
  next(action);
  switch (action.type) {
    case GET_QUESTIONS: {
      next(
        apiRequest({
          url: `${SERVER_URL}/questions`,
          method: "GET",
          actionReqType: action.type,
        })
      );
      break;
    }
    case GET_ANSWERS: {
      next(
        apiRequest({
          url: `${SERVER_URL}/answers`,
          method: "GET",
          actionReqType: action.type,
        })
      );
      break;
    }
    case SUBMIT_ANSWERS: {
      next(
        apiRequest({
          url: `${SERVER_URL}/answers`,
          data: action.payload,
          method: "POST",
          actionReqType: action.type,
        })
      );
      break;
    }
    default:
      break;
  }
};
