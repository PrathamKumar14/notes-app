import React from "react";
import { ACTIONS } from "../App.js";

function Todo({ todo, dispatch }) {
  return (
    <div>
      <p
        style={{
          textDecorationLine: todo.complete ? "line-through" : "none",
          border: todo.priority ? "4px solid red" : "none",
        }}
      >
        {todo.task}
      </p>
      <div className="btn-container">
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.DELETE, payload: { id: todo.id } });
          }}
        >
          Delete
        </button>
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.COMPLETE,
              payload: { id: todo.id },
            })
          }
        >
          Complete
        </button>
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.PRIORITY, payload: { id: todo.id } })
          }
        >
          Priority
        </button>
      </div>
    </div>
  );
}

export default Todo;
