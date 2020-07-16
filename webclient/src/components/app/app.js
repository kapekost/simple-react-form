import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";

import questionsReducer from "../pages/questions/questionsReducer";
import homeReducer from "../pages/home/homeReducer";

import Navbar from "../navbar";
import { Container, CssBaseline } from "@material-ui/core";

import HomePage from "../pages/home";
import QuestionsPage from "../pages/questions";

import { appMiddleware } from "../../middlewares/app";
import { apiMiddleware } from "../../middlewares/core";

const createStoreWithMiddleware = applyMiddleware(
  appMiddleware,
  apiMiddleware
)(createStore);
const rootReducer = combineReducers({
  homeStore: homeReducer,
  questionsStore: questionsReducer,
});

const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default () => {
  return (
    <CssBaseline>
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <Container style={{ padding: 82 }}>
            <Switch>
              <Route path="/questions">
                <QuestionsPage />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </Container>
          <Navbar />
        </Router>
      </Provider>
    </CssBaseline>
  );
};
