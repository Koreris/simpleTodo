import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import ToDoForm from "./ToDoForm";
import ToDoTask from "./ToDoTask";

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
    paddingBottom: "1rem"
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
  
  const toggleCheck = index => {
    const tempList = [...myTodoList];
    tempList[index].checked = !tempList[index].checked;
    setTodoList(tempList);
  };

  const addTask = task => {
    const tempList = [...myTodoList, task];
    setTodoList(tempList);
    setDisplayList(tempList);
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
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ToDoForm addTask={addTask}></ToDoForm>
          </ExpansionPanelSummary>
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
        <Container className={classes.btnc}>
          <Button
            onClick={() => {
              setFilter(FILTERS.all);
              toggleFilters(FILTERS.all);
            }}
            variant={filter === FILTERS.all ? "outlined" : ""}
          >
            All
          </Button>
          <Button
            onClick={() => {
              setFilter(FILTERS.active);
              toggleFilters(FILTERS.active);
            }}
            variant={filter === FILTERS.active ? "outlined" : ""}
          >
            Active
          </Button>
          <Button
            onClick={() => {
              setFilter(FILTERS.completed);
              toggleFilters(FILTERS.completed);
            }}
            variant={filter === FILTERS.completed ? "outlined" : ""}
          >
            Completed
          </Button>
        </Container>
      </ExpansionPanel>
    </div>
  );
}

export default ToDoList;
