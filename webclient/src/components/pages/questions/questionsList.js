import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Paper,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: "36ch",
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

const getOptionsElements = (options) => {
  return options.map((value) => {
    return (
      <option key={value} value={value}>
        {value}
      </option>
    );
  });
};

const QuestionsItems = (props) => {
  // ideally we want to split these to different components and handle the id of incoming
  // question and map it properly to the answers given
  //to make it easier. for each answer we hold an object here, with the Question_id and the answer value

  const onChangeHandler = (event) => {
    const formValues = {
      [event.target.name]: {
        qid: event.target.id,
        value: event.target.value,
        type: event.target.name,
      },
    };

    props.onChange((prevFormData) => ({
      ...prevFormData,
      ...formValues,
    }));
  };

  return props.questionsList.map((question) => {
    let fragment = <></>;

    switch (question.type) {
      case "email":
        fragment = (
          <input
            id={question.id}
            name="email"
            type={question.type}
            onChange={onChangeHandler}
            required={question.mandatory ? "required" : false}
          />
        );
        break;
      case "textarea":
        fragment = (
          <textarea
            id={question.id}
            name="comment"
            onChange={onChangeHandler}
          ></textarea>
        );

        break;
      case "select":
        fragment = (
          <select
            id={question.id}
            name="petSelection"
            onChange={onChangeHandler}
          >
            <option>please select ..</option>
            {getOptionsElements(question.payload.options)}
          </select>
        );
        break;
      default:
        fragment = (
          <input id={question.id} name={question.title} type={question.type} />
        );
        break;
    }

    return (
      <span key={question.id}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <SendIcon />
          </ListItemAvatar>
          <ListItemText primary={question.title} secondary={fragment} />
        </ListItem>
        <Divider variant="inset" component="li" />
      </span>
    );
  });
};
export default (props) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmitAnswers(formData);
  };
  if (!props.questionsList || props.questionsList.length === 0) {
    return (
      <Paper className={classes.paper}>
        <div>{props.error ? props.error : "loading ..."}</div>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <List className={classes.root}>
          <QuestionsItems
            questionsList={props.questionsList}
            onChange={setFormData}
          ></QuestionsItems>
          <ListItem alignItems="flex-start">
            <input type="submit" />
          </ListItem>
        </List>
      </form>
    </Paper>
  );
};
