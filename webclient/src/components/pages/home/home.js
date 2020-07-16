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
import AnswersList from "./answersList";
import { getAnswers } from "../../../actions/home";

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
  const error = useSelector((state) => state.homeStore.error);
  const answersList = useSelector((state) => state.homeStore.answersList);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getAnswers());
  }, [dispatch]);
  useEffect(() => {
    if (error && error !== "reset") {
      setOpen(true);
    }
  }, [error]);
  const closeDialog = () => {
    setOpen(false);
    if (error && error !== "reset") {
      dispatch({ type: "RESET_ERROR", payload: "reset" });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row-reverse" spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Box textAlign="left" fontWeight="fontWeightBold">
              <AnswersList answersList={answersList} />
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
