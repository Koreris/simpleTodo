import React from "react";
import "typeface-roboto";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import ToDoList from "./Components/ToDoList";

function App() {
  return (
    <div className="App">
      <Typography component="h1" variant="h2" style={{color: "#ebdada"}}>
        todos
      </Typography>
      <div
        className="list"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ToDoList></ToDoList>
      </div>
    </div>
  );
}

export default App;
