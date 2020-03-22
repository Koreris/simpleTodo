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
import ToDoForm from "./ToDoForm";
import ToDoTask from "./ToDoTask";

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
  const [myTodoCount, setTodoCount] = useState([myTodoList.length]);

  const toggleCheck = index => {
    setTodoList((currentList)=>{ 
      const tempList = [...currentList];
      tempList[index].checked = !tempList[index].checked;
      const tempCount = tempList.filter((x) => {
        return !x.checked;
      }).length;
      setTodoCount(tempCount);
      return tempList 
    });


  };

  const addTask = task => {
    setTodoList((currentList)=>[...currentList, task]);
    setTodoCount((myTodoCount)=>parseInt(myTodoCount)+1);
  };
  const [filter, setFilter] = useState(FILTERS.all);

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
            {myTodoList
              .filter((myTask, index) => {
                myTask.index = index
                switch (filter) {
                  case FILTERS.all:
                    return true;
                  case FILTERS.active:
                    return !myTask.checked;
                  case FILTERS.completed:
                    return myTask.checked;
                }
              })
              .map((myTask) => {
                return (
                  <ToDoTask
                    toggleCheck={toggleCheck}
                    myTask={myTask}
                    index={myTask.index}
                  ></ToDoTask>
                );
              })}
          </List>
        </ExpansionPanelDetails>
        <Grid container>
          <Grid item xs={3} className={classes.cnt}>
            <div>{myTodoCount + " items left"}</div>
          </Grid>
          <Grid item xs className={classes.btnc}>
            <Button
              size="small"
              onClick={() => {
                setFilter(FILTERS.all);
              }}
              variant={filter === FILTERS.all ? "outlined" : ""}
            >
              All
            </Button>
            <Button
              size="small"
              onClick={() => {
                setFilter(FILTERS.active);
              }}
              variant={filter === FILTERS.active ? "outlined" : ""}
            >
              Active
            </Button>
            <Button
              size="small"
              onClick={() => {
                setFilter(FILTERS.completed);
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
