import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    paddingLeft: "2rem"
  }
}));

const ToDoForm = ({ addTask }) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  return (
    <form
      className={classes.form}
      onSubmit={event => {
        event.preventDefault();
        addTask({ value: value, checked: false });
      }}
    >
      <TextField
        color="secondary"
        required
        variant="standard"
        placeholder="What needs to be done?"
        margin="none"
        fullWidth
        onClick={event => event.stopPropagation()}
        onFocus={event => event.stopPropagation()}
        onChange={event => {
          setValue(event.target.value);
        }}
        value={value}
      />
    </form>
  );
};

export default ToDoForm;
