export const GET_QUESTIONS = "GET_QUESTIONS";
export const SUBMIT_ANSWERS = "SUBMIT_ANSWERS";

export const submitAnswers = (term) => {
  return {
    type: SUBMIT_ANSWERS,
    payload: term,
  };
};

export const getQuestions = (data) => {
  return {
    type: GET_QUESTIONS,
    payload: data,
  };
};
