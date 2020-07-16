import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Grid,
  Paper,
  ListItem,
  Divider,
  ListItemText,
  Box,
  ListItemAvatar,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  inline: {
    display: "inline",
  },
}));

const AnswersList = (props) => {
  return (
    <>
      <Grid item xs={12}>
        <Box key={props.data["email"]}>Pet: {props.data["petSelection"]}</Box>
      </Grid>
      <Grid item xs={12}>
        <Box key={props.data["comment"]}>Comment: {props.data["comment"]}</Box>
      </Grid>
    </>
  );
};
const AnswerItems = (props) => {
  console.log(props.answersList);
  return props.answersList.map((UserAnswers) => {
    return (
      <span key={UserAnswers.user}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <SendIcon />
          </ListItemAvatar>
          <Grid item xs={12}>
            <ListItemText primary={UserAnswers.user} />
          </Grid>
          <AnswersList data={UserAnswers.answers} />
        </ListItem>
        <Divider variant="inset" component="div" />
      </span>
    );
  });
};
export default (props) => {
  const classes = useStyles();
  console.log(props.answersList);
  if (!props.answersList || props.answersList.length === 0) {
    return (
      <Paper className={classes.paper}>
        <div>{props.error ? props.error : "loading ..."}</div>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <List className={classes.root}>
        <AnswerItems answersList={props.answersList}></AnswerItems>
      </List>
    </Paper>
  );
};
