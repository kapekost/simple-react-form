import axios from "axios";
import { apiError, apiSuccess } from "../actions/api";

export const apiMiddleware = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (!action.meta) return;
  const { url, method, data } = action.meta;
  axios({
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      "x-api-version": "1.0.0",
      // Authorization: "JWT token...",
    },
    data,
  })
    .then(({ data }) =>
      dispatch(
        apiSuccess({
          response: data,
          type: action.type,
          actionReqType: action.actionReqType,
        })
      )
    )
    .catch((error) => {
      console.log(error);

      if (!error.response) {
        dispatch(apiError({ error: error }));
      } else {
        dispatch(apiError({ error: error.response.data }));
      }
    });
};
