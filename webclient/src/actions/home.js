export const GET_ANSWERS = "GET_ANSWERS";

export const getAnswers = (data) => {
  return {
    type: GET_ANSWERS,
    payload: data,
  };
};
