import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Checked from "@material-ui/icons/CheckCircleOutline";
import Unchecked from "@material-ui/icons/RadioButtonUnchecked";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  strikethrough: {
    textDecoration: "line-through"
  }
}));

export default function ToDoTask({ toggleCheck, myTask, index }) {
  const classes = useStyles();
  return (
    <div>
      <ListItem
        key={`${index}task`}
        className={classes.root}
        dense
        button
        onClick={() => {
          toggleCheck(index);
        }}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            icon={<Unchecked />}
            checkedIcon={<Checked />}
            color="default"
            checked={myTask.checked}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText
          className={myTask.checked ? classes.strikethrough : ""}
          primary={myTask.value}
        />
      </ListItem>
    </div>
  );
}
