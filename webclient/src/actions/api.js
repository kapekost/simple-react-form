import { GET_QUESTIONS, SUBMIT_ANSWERS } from "./questions";
import { GET_ANSWERS } from "./home";

// action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const API_REQUEST = "API_REQUEST";
export const API_SUCCESS = "API_SUCCESS";

export const GET_QUESTIONS_SUCCESS = "GET_QUESTIONS_SUCCESS";
export const SUBMIT_ANSWERS_SUCCESS = "SUBMIT_ANSWERS_SUCCESS";
export const GET_ANSWERS_SUCCESS = "GET_ANSWERS_SUCCESS";

export const API_ERROR = "API_ERROR";

// action creators
export const apiRequest = ({ url, method, data, actionReqType }) => {
  return {
    type: API_REQUEST,
    meta: { url, method, data },
    actionReqType,
  };
};

export const apiSuccess = ({ response, type, actionReqType }) => {
  let restype = API_SUCCESS;
  switch (type) {
    case LOGIN_REQUEST:
      restype = LOGIN_SUCCESS;
      break;
    case API_REQUEST:
      if (actionReqType === SUBMIT_ANSWERS) {
        restype = SUBMIT_ANSWERS_SUCCESS;
      }
      if (actionReqType === GET_ANSWERS) {
        restype = GET_ANSWERS_SUCCESS;
      }
      if (actionReqType === GET_QUESTIONS) {
        restype = GET_QUESTIONS_SUCCESS;
      }
      break;
    default:
      restype = API_SUCCESS;
  }
  return {
    type: restype,
    payload: response,
  };
};

export const apiError = ({ error }) => ({
  type: API_ERROR,
  payload: error,
});
