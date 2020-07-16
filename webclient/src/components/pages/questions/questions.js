import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Grid,
  Paper,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
} from "@material-ui/core";
import QuestionsList from "./questionsList";
import { getQuestions, submitAnswers } from "../../../actions/questions";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.questionsStore.questions);
  const error = useSelector((state) => state.questionsStore.error);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);
  useEffect(() => {
    if (error && error !== "reset") {
      setOpen(true);
    }
  }, [error]);
  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    if (error && error !== "reset") {
      dispatch({ type: "RESET_ERROR", payload: "reset" });
    }
  };

  const handleSubmitAnswers = (answers) => {
    const answerObject = { ...answers };
    dispatch(submitAnswers(answerObject));
    openDialog();
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row-reverse" spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Box textAlign="left" fontWeight="fontWeightBold">
              <QuestionsList
                questionsList={questions}
                handleSubmitAnswers={handleSubmitAnswers}
              ></QuestionsList>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {error && error !== "reset" ? "error" : "Done"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error && error !== "reset"
              ? "Oops, :( something went wrong, please try again"
              : " Your answers are saved, thank you"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
