import React, { useState, useReducer } from "react";
import Todo from "./component/Todo.jsx";
import Header from "./component/Header.jsx";
import "./styles.css";

export const ACTIONS = {
  ADD_TASK: "add-task",
  COMPLETE: "complete",
  DELETE: "delete",
  PRIORITY: "priority",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...todos, newTask(action.payload.task)];
    case ACTIONS.COMPLETE:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== action.payload.id);
    case ACTIONS.PRIORITY:
      return todos.map((todo, index) => {
        if (todo.id === action.payload.id) {
          return { ...todo, priority: !todo.priority };
        }
        return todo;
      });
    default:
      return todos;
  }
}

function newTask(task) {
  return { id: Date.now(), task: task, complete: false, priority: false };
}

function App() {
  const [task, setTask] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  function handleFormSubmit(event) {
    event.preventDefault();
    if (task !== "") {
      dispatch({ type: ACTIONS.ADD_TASK, payload: { task: task } });
    }
    setTask("");
  }

  // console.log(todos);

  return (
    <div>
      <Header />
      <form className="form" onSubmit={handleFormSubmit}>
        <textarea
          className="input"
          type="text"
          name="task"
          value={task}
          placeholder="Enter task...."
          onChange={(event) => setTask(event.target.value)}
        />
        <button className="btn" type="submit">
          +
        </button>
      </form>
      <div className="notes-container">
        {todos.map((todo) => {
          return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
        })}
      </div>
    </div>
  );
}
export default App;
