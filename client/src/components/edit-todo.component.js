import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function EditTodo(props) {
  const [todo_description, setTodo_description] = useState("");
  const [todo_responsible, setTodo_responsible] = useState("");
  const [todo_priority, setTodo_priority] = useState("");
  const [todo_completed, setTodo_completed] = useState(false);
  const [redirecttolist, setRedirecttolist] = useState(false);
  const todoId = props.match.params.id;
  useEffect(() => {
    axios
      .get("http://localhost:4000/todos/" + todoId)
      .then(response => {
        setTodo_description(response.data.todo_description);
        setTodo_responsible(response.data.todo_responsible);
        setTodo_priority(response.data.todo_priority);
        setTodo_completed(response.data.todo_completed);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [todoId]);

  function onChangeTodoDescription(e) {
    setTodo_description(e.target.value);
  }

  function onChangeTodoResponsible(e) {
    setTodo_responsible(e.target.value);
  }

  function onChangeTodoPriority(e) {
    setTodo_priority(e.target.value);
  }
  function onChangeTodoCompleted(e) {
    setTodo_completed(!todo_completed);
  }
  function onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Todo Description: ${todo_description}`);
    console.log(`Todo Responsible: ${todo_responsible}`);
    console.log(`Todo Priority: ${todo_priority}`);

    const newTodo = {
      todo_description: todo_description,
      todo_responsible: todo_responsible,
      todo_priority: todo_priority,
      todo_completed: todo_completed
    };

    axios
      .post(
        "http://localhost:4000/todos/update/" + props.match.params.id,
        newTodo
      )
      .then(res => console.log(res.data));
    setRedirecttolist(true);
  }

  console.log("Render Redirect : " + redirecttolist);
  if (redirecttolist) {
    console.log("Render Redirect : " + redirecttolist);
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <div>
        <h3 align="center">Update Todo</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={todo_description}
              onChange={onChangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              value={todo_responsible}
              onChange={onChangeTodoResponsible}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={todo_priority === "Low"}
                onChange={onChangeTodoPriority}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={todo_priority === "Medium"}
                onChange={onChangeTodoPriority}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={todo_priority === "High"}
                onChange={onChangeTodoPriority}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              onChange={onChangeTodoCompleted}
              checked={todo_completed}
              value={todo_completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>

          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
