import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import {
  AccountCircleOutlined,
  QuestionAnswerRounded,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  stickToBottom: {
    width: "100%",
    position: "fixed",
    top: 0,
  },
}));

const createNavigationAction = ({ to, label, value, icon }) => (
  <BottomNavigationAction
    key={label}
    value={value}
    component={Link}
    to={to}
    label={label}
    icon={icon}
  />
);
const menuItems = [
  {
    label: "Survey",
    to: "/questions",
    value: "questions",
    icon: <AccountCircleOutlined />,
  },
  {
    label: "Answers",
    to: "/",
    value: "home",
    icon: <QuestionAnswerRounded />,
  },
];
export default () => {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const classes = useStyles();

  return (
    <BottomNavigation
      value={selectedMenu}
      onChange={(event, newValue) => {
        setSelectedMenu(newValue);
      }}
      showLabels
      className={classes.stickToBottom}
    >
      {menuItems.map(createNavigationAction)})
    </BottomNavigation>
  );
};
