import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ToDoForm from "./ToDoForm";
import ToDoTask from "./ToDoTask";
import { FormHelperText } from "@material-ui/core";

const IconLeftExpansionPanelSummary = withStyles({
  expandIcon: {
    order: -1
  }
})(ExpansionPanelSummary);

const useStyles = makeStyles(theme => ({
  root: {
    width: "50%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    fontStyle: "italic"
  },
  summary: {
    width: "100%"
  },
  list: {
    width: "100%"
  },
  btnc: {
    display: "flex",
    alignItems: "center",
    alignContent: "center"
  },
  cnt: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "1rem"
  }
}));
const FILTERS = {
  all: "all",
  active: "active",
  completed: "completed"
};
function ToDoList() {
  const classes = useStyles();

  const [myTodoList, setTodoList] = useState([]);
  const [toDisplayList, setDisplayList] = useState(myTodoList);
  const [myTodoCount, setTodoCount] = useState([myTodoList.length]);

  const toggleCheck = index => {
    const tempList = [...myTodoList];
    tempList[index].checked = !tempList[index].checked;
    setTodoList(tempList);
    const tempCount = tempList.filter((x,i) => { return !x.checked; }).length;
    setTodoCount(tempCount);
  };

  const addTask = task => {
    const tempList = [...myTodoList, task];
    setTodoList(tempList);
    setDisplayList(tempList);
    const tempCount = parseInt(myTodoCount)+1;
    setTodoCount(tempCount);
  };
  const [filter, setFilter] = useState(FILTERS.all);

  const toggleFilters = filter => {
    switch (filter) {
      case FILTERS.all:
        setDisplayList(myTodoList);
        break;
      case FILTERS.active:
        setDisplayList(myTodoList.filter(item => !item.checked));
        break;
      case FILTERS.completed:
        setDisplayList(myTodoList.filter(item => item.checked));
        break;
    }
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <div className={classes.summary}>
          <IconLeftExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ToDoForm addTask={addTask}></ToDoForm>
          </IconLeftExpansionPanelSummary>
        </div>
        <ExpansionPanelDetails>
          <List className={classes.list}>
            {toDisplayList.map((myTask, index) => {
              return (
                <ToDoTask
                  toggleCheck={toggleCheck}
                  myTask={myTask}
                  index={index}
                ></ToDoTask>
              );
            })}
          </List>
        </ExpansionPanelDetails>
        <Grid container>
          <Grid item xs={3} className={classes.cnt}>
            <div>{(myTodoCount +" items left")}</div>
          </Grid>
          <Grid item xs className={classes.btnc}>
            <Button
              size="small"
              onClick={() => {
                setFilter(FILTERS.all);
                toggleFilters(FILTERS.all);
              }}
              variant={filter === FILTERS.all ? "outlined" : ""}
            >
              All
            </Button>
            <Button
              size="small"
              onClick={() => {
                setFilter(FILTERS.active);
                toggleFilters(FILTERS.active);
              }}
              variant={filter === FILTERS.active ? "outlined" : ""}
            >
              Active
            </Button>
            <Button
              size="small"
              onClick={() => {
                setFilter(FILTERS.completed);
                toggleFilters(FILTERS.completed);
              }}
              variant={filter === FILTERS.completed ? "outlined" : ""}
            >
              Completed
            </Button>
          </Grid>
        </Grid>
      </ExpansionPanel>
    </div>
  );
}

export default ToDoList;
